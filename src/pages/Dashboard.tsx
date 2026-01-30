import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  User, 
  Settings, 
  LogOut, 
  Trophy, 
  MessageCircle, 
  Flame, 
  History,
  Heart,
  Zap,
  Copy,
  Check,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LiveMatchCard from "@/components/LiveMatchCard";

const hotTakes = [
  "This team would be better with a random Twitter user as captain.",
  "That catch wasn't dropped, gravity was just biased.",
  "The pitch is fine. The batsmen are not.",
  "DRS stands for 'Definitely Random System'",
  "Rain delays are just nature's timeout for snacks.",
  "The third umpire is powered by a potato.",
  "This bowling attack couldn't knock over a plastic cup.",
  "I've seen better fielding at a casual Friday office game.",
  "The only thing rising faster than the run rate is my blood pressure.",
  "This match has more drama than a Bollywood movie marathon.",
];

const reactionHistory = [
  { match: "IND vs AUS", reaction: "😡", comment: "That was OUT!", time: "2 hours ago" },
  { match: "ENG vs NZ", reaction: "🤡", comment: "Bazball is just vibes", time: "5 hours ago" },
  { match: "PAK vs SA", reaction: "😭", comment: "We were robbed", time: "1 day ago" },
  { match: "IND vs ENG", reaction: "🔥", comment: "What a finish!", time: "2 days ago" },
  { match: "AUS vs WI", reaction: "🥱", comment: "Boring draw incoming", time: "3 days ago" },
];

const favoriteChaos = [
  { title: "The Great DRS Disaster of 2024", emoji: "🔄", views: "2.3M" },
  { title: "Captain Drops Catch, Blames Sun", emoji: "☀️", views: "1.8M" },
  { title: "Rain Delay: 4 Hours Edition", emoji: "🌧️", views: "890K" },
];

const Dashboard = () => {
  const [currentHotTake, setCurrentHotTake] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateHotTake = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const randomTake = hotTakes[Math.floor(Math.random() * hotTakes.length)];
    setCurrentHotTake(randomTake);
    setIsGenerating(false);
  };

  const copyHotTake = () => {
    navigator.clipboard.writeText(currentHotTake);
    setIsCopied(true);
    toast({
      title: "Copied! 📋",
      description: "Hot take ready for Twitter. Godspeed.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl text-primary mb-2"
              >
                My Chaos Dashboard 🐛
              </motion.h1>
              <p className="text-muted-foreground">
                Welcome back, fellow cricket enthusiast (read: masochist)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hot Take Generator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground"
              >
                <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <Flame className="w-6 h-6" />
                  Hot Take Generator 🔥
                </h2>
                <p className="opacity-80 mb-6">
                  Generate spicy takes for your next Twitter argument. We take no responsibility for the chaos.
                </p>

                {currentHotTake && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6"
                  >
                    <p className="text-lg font-medium mb-3">"{currentHotTake}"</p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={copyHotTake}
                      className="gap-2"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy for Twitter
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                <Button
                  size="lg"
                  onClick={generateHotTake}
                  disabled={isGenerating}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-primary-foreground font-display gap-2"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Flame className="w-5 h-5" />
                  )}
                  Generate Hot Take
                </Button>
              </motion.div>

              {/* Reaction History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h2 className="font-display text-2xl mb-6 flex items-center gap-2">
                  <History className="w-6 h-6 text-primary" />
                  Your Reaction History
                </h2>

                <div className="space-y-4">
                  {reactionHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-muted rounded-xl"
                    >
                      <span className="text-3xl">{item.reaction}</span>
                      <div className="flex-1">
                        <p className="font-medium">{item.match}</p>
                        <p className="text-sm text-muted-foreground">{item.comment}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </motion.div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  View All Reactions (You've been busy)
                </Button>
              </motion.div>

              {/* Comment Section Rules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Community Guidelines
                </h2>

                <div className="bg-muted rounded-xl p-4 space-y-3">
                  <p className="font-medium text-sm">Our Moderation Rules:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span>1.</span>
                      <span>Blame the umpire, not other users (unless they're umpires)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>2.</span>
                      <span>Hot takes are encouraged. Lukewarm takes will be mocked.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>3.</span>
                      <span>DRS jokes are mandatory. Originality is optional.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>4.</span>
                      <span>No IPL salary discussions. We're all broke here.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>5.</span>
                      <span>Rain delays are sad. Don't make them sadder.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
              >
                <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl mb-1">Cricket Fan #42069</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Level: Professional Overreactor
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="font-display text-xl text-primary">247</p>
                    <p className="text-xs text-muted-foreground">Hot Takes</p>
                  </div>
                  <div>
                    <p className="font-display text-xl text-primary">89</p>
                    <p className="text-xs text-muted-foreground">Arguments</p>
                  </div>
                  <div>
                    <p className="font-display text-xl text-primary">12</p>
                    <p className="text-xs text-muted-foreground">Wins</p>
                  </div>
                </div>
              </motion.div>

              {/* Live Match Widget */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="font-display text-lg mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Live Now
                </h3>
                <LiveMatchCard compact />
                <Link to="/match">
                  <Button variant="outline" className="w-full mt-3">
                    Watch Full Chaos
                  </Button>
                </Link>
              </motion.div>

              {/* Favorite Chaos */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  Favorite Chaos
                </h3>

                <div className="space-y-3">
                  {favoriteChaos.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-chaos-gold" />
                  Your Achievements
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {["🎯", "🔥", "💬", "🏆", "⚡", "🎭"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="aspect-square bg-muted rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:bg-accent/20 transition-colors"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  6 of 42 unlocked. Keep trolling!
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

export default Dashboard;
