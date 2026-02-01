import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import TeamTakesFilter, { type TakeFilter } from "./TeamTakesFilter";

interface Take {
  id: number;
  text: string;
  team: "team1" | "team2" | "neutral";
  emoji: string;
  author: string;
  time: string;
}

interface TeamTakesProps {
  team1Name: string;
  team1Emoji: string;
  team2Name: string;
  team2Emoji: string;
}

// Pre-generated takes for each team type
const generateTakes = (team1Name: string, team2Name: string): Take[] => {
  const team1Takes = [
    { text: `${team1Name} captain has lost the plot completely! 😤`, emoji: "😡" },
    { text: `This is PEAK ${team1Name} cricket. Chaotic but entertaining!`, emoji: "🔥" },
    { text: `Why is ${team1Name} playing like it's a practice match?`, emoji: "🤦" },
    { text: `${team1Name} fans need blood pressure meds after this`, emoji: "💊" },
    { text: `Captaincy disaster from ${team1Name}! What are we doing?`, emoji: "😡" },
    { text: `This is why we can't have nice things. Classic ${team1Name}.`, emoji: "😭" },
    { text: `${team1Name} either dominates or disasters. No in-between.`, emoji: "🎭" },
    { text: `Did the ${team1Name} coach fall asleep? WAKE UP!`, emoji: "😴" },
  ];

  const team2Takes = [
    { text: `${team2Name} showing mentality monsters energy 💪`, emoji: "💪" },
    { text: `This is exactly why ${team2Name} wins the big moments!`, emoji: "🏆" },
    { text: `${team2Name} fans eating good today`, emoji: "🍿" },
    { text: `Absolute class from ${team2Name}. That's how it's done!`, emoji: "👏" },
    { text: `${team2Name} came to play. This is serious cricket.`, emoji: "🎯" },
    { text: `The ${team2Name} strategy is working perfectly`, emoji: "🧠" },
    { text: `${team2Name} making it look easy. Too easy.`, emoji: "😎" },
    { text: `Why can't we play like ${team2Name}? Taking notes!`, emoji: "📝" },
  ];

  const neutralTakes = [
    { text: "DRS stands for 'Definitely Random System' 😂", emoji: "🔄" },
    { text: "This pitch has more demons than a horror movie", emoji: "👻" },
    { text: "Third umpire powered by a potato running Windows 95", emoji: "🥔" },
    { text: "The only thing consistent here is the inconsistency", emoji: "📊" },
    { text: "Both teams competing for who can mess up more", emoji: "🤝" },
    { text: "This is not cricket, this is chaos theory in action", emoji: "🌀" },
    { text: "Rain would be a mercy right now tbh", emoji: "🌧️" },
    { text: "My fantasy team is crying. I'm crying. We're all crying.", emoji: "💔" },
    { text: "Commentators have run out of things to say", emoji: "🎙️" },
    { text: "This match is sponsored by cardiac specialists", emoji: "❤️" },
  ];

  const allTakes: Take[] = [];
  let id = 0;

  // Add team1 takes
  team1Takes.forEach((take) => {
    allTakes.push({
      id: id++,
      text: take.text,
      team: "team1",
      emoji: take.emoji,
      author: `${team1Name}Fan${Math.floor(Math.random() * 1000)}`,
      time: `${Math.floor(Math.random() * 30) + 1}s ago`,
    });
  });

  // Add team2 takes
  team2Takes.forEach((take) => {
    allTakes.push({
      id: id++,
      text: take.text,
      team: "team2",
      emoji: take.emoji,
      author: `${team2Name}Supporter${Math.floor(Math.random() * 1000)}`,
      time: `${Math.floor(Math.random() * 60) + 1}s ago`,
    });
  });

  // Add neutral takes
  neutralTakes.forEach((take) => {
    allTakes.push({
      id: id++,
      text: take.text,
      team: "neutral",
      emoji: take.emoji,
      author: `CricketEnjoyer${Math.floor(Math.random() * 10000)}`,
      time: `${Math.floor(Math.random() * 120) + 1}s ago`,
    });
  });

  // Shuffle the takes
  return allTakes.sort(() => Math.random() - 0.5);
};

const TeamTakes = ({ team1Name, team1Emoji, team2Name, team2Emoji }: TeamTakesProps) => {
  const [activeFilter, setActiveFilter] = useState<TakeFilter>("all");
  const [takes, setTakes] = useState<Take[]>([]);

  // Generate takes once on mount
  useEffect(() => {
    setTakes(generateTakes(team1Name, team2Name));
  }, [team1Name, team2Name]);

  // Filter takes based on active filter (visibility only, no regeneration)
  const filteredTakes = useMemo(() => {
    if (activeFilter === "all") return takes;
    return takes.filter((take) => take.team === activeFilter);
  }, [takes, activeFilter]);

  const getTeamBadge = (team: Take["team"]) => {
    switch (team) {
      case "team1":
        return { label: team1Name, emoji: team1Emoji, color: "bg-primary/20 text-primary" };
      case "team2":
        return { label: team2Name, emoji: team2Emoji, color: "bg-accent/20 text-accent-foreground" };
      case "neutral":
        return { label: "Neutral", emoji: "🌶️", color: "bg-muted text-muted-foreground" };
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
      <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-primary" />
        Fan Takes
        <span className="text-xs font-normal text-muted-foreground ml-auto">
          (100% Unhinged)
        </span>
      </h3>

      <TeamTakesFilter
        team1Name={team1Name}
        team1Emoji={team1Emoji}
        team2Name={team2Name}
        team2Emoji={team2Emoji}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filteredTakes.map((take) => {
            const badge = getTeamBadge(take.team);
            return (
              <motion.div
                key={take.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="p-4 bg-muted rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{take.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
                        {badge.emoji} {badge.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        @{take.author} · {take.time}
                      </span>
                    </div>
                    <p className="text-sm">{take.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredTakes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <span className="text-4xl block mb-2">🦗</span>
            <p>No takes here. Too quiet. Suspicious.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamTakes;
