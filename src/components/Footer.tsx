import { Bug, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bug className="w-8 h-8 text-chaos-gold" />
              <span className="font-display text-2xl text-chaos-gold">CricBugs</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Because Cricket Has Glitches Too 🐛
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-secondary-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-secondary-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-secondary-foreground/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4 text-chaos-gold">Quick Bugs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-chaos-gold transition-colors">Home</Link></li>
              <li><Link to="/match" className="hover:text-chaos-gold transition-colors">Live Chaos</Link></li>
              <li><Link to="/players" className="hover:text-chaos-gold transition-colors">Bug Stars</Link></li>
              <li><Link to="/dashboard" className="hover:text-chaos-gold transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-display text-lg mb-4 text-chaos-gold">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-chaos-gold transition-colors cursor-pointer">Fake Live Scores</li>
              <li className="hover:text-chaos-gold transition-colors cursor-pointer">AI Predictions*</li>
              <li className="hover:text-chaos-gold transition-colors cursor-pointer">Hot Takes Generator</li>
              <li className="hover:text-chaos-gold transition-colors cursor-pointer">Meme Stats</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg mb-4 text-chaos-gold">Legal Stuff</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-chaos-gold transition-colors cursor-pointer">Privacy (We Forget)</li>
              <li className="hover:text-chaos-gold transition-colors cursor-pointer">Terms of Chaos</li>
              <li className="hover:text-chaos-gold transition-colors cursor-pointer">Cookie Policy 🍪</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <p className="text-xs text-center text-secondary-foreground/60 max-w-3xl mx-auto">
            <strong>⚠️ DISCLAIMER:</strong> CricBugs is a parody website created for educational and competition purposes. 
            Not affiliated with Cricbuzz, BCCI, ICC, or any official cricket body. All matches, players, and statistics are 
            entirely fictional and generated for satirical entertainment. Any resemblance to actual events is purely coincidental 
            (and hilarious).
          </p>
          <p className="text-xs text-center text-secondary-foreground/40 mt-4">
            © 2024 CricBugs. Made with 🐛 and chaos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
