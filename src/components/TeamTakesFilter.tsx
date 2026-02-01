import { motion } from "framer-motion";

export type TakeFilter = "all" | "team1" | "team2" | "neutral";

interface TeamTakesFilterProps {
  team1Name: string;
  team1Emoji: string;
  team2Name: string;
  team2Emoji: string;
  activeFilter: TakeFilter;
  onFilterChange: (filter: TakeFilter) => void;
}

const TeamTakesFilter = ({
  team1Name,
  team1Emoji,
  team2Name,
  team2Emoji,
  activeFilter,
  onFilterChange,
}: TeamTakesFilterProps) => {
  const filters: { id: TakeFilter; label: string; emoji?: string }[] = [
    { id: "all", label: "All Chaos", emoji: "🔥" },
    { id: "team1", label: `${team1Name} Takes`, emoji: team1Emoji },
    { id: "team2", label: `${team2Name} Takes`, emoji: team2Emoji },
    { id: "neutral", label: "Neutral / Hot Takes", emoji: "🌶️" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            activeFilter === filter.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          <span>{filter.emoji}</span>
          <span>{filter.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default TeamTakesFilter;
