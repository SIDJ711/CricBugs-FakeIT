import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Bug, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const funnyErrors = [
  "Wrong password. Even umpire saw that. 🙈",
  "That's not right. Third umpire is reviewing... Nope, still wrong.",
  "Password rejected. Much like that LBW appeal.",
  "Error 404: Your credentials, not found.",
  "Invalid! Like that no-ball celebration.",
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login (replace with actual auth later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, accept any credentials
    if (email && password) {
      toast({
        title: "Welcome back, Bug! 🐛",
        description: "You're now logged in. Time to embrace the chaos.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Oops! 🦗",
        description: funnyErrors[Math.floor(Math.random() * funnyErrors.length)],
        variant: "destructive",
      });
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
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-block"
            >
              <Bug className="w-16 h-16 text-primary mx-auto mb-4" />
            </motion.div>
            <h1 className="font-display text-4xl text-primary mb-2">Welcome Back, Bug!</h1>
            <p className="text-muted-foreground">
              Log in to continue your journey of controlled chaos
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <div className="space-y-6">
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
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot Password? (Third Umpire is reviewing...)
                </a>
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
                    Enter the Chaos
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">or continue trolling with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" className="h-12">
                <span className="text-2xl mr-2">🏏</span>
                Cricket ID
              </Button>
              <Button type="button" variant="outline" className="h-12">
                <span className="text-2xl mr-2">🐛</span>
                Bug OAuth
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              New to the chaos?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
