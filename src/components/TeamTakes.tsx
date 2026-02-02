import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Take {
  id: number;
  text: string;
  team: "TEAM1" | "TEAM2" | "NEUTRAL";
}

const generateTakes = (team1: string, team2: string): Take[] => [
  { id: 1, text: `${team1} choke incoming 😭`, team: "TEAM1" },
  { id: 2, text: `${team2} mentality monsters 🔥`, team: "TEAM2" },
  { id: 3, text: "Worst captaincy I’ve ever seen", team: "TEAM1" },
  { id: 4, text: "Pitch is rigged 🤡", team: "NEUTRAL" },
  { id: 5, text: "Script writers working overtime", team: "NEUTRAL" },
];

const TeamTakes = ({ team1Name, team2Name }) => {
  const [filter, setFilter] = useState<"ALL" | "TEAM1" | "TEAM2">("ALL");
  const takes = generateTakes(team1Name, team2Name);

  const visible = takes.filter(t =>
    filter === "ALL" ? true : t.team === filter
  );

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <h3 className="font-display text-xl mb-4">Fan Takes 🗣️</h3>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("ALL")}>All Chaos</button>
        <button onClick={() => setFilter("TEAM1")}>{team1Name}</button>
        <button onClick={() => setFilter("TEAM2")}>{team2Name}</button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {visible.map(take => (
            <motion.div
              key={take.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 rounded-lg bg-muted"
            >
              {take.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamTakes;
