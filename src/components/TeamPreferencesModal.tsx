import { motion, AnimatePresence } from "framer-motion";
import { useTeamPreferences } from "@/hooks/useTeamPreferences";
import { Button } from "@/components/ui/button";

const TeamPreferencesModal = ({ isOpen, onClose }) => {
  const { favoriteTeams, toggleTeam, allTeams } = useTeamPreferences();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card rounded-2xl p-6 w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="font-display text-2xl mb-4">
              Choose Your Chaos Teams 🐛
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {allTeams.map(team => (
                <button
                  key={team.id}
                  onClick={() => toggleTeam(team.id)}
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    favoriteTeams.includes(team.id)
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }`}
                >
                  <span className="text-2xl">{team.emoji}</span>
                  <span className="font-medium">{team.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={onClose}>Done</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamPreferencesModal;
