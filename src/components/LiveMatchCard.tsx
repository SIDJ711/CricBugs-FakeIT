import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Radio, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { 
  ballsToOversDisplay, 
  simulateBall, 
  isInningsComplete,
  type Score 
} from "@/lib/cricketEngine";
import { ALL_TEAMS } from "@/hooks/useTeamPreferences";

interface LiveMatchCardProps {
  compact?: boolean;
  team1Id?: string;
  team2Id?: string;
}

const crowdMoods = ["😡", "😭", "🤡", "🎉", "😱", "🥱", "🔥", "💀"];

const getTeamById = (id: string) => {
  return ALL_TEAMS.find(t => t.id === id) || ALL_TEAMS[0];
};

const getRandomTeams = () => {
  const shuffled = [...ALL_TEAMS].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};

const LiveMatchCard = ({ compact = false, team1Id, team2Id }: LiveMatchCardProps) => {
  const [matchTeams] = useState(() => {
    if (team1Id && team2Id) {
      return [getTeamById(team1Id), getTeamById(team2Id)];
    }
    return getRandomTeams();
  });
  
  // Use proper ball-based scoring
  const [score1, setScore1] = useState<Score>({ runs: 156, wickets: 3, balls: 154 }); // 25.4 overs
  const [score2, setScore2] = useState<Score>({ runs: 0, wickets: 0, balls: 0 });
  const [currentInnings, setCurrentInnings] = useState<1 | 2>(1);
  const [overreaction, setOverreaction] = useState(67);
  const [crowdMood, setCrowdMood] = useState("🔥");
  const [lastEvent, setLastEvent] = useState("FOUR! But the fielder is still running...");

  const updateMatch = useCallback(() => {
    if (currentInnings === 1) {
      // First innings
      if (isInningsComplete(score1)) {
        setCurrentInnings(2);
        return;
      }

      const result = simulateBall(score1.wickets);
      
      setScore1(prev => ({
        runs: prev.runs + result.runs,
        wickets: result.isWicket ? prev.wickets + 1 : prev.wickets,
        balls: result.isWide || result.isNoBall ? prev.balls : prev.balls + 1, // Wide/no-ball don't count as legal balls
      }));

      setLastEvent(result.description);
      
      // Update overreaction based on event
      setOverreaction(prev => {
        let change = Math.random() * 10 - 5;
        if (result.isWicket) change += 25;
        if (result.isSix) change += 15;
        if (result.isBoundary) change += 10;
        return Math.min(100, Math.max(0, prev + change));
      });
    } else {
      // Second innings
      if (score2.runs > score1.runs || isInningsComplete(score2)) {
        return; // Match complete
      }

      const result = simulateBall(score2.wickets);
      
      setScore2(prev => ({
        runs: prev.runs + result.runs,
        wickets: result.isWicket ? prev.wickets + 1 : prev.wickets,
        balls: result.isWide || result.isNoBall ? prev.balls : prev.balls + 1,
      }));

      setLastEvent(result.description);
      
      setOverreaction(prev => {
        let change = Math.random() * 10 - 5;
        if (result.isWicket) change += 25;
        if (result.isSix) change += 15;
        return Math.min(100, Math.max(0, prev + change));
      });
    }

    // Update crowd mood occasionally
    if (Math.random() > 0.7) {
      setCrowdMood(crowdMoods[Math.floor(Math.random() * crowdMoods.length)]);
    }
  }, [currentInnings, score1, score2]);

  useEffect(() => {
    const interval = setInterval(updateMatch, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, [updateMatch]);

  const currentScore = currentInnings === 1 ? score1 : score2;
  const getTrend = () => {
    if (currentInnings === 2) {
      const required = score1.runs - score2.runs + 1;
      const ballsRemaining = 300 - score2.balls;
      const requiredRate = (required / ballsRemaining) * 6;
      if (requiredRate < 6) return <TrendingUp className="w-4 h-4 text-success" />;
      if (requiredRate > 10) return <TrendingDown className="w-4 h-4 text-destructive" />;
    }
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-card rounded-xl p-4 shadow-card border border-primary/20"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-destructive animate-live-pulse" />
            <span className="text-xs font-semibold text-destructive uppercase tracking-wide">Live</span>
          </div>
          <span className="text-2xl">{crowdMood}</span>
        </div>
        <div className="space-y-2">
          <div className={`flex justify-between items-center ${currentInnings === 1 ? "font-bold" : ""}`}>
            <span className="font-medium">{matchTeams[0].emoji} {matchTeams[0].short}</span>
            <span className="font-display text-lg">{score1.runs}/{score1.wickets}</span>
          </div>
          <div className={`flex justify-between items-center ${currentInnings === 2 ? "font-bold" : ""}`}>
            <span className="font-medium">{matchTeams[1].emoji} {matchTeams[1].short}</span>
            <span className="font-display text-lg">
              {currentInnings === 1 ? "Yet to bat" : `${score2.runs}/${score2.wickets}`}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-card rounded-2xl p-6 shadow-hover border-2 border-primary/30 overflow-hidden relative"
    >
      {/* Live Badge */}
      <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-4 py-1 rounded-bl-xl font-display flex items-center gap-2">
        <Radio className="w-4 h-4 animate-live-pulse" />
        LIVE CHAOS
      </div>

      {/* Teams & Scores */}
      <div className="grid grid-cols-3 gap-4 items-center mt-6">
        <div className={`text-center ${currentInnings === 1 ? "ring-2 ring-primary rounded-xl p-2" : ""}`}>
          <span className="text-4xl mb-2 block">{matchTeams[0].emoji}</span>
          <h3 className="font-display text-xl">{matchTeams[0].name}</h3>
          <motion.p 
            key={score1.runs}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-display text-3xl text-primary mt-2"
          >
            {score1.runs}/{score1.wickets}
          </motion.p>
          <p className="text-sm text-muted-foreground">({ballsToOversDisplay(score1.balls)} ov)</p>
        </div>

        <div className="text-center">
          <div className="font-display text-2xl text-secondary">VS</div>
          <div className="flex items-center justify-center gap-2 mt-2">
            {getTrend()}
          </div>
        </div>

        <div className={`text-center ${currentInnings === 2 ? "ring-2 ring-primary rounded-xl p-2" : ""}`}>
          <span className="text-4xl mb-2 block">{matchTeams[1].emoji}</span>
          <h3 className="font-display text-xl">{matchTeams[1].name}</h3>
          <motion.p 
            key={score2.runs}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`font-display text-3xl mt-2 ${currentInnings === 2 ? "text-primary" : "text-muted-foreground"}`}
          >
            {currentInnings === 1 ? "Yet to bat" : `${score2.runs}/${score2.wickets}`}
          </motion.p>
          {currentInnings === 2 && (
            <p className="text-sm text-muted-foreground">({ballsToOversDisplay(score2.balls)} ov)</p>
          )}
          {currentInnings === 1 && (
            <p className="text-sm text-muted-foreground">(Nervous)</p>
          )}
        </div>
      </div>

      {/* Target display for second innings */}
      {currentInnings === 2 && (
        <div className="mt-4 text-center p-2 bg-secondary/20 rounded-lg">
          <p className="text-sm font-medium">
            Need <span className="font-display text-lg text-primary">{score1.runs - score2.runs + 1}</span> runs from{" "}
            <span className="font-display text-lg">{300 - score2.balls}</span> balls
          </p>
        </div>
      )}

      {/* Commentary */}
      <motion.div
        key={lastEvent}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-6 p-4 bg-background/50 rounded-xl"
      >
        <p className="text-sm font-medium text-muted-foreground mb-1">Latest Bug 🐛</p>
        <p className="font-medium">{lastEvent}</p>
      </motion.div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Overreaction Meter</span>
            <span className="font-display">{Math.round(overreaction)}%</span>
          </div>
          <div className="h-3 bg-background/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overreaction}%` }}
              className={`h-full rounded-full ${
                overreaction > 80 ? "bg-destructive" : overreaction > 50 ? "bg-accent" : "bg-success"
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
