import { motion } from "framer-motion";
import { Cloud, Wifi, WifiOff, CloudRain } from "lucide-react";

const predictions = [
  { label: "Chance of Rain", value: 12, icon: CloudRain },
  { label: "Fans Fighting on Twitter", value: 96, icon: Wifi },
  { label: "Commentator Falling Asleep", value: 67, icon: WifiOff },
  { label: "Someone Blaming the Pitch", value: 100, icon: Cloud },
];

const AIPredictions = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-primary mb-2">
            AI-Powered* Predictions 🤖
          </h2>
          <p className="text-muted-foreground">
            Our advanced algorithm (random number generator) says...
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {predictions.map((pred, index) => (
            <motion.div
              key={pred.label}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-card rounded-xl p-4 shadow-card"
            >
              <div className="flex items-center gap-4 mb-2">
                <pred.icon className="w-6 h-6 text-primary" />
                <span className="font-medium flex-1">{pred.label}</span>
                <span className="font-display text-xl text-primary">{pred.value}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pred.value}%` }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    pred.value > 80 ? "bg-destructive" : pred.value > 50 ? "bg-primary" : "bg-success"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          *AI = Actually Imaginary
        </p>
      </div>
    </section>
  );
};

export default AIPredictions;
