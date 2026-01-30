import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bug, Zap, Radio, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LiveMatchCard from "@/components/LiveMatchCard";
import TrendingBugs from "@/components/TrendingBugs";
import MemeStats from "@/components/MemeStats";
import AIPredictions from "@/components/AIPredictions";

const Index = () => {
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
                <Link to="/login">
                  <Button size="lg" variant="outline" className="font-display text-lg gap-2 h-14 px-8 border-2 border-primary hover:bg-primary hover:text-primary-foreground">
                    <Bug className="w-5 h-5" />
                    Login to Troll Responsibly
                  </Button>
                </Link>
              </div>

              {/* Trust badges (parody) */}
              <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
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

            {/* Live Match Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LiveMatchCard />
            </motion.div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Index;
