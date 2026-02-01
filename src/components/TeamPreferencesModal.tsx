import { motion } from "framer-motion";
import { X, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeamPreferences, ALL_TEAMS } from "@/hooks/useTeamPreferences";

interface TeamPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamPreferencesModal = ({ isOpen, onClose }: TeamPreferencesModalProps) => {
  const { favoriteTeams, toggleTeam, isTeamFavorite } = useTeamPreferences();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl shadow-hover border border-border w-full max-w-lg max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-hero p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Pick Your Teams
              </h2>
              <p className="text-sm opacity-80 mt-1">
                Chaos hits harder when it's your team 🏏
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-2 gap-3">
            {ALL_TEAMS.map((team) => {
              const isFavorite = isTeamFavorite(team.id);
              return (
                <motion.button
                  key={team.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleTeam(team.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                    isFavorite
                      ? "bg-primary/10 border-primary"
                      : "bg-muted border-transparent hover:border-border"
                  }`}
                >
                  <span className="text-3xl">{team.emoji}</span>
                  <div className="flex-1">
                    <p className="font-display text-lg">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.short}</p>
                  </div>
                  {isFavorite && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {favoriteTeams.length} team{favoriteTeams.length !== 1 ? "s" : ""} selected
            </p>
            <Button onClick={onClose} className="bg-gradient-hero hover:opacity-90">
              Save Preferences
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamPreferencesModal;
