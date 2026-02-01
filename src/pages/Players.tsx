import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  TrendingUp, 
  Award, 
  Target, 
  Zap, 
  ThumbsDown,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface Player {
  id: string;
  name: string;
  nickname: string;
  country: string;
  emoji: string;
  role: string;
  image: string;
  consistency: number;
  appealRate: number;
  batSwingMiss: number;
  form: "fire" | "decent" | "struggling" | "disaster";
}

const players: Player[] = [
  {
    id: "virat-kohli",
    name: "Virat Kohli",
    nickname: "Cheeku",
    country: "India",
    emoji: "🇮🇳",
    role: "Batsman / Professional Celebrator",
    image: "🏏",
    consistency: 78,
    appealRate: 95,
    batSwingMiss: 12,
    form: "fire",
  },
  {
    id: "steve-smith",
    name: "Steve Smith",
    nickname: "Smudge",
    country: "Australia",
    emoji: "🇦🇺",
    role: "No Run- Specialist",
    image: "🦘",
    consistency: 82,
    appealRate: 67,
    batSwingMiss: 8,
    form: "decent",
  },
  {
    id: "ben-stokes",
    name: "Ben Stokes",
    nickname: "CLutch God",
    country: "England",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    role: "All-rounder / Drama Generator",
    image: "🎭",
    consistency: 65,
    appealRate: 88,
    batSwingMiss: 22,
    form: "fire",
  },
  {
    id: "babar-azam",
    name: "Babar Azam",
    nickname: "Bobzy the King",
    country: "Pakistan",
    emoji: "🇵🇰",
    role: "Boosebumps Batsman",
    image: "✨",
    consistency: 75,
    appealRate: 45,
    batSwingMiss: 5,
    form: "struggling",
  },
  {
    id: "kane-williamson",
    name: "Kane Williamson",
    nickname: "Nice Guy™",
    country: "New Zealand",
    emoji: "🇳🇿",
    role: "Batsman / Niceness Ambassador",
    image: "😊",
    consistency: 88,
    appealRate: 15,
    batSwingMiss: 7,
    form: "decent",
  },
  {
    id: "jasprit-bumrah",
    name: "Jasprit Bumrah",
    nickname: "Yorker Robot",
    country: "India",
    emoji: "🇮🇳",
    role: "Bowler / Physics Defier",
    image: "🤖",
    consistency: 92,
    appealRate: 78,
    batSwingMiss: 0,
    form: "fire",
  },
];

const getFormBadge = (form: Player["form"]) => {
  switch (form) {
    case "fire":
      return { label: "🔥 On Fire", color: "bg-destructive text-destructive-foreground" };
    case "decent":
      return { label: "😐 Decent", color: "bg-accent text-accent-foreground" };
    case "struggling":
      return { label: "😰 Struggling", color: "bg-muted text-muted-foreground" };
    case "disaster":
      return { label: "💀 Disaster", color: "bg-secondary text-secondary-foreground" };
  }
};

const Players = () => {
  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nickname.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-6xl text-primary mb-4"
            >
              Bug Stars ⭐
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Meet the legends. The stats are fake. The drama is real.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search players, nicknames, countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player, index) => {
              const formBadge = getFormBadge(player.form);
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:border-primary/50 transition-all group"
                >
                  {/* Header */}
                  <div className="bg-gradient-card p-6 relative">
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${formBadge.color}`}>
                      {formBadge.label}
                    </span>
                    <div className="text-6xl mb-4">{player.image}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{player.emoji}</span>
                      <div>
                        <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                          {player.name}
                        </h3>
                        <p className="text-sm text-muted-foreground italic">
                          "{player.nickname}"
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{player.role}</p>
                  </div>

                  {/* Stats */}
                  <div className="p-6 space-y-4">
                    {/* Consistency Index */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-success" />
                          Consistency Index
                        </span>
                        <span className="font-display">{player.consistency}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${player.consistency}%` }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="h-full bg-success rounded-full"
                        />
                      </div>
                    </div>

                    {/* Appeal Success Rate */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm flex items-center gap-1">
                          <Award className="w-4 h-4 text-primary" />
                          Appeal Success Rate
                        </span>
                        <span className="font-display">{player.appealRate}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${player.appealRate}%` }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>

                    {/* Bat Swing Miss Ratio */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm flex items-center gap-1">
                          <ThumbsDown className="w-4 h-4 text-destructive" />
                          Bat-Swing-Miss Ratio
                        </span>
                        <span className="font-display">{player.batSwingMiss}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${player.batSwingMiss}%` }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          className="h-full bg-destructive rounded-full"
                        />
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <Link to={`/player/${player.id}`}>
                      <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Full Bug Report
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🦗</span>
              <h3 className="font-display text-2xl text-muted-foreground mb-2">
                No Bugs Found
              </h3>
              <p className="text-muted-foreground">
                Try searching for something else. Or blame the third umpire.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Players;
