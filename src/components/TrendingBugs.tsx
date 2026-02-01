import { motion } from "framer-motion";
import { TrendingUp, MessageCircle, Clock } from "lucide-react";

interface TrendingBug {
  id: number;
  headline: string;
  category: string;
  reactions: string;
  time: string;
  emoji: string;
}

const trendingBugs: TrendingBug[] = [
  {
    id: 1,
    headline: "Captain drops catch, blames 'invisible mosquito'",
    category: "Fielding Fail",
    reactions: "47K",
    time: "2 min ago",
    emoji: "🦟",
  },
  {
    id: 2,
    headline: "DRS review takes so long, tea break extended",
    category: "Tech Chaos",
    reactions: "32K",
    time: "5 min ago",
    emoji: "☕",
  },
  {
    id: 3,
    headline: "Bowler's celebration lasts longer than his spell",
    category: "Drama",
    reactions: "28K",
    time: "12 min ago",
    emoji: "💃",
  },
  {
    id: 4,
    headline: "Third umpire seen Googling LBW rules",
    category: "Investigation",
    reactions: "89K",
    time: "18 min ago",
    emoji: "🔍",
  },
  {
    id: 5,
    headline: "Rain delay: Fans complete entire Netflix series",
    category: "Weather Bug",
    reactions: "56K",
    time: "23 min ago",
    emoji: "🌧️",
  },
  {
    id: 6,
    headline: "Batsman asks for guard, umpire gives life advice",
    category: "Wholesome",
    reactions: "41K",
    time: "31 min ago",
    emoji: "🧘",
  },
];

const TrendingBugs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h2 className="font-display text-4xl text-primary">Trending Bugs</h2>
          <span className="ml-auto text-sm text-muted-foreground">Updated every chaos</span>
        </div>

        <div className="grid gap-4">
          {trendingBugs.map((bug, index) => (
            <motion.article
              key={bug.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 10 }}
              className="bg-card rounded-xl p-4 shadow-card border border-border hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0 group-hover:animate-bounce-subtle">{bug.emoji}</span>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {bug.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {bug.time}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {bug.headline}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground text-sm flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                  <span>{bug.reactions}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full py-4 bg-secondary text-secondary-foreground rounded-xl font-display text-lg hover:bg-secondary/90 transition-colors"
        >
          Load More Chaos 🐛
        </motion.button>
      </div>
    </section>
  );
};

export default TrendingBugs;
