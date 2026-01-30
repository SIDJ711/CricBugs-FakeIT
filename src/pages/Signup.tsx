import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Bug, Eye, EyeOff, Mail, Lock, User, ArrowRight, Zap, Shield, Brain, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const mentalToughnessLevels = [
  { min: 0, label: "Tailender Mentality", emoji: "😰", color: "bg-destructive" },
  { min: 20, label: "Nervous Nineties", emoji: "😬", color: "bg-orange-500" },
  { min: 40, label: "Getting There", emoji: "🤔", color: "bg-yellow-500" },
  { min: 60, label: "Match Temperament", emoji: "😎", color: "bg-success" },
  { min: 80, label: "GOAT Energy", emoji: "🐐", color: "bg-primary" },
];

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    return Math.min(100, score);
  }, [password]);

  const currentLevel = useMemo(() => {
    return [...mentalToughnessLevels].reverse().find((level) => passwordStrength >= level.min) || mentalToughnessLevels[0];
  }, [passwordStrength]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup (replace with actual auth later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (name && email && password) {
      toast({
        title: "Welcome to the Chaos! 🐛🎉",
        description: "Your account has been created. Prepare for glitches.",
      });
      navigate("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                repeatDelay: 3
              }}
              className="inline-block"
            >
              <Bug className="w-16 h-16 text-primary mx-auto mb-4" />
            </motion.div>
            <h1 className="font-display text-4xl text-primary mb-2">Join the Swarm!</h1>
            <p className="text-muted-foreground">
              Create your account and start trolling... responsibly.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Sachin 'I Was Robbed' Tendulkar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="virat@coverdrive.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="dontDropCatches"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Mental Toughness Meter */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Mental Toughness Meter™
                      </span>
                      <span className="text-sm flex items-center gap-1">
                        <span>{currentLevel.emoji}</span>
                        <span className="font-medium">{currentLevel.label}</span>
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        className={`h-full rounded-full ${currentLevel.color}`}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-hero hover:opacity-90 font-display text-lg gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Bug className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    Create My Bug Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-accent" />
                <span>Instant Hot Takes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>Secure Trolling</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="w-4 h-4 text-primary" />
                <span>AI Predictions*</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-destructive" />
                <span>Premium Chaos</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Already a Bug?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Log in here
              </Link>
            </p>
          </form>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            By signing up, you agree to our Terms of Chaos and promise to 
            blame the umpire for everything. 🦗
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
