"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Radio, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LiveMatchCardProps {
  compact?: boolean;
}

const BALLS_PER_OVER = 6;

const teams = [
  { name: "India", short: "IND", emoji: "🇮🇳" },
  { name: "Australia", short: "AUS", emoji: "🇦🇺" },
  { name: "England", short: "ENG", emoji: "🏴" },
  { name: "Pakistan", short: "PAK", emoji: "🇵🇰" },
  { name: "New Zealand", short: "NZ", emoji: "🇳🇿" },
];

const crowdMoods = ["😡", "😭", "🤡", "🎉", "😱", "🥱", "🔥", "💀"];

const events = [
  "FOUR! But the fielder is still running...",
  "SIX! WiFi disconnected mid-celebration",
  "WICKET! Third umpire still buffering 🔄",
  "Wide ball. Bowler questions existence.",
  "Dot ball. Commentator falls asleep.",
  "Single taken. Crowd riots anyway.",
  "No ball! Bowler celebrates too early.",
  "Dropped catch! Replays show nothing useful.",
  "OUT! Wait... referral incoming...",
  "REVIEW! Nobody knows why.",
  "DRS says... maybe? Umpire shrugs.",
  "Rain delay. Of course.",
];

const getRandomTeams = () => {
  const shuffled = [...teams].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};

const formatOvers = (balls: number) => {
  const overs = Math.floor(balls / BALLS_PER_OVER);
  const ballsInOver = balls % BALLS_PER_OVER;
  return `${overs}.${ballsInOver}`;
};

const LiveMatchCard = ({ compact = false }: LiveMatchCardProps) => {
  const [matchTeams] = useState(getRandomTeams);

  const [score1, setScore1] = useState({
    runs: 156,
    wickets: 3,
    balls: 154, // 25.4 overs
  });

  const [score2, setScore2] = useState({
    runs: 142,
    wickets: 5,
    balls: 170, // 28.2 overs
  });

  const [overreaction, setOverreaction] = useState(67);
  const [crowdMood, setCrowdMood] = useState("🔥");
  const [lastEvent, setLastEvent] = useState(events[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore1(prev => ({
        runs: prev.runs + Math.floor(Math.random() * 7),
        wickets: prev.wickets + (Math.random() > 0.9 ? 1 : 0),
        balls: prev.balls + 1,
      }));

      setScore2(prev => ({
        runs: prev.runs + Math.floor(Math.random() * 4),
        wickets: prev.wickets + (Math.random() > 0.95 ? 1 : 0),
        balls: prev.balls + 1,
      }));

      setOverreaction(prev =>
        Math.min(100, Math.max(0, prev + (Math.random() * 20 - 10)))
      );

      setCrowdMood(
        crowdMoods[Math.floor(Math.random() * crowdMoods.length)]
      );

      setLastEvent(events[Math.floor(Math.random() * events.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTrend = () => {
    const diff = score1.runs - score2.runs;
    if (diff > 20) return <TrendingUp className="w-4 h-4 text-success" />;
    if (diff < -20) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  /* ---------------- COMPACT CARD ---------------- */

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-card rounded-xl p-4 shadow-card border border-primary/20"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-destructive animate-live-pulse" />
            <span className="text-xs font-semibold text-destructive uppercase tracking-wide">
              Live
            </span>
          </div>
          <span className="text-2xl">{crowdMood}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {matchTeams[0].emoji} {matchTeams[0].short}
            </span>
            <span className="font-display text-lg">
              {score1.runs}/{score1.wickets}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">
              {matchTeams[1].emoji} {matchTeams[1].short}
            </span>
            <span className="font-display text-lg">
              {score2.runs}/{score2.wickets}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ---------------- FULL CARD ---------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-card rounded-2xl p-6 shadow-hover border-2 border-primary/30 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-4 py-1 rounded-bl-xl font-display flex items-center gap-2">
        <Radio className="w-4 h-4 animate-live-pulse" />
        LIVE CHAOS
      </div>

      <div className="grid grid-cols-3 gap-4 items-center mt-6">
        <div className="text-center">
          <span className="text-4xl block">{matchTeams[0].emoji}</span>
          <h3 className="font-display text-xl">{matchTeams[0].name}</h3>
          <motion.p
            key={score1.runs}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-display text-3xl text-primary mt-2"
          >
            {score1.runs}/{score1.wickets}
          </motion.p>
          <p className="text-sm text-muted-foreground">
            ({formatOvers(score1.balls)} ov)
          </p>
        </div>

        <div className="text-center">
          <div className="font-display text-2xl text-secondary">VS</div>
          <div className="flex justify-center mt-2">{getTrend()}</div>
        </div>

        <div className="text-center">
          <span className="text-4xl block">{matchTeams[1].emoji}</span>
          <h3 className="font-display text-xl">{matchTeams[1].name}</h3>
          <motion.p
            key={score2.runs}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-display text-3xl text-primary mt-2"
          >
            {score2.runs}/{score2.wickets}
          </motion.p>
          <p className="text-sm text-muted-foreground">
            ({formatOvers(score2.balls)} ov)
          </p>
        </div>
      </div>

      <motion.div
        key={lastEvent}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-6 p-4 bg-background/50 rounded-xl"
      >
        <p className="text-sm text-muted-foreground mb-1">Latest Bug 🐛</p>
        <p className="font-medium">{lastEvent}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Overreaction Meter</span>
            <span className="font-display">{Math.round(overreaction)}%</span>
          </div>
          <div className="h-3 bg-background/50 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${overreaction}%` }}
              className={`h-full rounded-full ${
                overreaction > 80
                  ? "bg-destructive"
                  : overreaction > 50
                  ? "bg-accent"
                  : "bg-success"
              }`}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm mb-1">Crowd Mood</p>
          <motion.span
            key={crowdMood}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-4xl block"
          >
            {crowdMood}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveMatchCard;
