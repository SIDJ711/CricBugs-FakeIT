import { motion } from "framer-motion";
import { BarChart3, Target, Zap, ThumbsDown } from "lucide-react";

const stats = [
  {
    icon: BarChart3,
    value: "96%",
    label: "Chance of Twitter Fight",
    color: "text-destructive",
  },
  {
    icon: Target,
    value: "23%",
    label: "DRS Accuracy Today",
    color: "text-accent",
  },
  {
    icon: Zap,
    value: "∞",
    label: "Hot Takes Generated",
    color: "text-primary",
  },
  {
    icon: ThumbsDown,
    value: "17",
    label: "Dropped Catches (So Far)",
    color: "text-secondary",
  },
];

const MemeStats = () => {
  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl text-center text-primary mb-2">
          Today's Bug Report 🐛
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Real-time* stats that definitely matter
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-2xl p-6 text-center shadow-card"
            >
              <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                className={`font-display text-4xl ${stat.color}`}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          *"Real-time" means we made it up. Refreshes based on vibes.
        </p>
      </div>
    </section>
  );
};

export default MemeStats;
