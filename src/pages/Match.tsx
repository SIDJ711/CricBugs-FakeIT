import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Volume2, VolumeX, RefreshCw, Trophy, Target, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TeamTakes from "@/components/TeamTakes";
import TeamPreferencesModal from "@/components/TeamPreferencesModal";
import { 
  ballsToOversDisplay, 
  simulateBall, 
  isInningsComplete,
  getMatchResult,
  type Score,
  type BallResult
} from "@/lib/cricketEngine";
import { ALL_TEAMS, useTeamPreferences } from "@/hooks/useTeamPreferences";

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
  { emoji: "😤", label: "Triggered" },
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
  
  // Pick teams based on preferences or random
  const [matchTeams] = useState(() => {
    const preferred = ALL_TEAMS.filter(t => favoriteTeams.includes(t.id));
    if (preferred.length >= 2) {
      return [preferred[0], preferred[1]];
    } else if (preferred.length === 1) {
      const others = ALL_TEAMS.filter(t => t.id !== preferred[0].id);
      return [preferred[0], others[Math.floor(Math.random() * others.length)]];
    }
    // Default: India vs Australia
    return [ALL_TEAMS[0], ALL_TEAMS[1]];
  });

  // Proper ball-based scoring (not decimal overs!)
  const [score1, setScore1] = useState<Score>({ runs: 0, wickets: 0, balls: 0 });
  const [score2, setScore2] = useState<Score>({ runs: 0, wickets: 0, balls: 0 });
  const [currentInnings, setCurrentInnings] = useState<1 | 2>(1);
  const [isMatchComplete, setIsMatchComplete] = useState(false);
  
  const [overreaction, setOverreaction] = useState(50);
  const [crowdMood, setCrowdMood] = useState(crowdMoods[6]);
  const [commentary, setCommentary] = useState<CommentaryEntry[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentBatsman, setCurrentBatsman] = useState({ name: "V. Kohli", runs: 0, balls: 0 });
  const [currentBowler, setCurrentBowler] = useState({ name: "P. Cummins", balls: 0, wickets: 0, runs: 0 });

  const getCommentaryType = (result: BallResult): CommentaryEntry["type"] => {
    if (result.isWicket) return "wicket";
    if (result.isSix) return "six";
    if (result.isBoundary) return "four";
    if (result.isWide) return "wide";
    if (result.isNoBall) return "noball";
    return "normal";
  };

  const updateMatch = useCallback(() => {
    if (isMatchComplete) return;

    const currentScore = currentInnings === 1 ? score1 : score2;
    const setCurrentScore = currentInnings === 1 ? setScore1 : setScore2;

    // Check if innings is complete (10 wickets or 300 balls / 50 overs)
    if (isInningsComplete(currentScore)) {
      if (currentInnings === 1) {
        setCurrentInnings(2);
        // Reset batsman/bowler for second innings
        setCurrentBatsman({ name: "S. Warner", runs: 0, balls: 0 });
        setCurrentBowler({ name: "J. Bumrah", balls: 0, wickets: 0, runs: 0 });
        // Add innings break commentary
        const breakEntry: CommentaryEntry = {
          id: Date.now(),
          text: `INNINGS BREAK! ${matchTeams[0].name} set a target of ${score1.runs + 1} runs! 🎯`,
          type: "normal",
          over: ballsToOversDisplay(currentScore.balls),
          timestamp: new Date(),
        };
        setCommentary(prev => [breakEntry, ...prev.slice(0, 19)]);
        return;
      } else {
        setIsMatchComplete(true);
        const resultEntry: CommentaryEntry = {
          id: Date.now(),
          text: getMatchResult(matchTeams[0].name, matchTeams[1].name, score1, score2),
          type: "normal",
          over: ballsToOversDisplay(currentScore.balls),
          timestamp: new Date(),
        };
        setCommentary(prev => [resultEntry, ...prev.slice(0, 19)]);
        return;
      }
    }

    // Check if target achieved in second innings
    if (currentInnings === 2 && score2.runs > score1.runs) {
      setIsMatchComplete(true);
      const resultEntry: CommentaryEntry = {
        id: Date.now(),
        text: getMatchResult(matchTeams[0].name, matchTeams[1].name, score1, score2),
        type: "normal",
        over: ballsToOversDisplay(score2.balls),
        timestamp: new Date(),
      };
      setCommentary(prev => [resultEntry, ...prev.slice(0, 19)]);
      return;
    }

    // Simulate a ball
    const result = simulateBall(currentScore.wickets);
    const isLegalDelivery = !result.isWide && !result.isNoBall;

    // Update score - balls only increment on legal deliveries
    setCurrentScore(prev => ({
      runs: prev.runs + result.runs,
      wickets: result.isWicket ? Math.min(10, prev.wickets + 1) : prev.wickets,
      balls: isLegalDelivery ? prev.balls + 1 : prev.balls,
    }));

    // Update batsman stats
    if (!result.isWicket) {
      setCurrentBatsman(prev => ({
        ...prev,
        runs: prev.runs + (result.isWide || result.isNoBall ? 0 : result.runs),
        balls: isLegalDelivery ? prev.balls + 1 : prev.balls,
      }));
    } else {
      // New batsman comes in
      const batsmanNames = currentInnings === 1 
        ? ["R. Sharma", "S. Gill", "K. Rahul", "S. Iyer", "R. Pant", "H. Pandya", "R. Jadeja"]
        : ["S. Smith", "M. Labuschagne", "T. Head", "G. Maxwell", "A. Carey", "M. Marsh"];
      setCurrentBatsman({
        name: batsmanNames[Math.floor(Math.random() * batsmanNames.length)],
        runs: 0,
        balls: 0,
      });
    }

    // Update bowler stats
    setCurrentBowler(prev => ({
      ...prev,
      balls: isLegalDelivery ? prev.balls + 1 : prev.balls,
      wickets: result.isWicket ? prev.wickets + 1 : prev.wickets,
      runs: prev.runs + result.runs,
    }));

    // Add commentary entry - use proper ball display
    const displayBalls = isLegalDelivery ? currentScore.balls + 1 : currentScore.balls;
    const newEntry: CommentaryEntry = {
      id: Date.now(),
      text: result.description,
      type: getCommentaryType(result),
      over: ballsToOversDisplay(displayBalls),
      timestamp: new Date(),
    };
    setCommentary(prev => [newEntry, ...prev.slice(0, 19)]);

    // Update overreaction meter
    setOverreaction(prev => {
      let change = Math.random() * 10 - 5;
      if (result.isWicket) change += 30;
      if (result.isSix) change += 20;
      if (result.isBoundary) change += 10;
      if (result.runs === 0 && !result.isWicket) change -= 5;
      return Math.min(100, Math.max(0, prev + change));
    });

    // Update crowd mood occasionally
    if (Math.random() > 0.6 || result.isWicket || result.isSix) {
      setCrowdMood(crowdMoods[Math.floor(Math.random() * crowdMoods.length)]);
    }
  }, [currentInnings, score1, score2, isMatchComplete, matchTeams]);

  useEffect(() => {
    const interval = setInterval(updateMatch, 2500); // Ball every 2.5 seconds
    return () => clearInterval(interval);
  }, [updateMatch]);

  const getCommentaryStyle = (type: CommentaryEntry["type"]) => {
    switch (type) {
      case "four":
        return "bg-success/20 border-success text-success";
      case "six":
        return "bg-primary/20 border-primary text-primary";
      case "wicket":
        return "bg-destructive/20 border-destructive text-destructive";
      case "wide":
      case "noball":
        return "bg-accent/20 border-accent text-accent-foreground";
      default:
        return "bg-card border-border";
    }
  };

  const currentScore = currentInnings === 1 ? score1 : score2;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Match Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {isMatchComplete ? (
                <Trophy className="w-6 h-6 text-chaos-gold" />
              ) : (
                <Radio className="w-6 h-6 text-destructive animate-live-pulse" />
              )}
              <span className="font-display text-2xl text-destructive">
                {isMatchComplete ? "COMPLETED" : "LIVE"}
              </span>
              <span className="text-muted-foreground">• ODI Match #404</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPreferences(true)}
                title="Team Preferences"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.location.reload()}>
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Scoreboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-card rounded-2xl p-6 shadow-hover border-2 border-primary/30"
              >
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className={`text-center p-3 rounded-xl ${currentInnings === 1 && !isMatchComplete ? "ring-2 ring-primary" : ""}`}>
                    <span className="text-5xl mb-2 block">{matchTeams[0].emoji}</span>
                    <h3 className="font-display text-2xl">{matchTeams[0].name}</h3>
                    <motion.p
                      key={score1.runs}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="font-display text-5xl text-primary mt-2"
                    >
                      {score1.runs}/{score1.wickets}
                    </motion.p>
                    <p className="text-muted-foreground">({ballsToOversDisplay(score1.balls)} overs)</p>
                    {score1.wickets === 10 && (
                      <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full mt-2 inline-block">
                        All Out
                      </span>
                    )}
                  </div>

                  <div className="text-center">
                    <Trophy className="w-10 h-10 mx-auto text-chaos-gold mb-2" />
                    <span className="font-display text-xl text-secondary">VS</span>
                  </div>

                  <div className={`text-center p-3 rounded-xl ${currentInnings === 2 && !isMatchComplete ? "ring-2 ring-primary" : ""}`}>
                    <span className="text-5xl mb-2 block">{matchTeams[1].emoji}</span>
                    <h3 className="font-display text-2xl">{matchTeams[1].name}</h3>
                    <motion.p
                      key={score2.runs}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className={`font-display text-5xl mt-2 ${currentInnings >= 2 ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {currentInnings === 1 ? "—" : `${score2.runs}/${score2.wickets}`}
                    </motion.p>
                    {currentInnings >= 2 ? (
                      <p className="text-muted-foreground">({ballsToOversDisplay(score2.balls)} overs)</p>
                    ) : (
                      <p className="text-muted-foreground">(Yet to bat)</p>
                    )}
                    {score2.wickets === 10 && currentInnings === 2 && (
                      <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full mt-2 inline-block">
                        All Out
                      </span>
                    )}
                  </div>
                </div>

                {/* Target / Match Status */}
                {currentInnings === 2 && !isMatchComplete && (
                  <div className="mt-4 text-center p-3 bg-secondary/20 rounded-xl">
                    <p className="text-lg font-medium">
                      Need <span className="font-display text-2xl text-primary">{Math.max(0, score1.runs - score2.runs + 1)}</span> runs from{" "}
                      <span className="font-display text-2xl">{Math.max(0, 300 - score2.balls)}</span> balls
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Required Rate: {((score1.runs - score2.runs + 1) / Math.max(1, (300 - score2.balls)) * 6).toFixed(2)}
                    </p>
                  </div>
                )}

                {isMatchComplete && (
                  <div className="mt-4 text-center p-4 bg-chaos-gold/20 rounded-xl">
                    <p className="font-display text-2xl text-chaos-gold">
                      {getMatchResult(matchTeams[0].name, matchTeams[1].name, score1, score2)}
                    </p>
                  </div>
                )}

                {/* Current Players */}
                {!isMatchComplete && (
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                    <div className="bg-background/50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Batsman 🏏</p>
                          <p className="font-display text-xl">{currentBatsman.name}*</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-2xl text-primary">{currentBatsman.runs}</p>
                          <p className="text-xs text-muted-foreground">({currentBatsman.balls} balls)</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-background/50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Bowler ⚾</p>
                          <p className="font-display text-xl">{currentBowler.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-lg">{currentBowler.wickets}-{currentBowler.runs}</p>
                          <p className="text-xs text-muted-foreground">({ballsToOversDisplay(currentBowler.balls)} ov)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Commentary */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">📢</span>
                  Live Commentary
                  <span className="text-xs font-normal text-muted-foreground ml-auto">
                    (100% Fabricated)
                  </span>
                </h3>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  <AnimatePresence mode="popLayout">
                    {commentary.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 rounded-xl border-l-4 ${getCommentaryStyle(entry.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-display text-sm bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                            {entry.over}
                          </span>
                          <p className="flex-1">{entry.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {commentary.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <span className="text-4xl block mb-2">🏏</span>
                      <p>Match starting... Commentary coming soon!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Takes Filter */}
              <TeamTakes
                team1Name={matchTeams[0].name}
                team1Emoji={matchTeams[0].emoji}
                team2Name={matchTeams[1].name}
                team2Emoji={matchTeams[1].emoji}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Overreaction Meter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Overreaction Meter
                </h3>
                <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${overreaction}%` }}
                    className={`h-full rounded-full transition-colors ${
                      overreaction > 80
                        ? "bg-destructive"
                        : overreaction > 50
                        ? "bg-accent"
                        : "bg-success"
                    }`}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-muted-foreground">Calm</span>
                  <span className="font-display text-lg">{Math.round(overreaction)}%</span>
                  <span className="text-muted-foreground">CHAOS</span>
                </div>
              </motion.div>

              {/* Crowd Mood */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
              >
                <h3 className="font-display text-xl mb-4">Crowd Mood</h3>
                <motion.div
                  key={crowdMood.emoji}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-7xl mb-2"
                >
                  {crowdMood.emoji}
                </motion.div>
                <p className="font-medium text-muted-foreground">{crowdMood.label}</p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="font-display text-xl mb-4">Quick Stats 📊</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Current Run Rate</span>
                    <span className="font-display text-lg">
                      {currentScore.balls > 0 ? (currentScore.runs / currentScore.balls * 6).toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Balls Remaining</span>
                    <span className="font-display text-lg">{300 - currentScore.balls}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Innings</span>
                    <span className="font-display text-lg">{currentInnings} of 2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Wickets Left</span>
                    <span className="font-display text-lg">{10 - currentScore.wickets}</span>
                  </div>
                </div>
              </motion.div>

              {/* AI Prediction */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-hero rounded-2xl p-6 text-primary-foreground"
              >
                <h3 className="font-display text-xl mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  AI* Prediction
                </h3>
                <p className="text-3xl font-display mb-1">
                  {isMatchComplete 
                    ? "Match Over!" 
                    : currentInnings === 1 
                      ? `${matchTeams[0].name} vibes`
                      : score2.runs > score1.runs * 0.5 
                        ? `${matchTeams[1].name} looking good`
                        : `${matchTeams[0].name} ahead`
                  }
                </p>
                <p className="text-sm opacity-80">
                  Confidence: {Math.floor(Math.random() * 30 + 50)}%
                </p>
                <p className="text-xs opacity-60 mt-4">
                  *Actually Imaginary
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <TeamPreferencesModal 
        isOpen={showPreferences} 
        onClose={() => setShowPreferences(false)} 
      />
    </div>
  );
};

export default Match;
