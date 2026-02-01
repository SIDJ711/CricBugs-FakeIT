import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bug, Zap, Radio, ArrowRight, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LiveMatchCard from "@/components/LiveMatchCard";
import TrendingBugs from "@/components/TrendingBugs";
import MemeStats from "@/components/MemeStats";
import AIPredictions from "@/components/AIPredictions";
import TeamPreferencesModal from "@/components/TeamPreferencesModal";
import { useTeamPreferences, ALL_TEAMS } from "@/hooks/useTeamPreferences";

// Generate multiple matches
const generateMatches = () => {
  const matches: { team1Id: string; team2Id: string; id: string }[] = [];
  const usedPairs = new Set<string>();

  for (let i = 0; i < 5; i++) {
    let team1 = ALL_TEAMS[Math.floor(Math.random() * ALL_TEAMS.length)];
    let team2 = ALL_TEAMS[Math.floor(Math.random() * ALL_TEAMS.length)];
    
    while (team1.id === team2.id || usedPairs.has(`${team1.id}-${team2.id}`)) {
      team1 = ALL_TEAMS[Math.floor(Math.random() * ALL_TEAMS.length)];
      team2 = ALL_TEAMS[Math.floor(Math.random() * ALL_TEAMS.length)];
    }
    
    usedPairs.add(`${team1.id}-${team2.id}`);
    usedPairs.add(`${team2.id}-${team1.id}`);
    
    matches.push({ team1Id: team1.id, team2Id: team2.id, id: `match-${i}` });
  }
  
  return matches;
};

const Index = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const { favoriteTeams, getFavoriteTeamObjects } = useTeamPreferences();
  const [matches] = useState(generateMatches);

  // Sort matches to prioritize favorite teams
  const sortedMatches = useMemo(() => {
    return [...matches].sort((a, b) => {
      const aHasFavorite = favoriteTeams.includes(a.team1Id) || favoriteTeams.includes(a.team2Id);
      const bHasFavorite = favoriteTeams.includes(b.team1Id) || favoriteTeams.includes(b.team2Id);
      
      if (aHasFavorite && !bHasFavorite) return -1;
      if (!aHasFavorite && bHasFavorite) return 1;
      return 0;
    });
  }, [matches, favoriteTeams]);

  const favoriteTeamObjects = getFavoriteTeamObjects();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Radio className="w-5 h-5 text-destructive animate-live-pulse" />
                <span className="text-destructive font-semibold text-sm uppercase tracking-wide">
                  Live Chaos Happening Now
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
                <span className="text-gradient-hero">India Wins Toss.</span>
                <br />
                <span className="text-foreground">Internet Loses Sanity.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                The only cricket coverage where the bugs are features, the stats are fake, 
                and everyone's a critic. Welcome to the chaos. 🐛
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/match">
                  <Button size="lg" className="bg-gradient-hero hover:opacity-90 font-display text-lg gap-2 h-14 px-8">
                    <Zap className="w-5 h-5" />
                    Watch Chaos Live
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="font-display text-lg gap-2 h-14 px-8 border-2 border-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setShowPreferences(true)}
                >
                  <Heart className="w-5 h-5" />
                  Pick Your Teams
                </Button>
              </div>

              {/* Favorite Teams Display */}
              {favoriteTeamObjects.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 mt-6 p-3 bg-muted rounded-xl"
                >
                  <span className="text-sm text-muted-foreground">Your teams:</span>
                  <div className="flex gap-2">
                    {favoriteTeamObjects.map((team) => (
                      <span key={team.id} className="text-2xl" title={team.name}>
                        {team.emoji}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowPreferences(true)}
                    className="ml-auto text-xs text-primary hover:underline"
                  >
                    Edit
                  </button>
                </motion.div>
              )}

              {/* Trust badges (parody) */}
              <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span>0 Stars (No One Rated Us)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐛</span>
                  <span>100% Bug-Powered</span>
                </div>
              </div>
            </motion.div>

            {/* Featured Match */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LiveMatchCard 
                team1Id={sortedMatches[0]?.team1Id}
                team2Id={sortedMatches[0]?.team2Id}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Matches Section */}
      {sortedMatches.length > 1 && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl text-primary flex items-center gap-2">
                <Radio className="w-6 h-6 text-destructive animate-live-pulse" />
                More Live Chaos
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowPreferences(true)} className="gap-2">
                <Settings className="w-4 h-4" />
                Team Preferences
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedMatches.slice(1, 4).map((match, index) => {
                const isFavorite = favoriteTeams.includes(match.team1Id) || favoriteTeams.includes(match.team2Id);
                return (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={isFavorite ? "ring-2 ring-primary rounded-xl" : ""}
                  >
                    {isFavorite && (
                      <div className="text-xs text-primary font-medium mb-1 flex items-center gap-1 px-1">
                        <Heart className="w-3 h-3" /> Your team is playing!
                      </div>
                    )}
                    <LiveMatchCard 
                      compact
                      team1Id={match.team1Id}
                      team2Id={match.team2Id}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Meme Stats */}
      <MemeStats />

      {/* Trending Bugs */}
      <TrendingBugs />

      {/* AI Predictions */}
      <AIPredictions />

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-secondary-foreground mb-4">
              Ready to Join the Chaos?
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Create an account and unlock premium features like "Yelling at Your Screen" 
              and "Blaming the Umpire" (both free, forever).
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-chaos-gold hover:bg-chaos-gold/90 text-secondary font-display text-lg h-14 px-10 gap-2">
                Sign Up for Free Chaos
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Team Preferences Modal */}
      <TeamPreferencesModal 
        isOpen={showPreferences} 
        onClose={() => setShowPreferences(false)} 
      />
    </div>
  );
};

export default Index;
