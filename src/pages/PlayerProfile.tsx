import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target,
  Zap,
  ThumbsDown,
  Calendar,
  MapPin,
  Trophy,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Mock player data
const playerData: Record<string, any> = {
  "virat-kohli": {
    name: "Virat Kohli",
    nickname: "Cheeku",
    country: "India",
    emoji: "🇮🇳",
    role: "Batsman / Professional Celebrator",
    image: "🏏",
    age: 35,
    birthplace: "Delhi, India",
    bio: "Known for his passionate celebrations that last longer than some test matches. Has a PhD in Aggressive Hand Gestures from the University of Sledging. Favorite meal: Bowler's confidence.",
    strengths: [
      "Cover drives that make photographers weep",
      "Celebrations visible from space",
      "Can score centuries while arguing with umpire",
      "Beard maintenance under pressure",
    ],
    weaknesses: [
      "Cannot resist playing outside off stump",
      "Gets out to spin after tea (too full)",
      "Celebrations use 40% of energy",
      "Twitter fingers during rain delays",
    ],
    stats: {
      consistency: 78,
      appealRate: 95,
      batSwingMiss: 12,
      fieldingBlunders: 3,
      celebrationIntensity: 100,
      umpireArguments: 87,
    },
    form: [65, 72, 88, 45, 90, 82, 78, 95, 60, 70, 85, 92],
    achievements: [
      "🏆 Most Aggressive Celebrations (2019-2024)",
      "👑 King of Vibes Award",
      "🎭 Best Actor in a DRS Review",
      "💪 Intimidation Excellence",
    ],
  },
  "steve-smith": {
    name: "Steve Smith",
    nickname: "Smudge",
    country: "Australia",
    emoji: "🇦🇺",
    role: "No Run- Specialist",
    image: "🦘",
    age: 34,
    birthplace: "Sydney, Australia",
    bio: "The man who can't stand still. His pre-ball routine involves touching the crease 47 times, adjusting his gloves 23 times, and questioning his life choices twice. Runs are just a side effect.",
    strengths: [
      "Unorthodox technique that confuses everyone",
      "Can bat for days (literally)",
      "Crease-marking precision",
      "Glove adjustment world record holder",
    ],
    weaknesses: [
      "Wastes 20% of match time adjusting gear",
      "Bowlers age waiting for him to face",
      "Commentators run out of things to say",
      "Sandpaper jokes still hurt",
    ],
    stats: {
      consistency: 82,
      appealRate: 67,
      batSwingMiss: 8,
      fieldingBlunders: 15,
      celebrationIntensity: 40,
      umpireArguments: 25,
    },
    form: [80, 85, 78, 92, 88, 75, 82, 90, 85, 78, 82, 86],
    achievements: [
      "🔄 Most Fidgets Per Over",
      "⏱️ Slowest Over Rate Contributor",
      "🧤 Glove Adjustment Champion",
      "🏏 Unorthodox Technique Award",
    ],
  },
};

const defaultPlayer = {
  name: "Unknown Bug",
  nickname: "The Mysterious One",
  country: "Unknown",
  emoji: "🦗",
  role: "Unknown / Mystery",
  image: "❓",
  age: "???",
  birthplace: "Somewhere in the Crease",
  bio: "This player is so mysterious even the stats database doesn't know about them. Last seen arguing with an umpire about the meaning of life.",
  strengths: ["Being mysterious", "Avoiding statistics", "Confusing analysts"],
  weaknesses: ["Being found", "Documentation", "Social media presence"],
  stats: {
    consistency: 50,
    appealRate: 50,
    batSwingMiss: 50,
    fieldingBlunders: 50,
    celebrationIntensity: 50,
    umpireArguments: 50,
  },
  form: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
  achievements: ["🦗 Exists (Probably)"],
};

const PlayerProfile = () => {
  const { playerId } = useParams();
  const player = playerData[playerId || ""] || defaultPlayer;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/players">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Bug Stars
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-card rounded-2xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-8xl"
              >
                {player.image}
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{player.emoji}</span>
                  <h1 className="font-display text-4xl md:text-5xl text-primary">
                    {player.name}
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground italic mb-4">
                  "{player.nickname}"
                </p>
                <p className="text-lg mb-4">{player.role}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Age: {player.age}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {player.birthplace}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-foreground/80 max-w-3xl">
              {player.bio}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Form Graph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="font-display text-2xl mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  Form Graph (Last 12 Months)
                </h3>

                <div className="h-48 flex items-end gap-2">
                  {player.form.map((value: number, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                      className={`flex-1 rounded-t-lg ${
                        value > 80
                          ? "bg-success"
                          : value > 60
                          ? "bg-primary"
                          : value > 40
                          ? "bg-accent"
                          : "bg-destructive"
                      }`}
                      title={`${months[index]}: ${value}%`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {months.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  *Form calculated using advanced algorithms (random numbers)
                </p>
              </motion.div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-success/30"
                >
                  <h3 className="font-display text-xl mb-4 flex items-center gap-2 text-success">
                    <TrendingUp className="w-5 h-5" />
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    {player.strengths.map((strength: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-destructive/30"
                >
                  <h3 className="font-display text-xl mb-4 flex items-center gap-2 text-destructive">
                    <TrendingDown className="w-5 h-5" />
                    Weaknesses
                  </h3>
                  <ul className="space-y-3">
                    {player.weaknesses.map((weakness: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-destructive">✗</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="font-display text-xl mb-6">Bug Stats 📊</h3>

                <div className="space-y-4">
                  {Object.entries(player.stats).map(([key, value], index) => {
                    const labels: Record<string, { label: string; icon: any }> = {
                      consistency: { label: "Consistency Index", icon: TrendingUp },
                      appealRate: { label: "Appeal Success Rate", icon: Award },
                      batSwingMiss: { label: "Bat-Swing-Miss", icon: ThumbsDown },
                      fieldingBlunders: { label: "Fielding Blunders", icon: Target },
                      celebrationIntensity: { label: "Celebration Intensity", icon: Zap },
                      umpireArguments: { label: "Umpire Arguments", icon: Award },
                    };

                    const stat = labels[key] || { label: key, icon: BarChart3 };
                    const Icon = stat.icon;

                    return (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm flex items-center gap-1">
                            <Icon className="w-4 h-4 text-primary" />
                            {stat.label}
                          </span>
                          <span className="font-display">{value as number}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value as number}%` }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className={`h-full rounded-full ${
                              (value as number) > 70
                                ? "bg-success"
                                : (value as number) > 40
                                ? "bg-primary"
                                : "bg-destructive"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-chaos-gold" />
                  Achievements
                </h3>
                <ul className="space-y-3">
                  {player.achievements.map((achievement: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                      className="text-sm bg-muted rounded-lg p-3"
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlayerProfile;
