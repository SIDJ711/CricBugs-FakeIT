import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Volume2,
  VolumeX,
  RefreshCw,
  Trophy,
  Target,
  Zap,
  Settings,
} from "lucide-react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TeamTakes from "@/components/TeamTakes";
import TeamPreferencesModal from "@/components/TeamPreferencesModal";
import { Button } from "@/components/ui/button";

import {
  ballsToOversDisplay,
  simulateBall,
  isInningsComplete,
  getMatchResult,
  type Score,
  type BallResult,
} from "@/lib/cricketEngine";

import { ALL_TEAMS, useTeamPreferences } from "@/hooks/useTeamPreferences";

const MAX_BALLS = 300; // 50 overs ODI

const crowdMoods = [
  { emoji: "😡", label: "Furious" },
  { emoji: "😭", label: "Devastated" },
  { emoji: "🤡", label: "Circus Mode" },
  { emoji: "🎉", label: "Celebrating" },
  { emoji: "😱", label: "Shocked" },
  { emoji: "🥱", label: "Bored" },
  { emoji: "🔥", label: "On Fire" },
  { emoji: "💀", label: "Dead Inside" },
  { emoji: "🤔", label: "Confused" },
];

interface CommentaryEntry {
  id: number;
  text: string;
  type: "normal" | "four" | "six" | "wicket" | "wide" | "noball";
  over: string;
  timestamp: Date;
}

const Match = () => {
  const { favoriteTeams } = useTeamPreferences();
  const [showPreferences, setShowPreferences] = useState(false);

  // Pick teams (preference-aware)
  const [matchTeams] = useState(() => {
    const preferred = ALL_TEAMS.filter(t => favoriteTeams.includes(t.id));
    if (preferred.length >= 2) return [preferred[0], preferred[1]];
    if (preferred.length === 1) {
      const others = ALL_TEAMS.filter(t => t.id !== preferred[0].id);
      return [preferred[0], others[Math.floor(Math.random() * others.length)]];
    }
    return [ALL_TEAMS[0], ALL_TEAMS[1]];
  });

  // Proper score model (BALL-BASED)
  const [score1, setScore1] = useState<Score>({
    runs: 0,
    wickets: 0,
    balls: 0,
  });

  const [score2, setScore2] = useState<Score>({
    runs: 0,
    wickets: 0,
    balls: 0,
  });

  const [currentInnings, setCurrentInnings] = useState<1 | 2>(1);
  const [isMatchComplete, setIsMatchComplete] = useState(false);

  const [overreaction, setOverreaction] = useState(50);
  const [crowdMood, setCrowdMood] = useState(crowdMoods[6]);
  const [commentary, setCommentary] = useState<CommentaryEntry[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  const [currentBatsman, setCurrentBatsman] = useState({
    name: "V. Kohli",
    runs: 0,
    balls: 0,
  });

  const [currentBowler, setCurrentBowler] = useState({
    name: "P. Cummins",
    balls: 0,
    wickets: 0,
    runs: 0,
  });

  const getCommentaryType = (r: BallResult): CommentaryEntry["type"] => {
    if (r.isWicket) return "wicket";
    if (r.isSix) return "six";
    if (r.isBoundary) return "four";
    if (r.isWide) return "wide";
    if (r.isNoBall) return "noball";
    return "normal";
  };

  const updateMatch = useCallback(() => {
    if (isMatchComplete) return;

    const score = currentInnings === 1 ? score1 : score2;
    const setScore = currentInnings === 1 ? setScore1 : setScore2;

    // Innings completion (10 wickets OR 50 overs)
    if (isInningsComplete(score) || score.balls >= MAX_BALLS) {
      if (currentInnings === 1) {
        setCurrentInnings(2);
        setCurrentBatsman({ name: "D. Warner", runs: 0, balls: 0 });
        setCurrentBowler({ name: "J. Bumrah", balls: 0, wickets: 0, runs: 0 });

        setCommentary(prev => [
          {
            id: Date.now(),
            text: `INNINGS BREAK! ${matchTeams[0].name} set a target of ${
              score1.runs + 1
            } runs 🎯`,
            type: "normal",
            over: ballsToOversDisplay(score.balls),
            timestamp: new Date(),
          },
          ...prev.slice(0, 19),
        ]);
        return;
      } else {
        setIsMatchComplete(true);
        setCommentary(prev => [
          {
            id: Date.now(),
            text: getMatchResult(
              matchTeams[0].name,
              matchTeams[1].name,
              score1,
              score2
            ),
            type: "normal",
            over: ballsToOversDisplay(score.balls),
            timestamp: new Date(),
          },
          ...prev.slice(0, 19),
        ]);
        return;
      }
    }

    // Target chase check (CORRECT RULE)
    if (
      currentInnings === 2 &&
      score2.runs >= score1.runs + 1
    ) {
      setIsMatchComplete(true);
      return;
    }

    // Simulate ball
    const result = simulateBall(score.wickets);
    const isLegal = !result.isWide && !result.isNoBall;

    setScore(prev => ({
      runs: prev.runs + result.runs,
      wickets: result.isWicket ? Math.min(10, prev.wickets + 1) : prev.wickets,
      balls: isLegal ? prev.balls + 1 : prev.balls,
    }));

    // Batsman
    if (!result.isWicket) {
      setCurrentBatsman(prev => ({
        ...prev,
        runs: prev.runs + (isLegal ? result.runs : 0),
        balls: isLegal ? prev.balls + 1 : prev.balls,
      }));
    } else {
      const names =
        currentInnings === 1
          ? ["R. Sharma", "S. Gill", "K. Rahul", "H. Pandya"]
          : ["S. Smith", "M. Labuschagne", "G. Maxwell"];
      setCurrentBatsman({
        name: names[Math.floor(Math.random() * names.length)],
        runs: 0,
        balls: 0,
      });
    }

    // Bowler
    setCurrentBowler(prev => ({
      ...prev,
      balls: isLegal ? prev.balls + 1 : prev.balls,
      wickets: result.isWicket ? prev.wickets + 1 : prev.wickets,
      runs: prev.runs + result.runs,
    }));

    // Commentary
    const displayBalls = isLegal ? score.balls + 1 : score.balls;
    setCommentary(prev => [
      {
        id: Date.now(),
        text: result.description,
        type: getCommentaryType(result),
        over: ballsToOversDisplay(displayBalls),
        timestamp: new Date(),
      },
      ...prev.slice(0, 19),
    ]);

    // Overreaction
    setOverreaction(prev => {
      let delta = Math.random() * 10 - 5;
      if (result.isWicket) delta += 30;
      if (result.isSix) delta += 20;
      return Math.min(100, Math.max(0, prev + delta));
    });

    // Crowd mood
    if (Math.random() > 0.6 || result.isWicket) {
      setCrowdMood(crowdMoods[Math.floor(Math.random() * crowdMoods.length)]);
    }
  }, [
    currentInnings,
    score1,
    score2,
    isMatchComplete,
    matchTeams,
  ]);

  useEffect(() => {
    const i = setInterval(updateMatch, 2500);
    return () => clearInterval(i);
  }, [updateMatch]);

  const currentScore = currentInnings === 1 ? score1 : score2;

  return (
  <div className="min-h-screen flex flex-col">
    <NavBar />

    <main className="flex-1 py-8">
      <div className="container mx-auto px-4">
        {/* 🔴 YOUR FULL MATCH UI HERE */}
        {/* Scoreboard */}
        {/* Commentary */}
        {/* TeamTakes */}
        {/* Sidebar */}
      </div>
    </main>

    <Footer />

    <TeamPreferencesModal
      isOpen={showPreferences}
      onClose={() => setShowPreferences(false)}
    />
  </div>
);



export default Match;
