import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Volume2, VolumeX, RefreshCw, Trophy, Clock, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const teams = [
  { name: "India", short: "IND", emoji: "🇮🇳", color: "bg-blue-500" },
  { name: "Australia", short: "AUS", emoji: "🇦🇺", color: "bg-yellow-500" },
];

const commentaryLines = [
  { text: "Bowler runs in… thinks… forgets… bowls.", type: "normal" },
  { text: "FOUR! Right through the gap! The fielder is still recovering from lunch.", type: "four" },
  { text: "SIX! That's massive! WiFi disconnected mid-celebration.", type: "six" },
  { text: "Dot ball. Crowd updates their fantasy teams.", type: "normal" },
  { text: "Wide! The bowler appeals anyway. Old habits.", type: "wide" },
  { text: "WICKET! He's gone! Third umpire still buffering though... 🔄", type: "wicket" },
  { text: "No ball! Bowler celebrates too early. This isn't football!", type: "noball" },
  { text: "Dropped catch! Replays show absolutely nothing useful.", type: "dropped" },
  { text: "Single taken. Somewhere, a fan is writing a 500-word tweet about it.", type: "normal" },
  { text: "DRS review! Nobody knows why. Including the captain.", type: "review" },
  { text: "The umpire looks confused. Everyone looks confused. Classic cricket.", type: "normal" },
  { text: "Batsman adjusts his helmet for the 47th time. Still not comfortable.", type: "normal" },
  { text: "BOUNCER! That whistled past his nose. So did his career just now.", type: "normal" },
  { text: "Appeal! The whole team appeals! The water boy appeals! Denied.", type: "appeal" },
  { text: "Rain delay imminent. Fans already completing their Netflix backlog.", type: "rain" },
  { text: "Run out attempt! Direct hit! Wait, it's a direct miss. Never mind.", type: "normal" },
  { text: "The captain changes the field. Nobody knows why. Including him.", type: "normal" },
  { text: "Bowler wipes the ball on the umpire. Umpire is not impressed.", type: "normal" },
];

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
  type: string;
  over: string;
  timestamp: Date;
}

const Match = () => {
  const [score1, setScore1] = useState({ runs: 156, wickets: 3, overs: 25.4 });
  const [score2, setScore2] = useState({ runs: 0, wickets: 0, overs: 0 });
  const [overreaction, setOverreaction] = useState(67);
  const [crowdMood, setCrowdMood] = useState(crowdMoods[6]);
  const [commentary, setCommentary] = useState<CommentaryEntry[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [matchStatus, setMatchStatus] = useState("LIVE");
  const [currentBatsman, setCurrentBatsman] = useState({ name: "V. Kohli", runs: 67, balls: 48 });
  const [currentBowler, setCurrentBowler] = useState({ name: "P. Cummins", overs: "5.4", wickets: 1, runs: 32 });

  useEffect(() => {
    // Add initial commentary
    const initial = commentaryLines.slice(0, 3).map((line, i) => ({
      id: i,
      text: line.text,
      type: line.type,
      over: `${25 - i}.${Math.floor(Math.random() * 6)}`,
      timestamp: new Date(),
    }));
    setCommentary(initial);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random score update
      const runsScored = Math.floor(Math.random() * 7);
      const wicketFallen = Math.random() > 0.92;

      setScore1((prev) => ({
        runs: prev.runs + runsScored,
        wickets: wicketFallen ? Math.min(10, prev.wickets + 1) : prev.wickets,
        overs: Math.min(50, parseFloat((prev.overs + 0.1).toFixed(1))),
      }));

      // Update batsman
      if (runsScored > 0) {
        setCurrentBatsman((prev) => ({
          ...prev,
          runs: prev.runs + runsScored,
          balls: prev.balls + 1,
        }));
      }

      // Update bowler
      if (wicketFallen) {
        setCurrentBowler((prev) => ({
          ...prev,
          wickets: prev.wickets + 1,
        }));
      }

      // Update overreaction
      setOverreaction((prev) => {
        const change = (Math.random() * 30 - 15) + (runsScored > 4 ? 20 : 0) + (wicketFallen ? 30 : 0);
        return Math.min(100, Math.max(0, prev + change));
      });

      // Update crowd mood
      if (Math.random() > 0.7) {
        setCrowdMood(crowdMoods[Math.floor(Math.random() * crowdMoods.length)]);
      }

      // Add commentary
      const newLine = commentaryLines[Math.floor(Math.random() * commentaryLines.length)];
      const newEntry: CommentaryEntry = {
        id: Date.now(),
        text: newLine.text,
        type: newLine.type,
        over: score1.overs.toFixed(1),
        timestamp: new Date(),
      };

      setCommentary((prev) => [newEntry, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [score1.overs]);

  const getCommentaryStyle = (type: string) => {
    switch (type) {
      case "four":
        return "bg-success/20 border-success text-success";
      case "six":
        return "bg-primary/20 border-primary text-primary";
      case "wicket":
        return "bg-destructive/20 border-destructive text-destructive";
      case "review":
        return "bg-accent/20 border-accent text-accent-foreground";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Match Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Radio className="w-6 h-6 text-destructive animate-live-pulse" />
              <span className="font-display text-2xl text-destructive">{matchStatus}</span>
              <span className="text-muted-foreground">• ODI Match #404</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon">
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
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">{teams[0].emoji}</span>
                    <h3 className="font-display text-2xl">{teams[0].name}</h3>
                    <motion.p
                      key={score1.runs}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="font-display text-5xl text-primary mt-2"
                    >
                      {score1.runs}/{score1.wickets}
                    </motion.p>
                    <p className="text-muted-foreground">({score1.overs.toFixed(1)} overs)</p>
                  </div>

                  <div className="text-center">
                    <Trophy className="w-10 h-10 mx-auto text-chaos-gold mb-2" />
                    <span className="font-display text-xl text-secondary">VS</span>
                  </div>

                  <div className="text-center opacity-50">
                    <span className="text-5xl mb-2 block">{teams[1].emoji}</span>
                    <h3 className="font-display text-2xl">{teams[1].name}</h3>
                    <p className="font-display text-5xl text-muted-foreground mt-2">
                      Yet to Bat
                    </p>
                    <p className="text-muted-foreground">(Probably nervous)</p>
                  </div>
                </div>

                {/* Current Players */}
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
                        <p className="text-xs text-muted-foreground">({currentBowler.overs} ov)</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                </div>
              </div>
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
                    <span className="text-muted-foreground">Run Rate</span>
                    <span className="font-display text-lg">
                      {(score1.runs / Math.max(1, score1.overs)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Boundaries</span>
                    <span className="font-display text-lg">
                      {Math.floor(Math.random() * 15 + 10)} 4s, {Math.floor(Math.random() * 5 + 2)} 6s
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Dots</span>
                    <span className="font-display text-lg">{Math.floor(Math.random() * 50 + 30)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">DRS Used</span>
                    <span className="font-display text-lg">1/2 (Both Wrong)</span>
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
                  {teams[0].name} to win
                </p>
                <p className="text-sm opacity-80">
                  Confidence: {Math.floor(Math.random() * 30 + 50)}%
                  <br />
                  (Changes every 5 seconds)
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
    </div>
  );
};

export default Match;
