// Cricket Engine - Proper ball-by-ball simulation with real cricket rules

export interface BallResult {
  runs: number;
  isWicket: boolean;
  isWide: boolean;
  isNoBall: boolean;
  isBoundary: boolean;
  isSix: boolean;
  description: string;
}

export interface Score {
  runs: number;
  wickets: number;
  balls: number; // Total legal balls bowled (0-300 for 50 overs)
}

export interface MatchState {
  team1: Score;
  team2: Score;
  currentInnings: 1 | 2;
  isMatchComplete: boolean;
  target: number | null;
}

// Convert total balls to overs display string (e.g., 154 balls = "25.4")
export const ballsToOversDisplay = (balls: number): string => {
  const completedOvers = Math.floor(balls / 6);
  const ballsInOver = balls % 6;
  return `${completedOvers}.${ballsInOver}`;
};

// Get current ball number in the over (1-6)
export const getCurrentBallInOver = (balls: number): number => {
  const ballInOver = balls % 6;
  return ballInOver === 0 ? 6 : ballInOver;
};

// Check if an over is complete
export const isOverComplete = (balls: number): boolean => {
  return balls > 0 && balls % 6 === 0;
};

// Generate a random ball result with realistic probabilities
export const simulateBall = (currentWickets: number): BallResult => {
  const random = Math.random();
  
  // Probability distribution for ball outcomes
  // Wicket: ~3% chance (lower if fewer wickets left)
  // Six: ~5% chance
  // Four: ~12% chance
  // Three: ~5% chance
  // Two: ~15% chance
  // One: ~25% chance
  // Dot: ~30% chance
  // Wide/No-ball: ~5% chance

  let runs = 0;
  let isWicket = false;
  let isWide = false;
  let isNoBall = false;
  let isBoundary = false;
  let isSix = false;
  let description = "";

  // Wicket probability decreases as more wickets fall (protect tail)
  const wicketProb = currentWickets >= 8 ? 0.08 : currentWickets >= 5 ? 0.05 : 0.03;

  if (random < wicketProb && currentWickets < 10) {
    isWicket = true;
    runs = 0;
    const dismissals = [
      "BOWLED! The stumps are shattered!",
      "CAUGHT! Straight to the fielder!",
      "LBW! Plumb in front!",
      "CAUGHT BEHIND! Edge and gone!",
      "RUN OUT! Terrible mix-up!",
      "STUMPED! Dancing down the track!",
    ];
    description = dismissals[Math.floor(Math.random() * dismissals.length)];
  } else if (random < wicketProb + 0.05) {
    // Six
    runs = 6;
    isSix = true;
    isBoundary = true;
    const sixDescriptions = [
      "SIX! That's massive! Into the crowd!",
      "HUGE SIX! The ball has left the stadium!",
      "SIX! Effortless power! Maximum!",
      "SIX! That's gone all the way!",
    ];
    description = sixDescriptions[Math.floor(Math.random() * sixDescriptions.length)];
  } else if (random < wicketProb + 0.17) {
    // Four
    runs = 4;
    isBoundary = true;
    const fourDescriptions = [
      "FOUR! Racing away to the boundary!",
      "FOUR! Perfect timing through the covers!",
      "FOUR! Slashed over the slips!",
      "FOUR! That's a beautiful shot!",
    ];
    description = fourDescriptions[Math.floor(Math.random() * fourDescriptions.length)];
  } else if (random < wicketProb + 0.22) {
    // Three
    runs = 3;
    description = "Three runs! Great running between the wickets!";
  } else if (random < wicketProb + 0.37) {
    // Two
    runs = 2;
    const twoDescriptions = [
      "Two runs taken. Good placement.",
      "Couple of runs there. Smart cricket.",
      "Two more added. Quick running!",
    ];
    description = twoDescriptions[Math.floor(Math.random() * twoDescriptions.length)];
  } else if (random < wicketProb + 0.62) {
    // One
    runs = 1;
    const oneDescriptions = [
      "Single taken. Rotating the strike.",
      "One run. Keeps the scoreboard ticking.",
      "Quick single there. Good awareness.",
    ];
    description = oneDescriptions[Math.floor(Math.random() * oneDescriptions.length)];
  } else if (random < wicketProb + 0.67) {
    // Wide or No-ball
    if (Math.random() > 0.5) {
      isWide = true;
      runs = 1;
      description = "WIDE! Extra run for the batting side!";
    } else {
      isNoBall = true;
      runs = 1;
      description = "NO BALL! Free hit coming up!";
    }
  } else {
    // Dot ball
    runs = 0;
    const dotDescriptions = [
      "Dot ball. Good line and length.",
      "No run. Defended solidly.",
      "Played and missed! Close one!",
      "Straight to the fielder. No run.",
      "Left alone outside off. Good judgment.",
    ];
    description = dotDescriptions[Math.floor(Math.random() * dotDescriptions.length)];
  }

  return { runs, isWicket, isWide, isNoBall, isBoundary, isSix, description };
};

// Check if innings is complete
export const isInningsComplete = (score: Score, maxOvers: number = 50): boolean => {
  return score.wickets >= 10 || score.balls >= maxOvers * 6;
};

// Check if match is complete
export const isMatchComplete = (
  team1Score: Score,
  team2Score: Score,
  currentInnings: 1 | 2,
  maxOvers: number = 50
): boolean => {
  if (currentInnings === 1) {
    return isInningsComplete(team1Score, maxOvers);
  }
  
  // Second innings - check if target achieved or innings complete
  return (
    team2Score.runs > team1Score.runs || // Target achieved
    isInningsComplete(team2Score, maxOvers)
  );
};

// Get match result string
export const getMatchResult = (
  team1Name: string,
  team2Name: string,
  team1Score: Score,
  team2Score: Score
): string => {
  if (team2Score.runs > team1Score.runs) {
    const wicketsRemaining = 10 - team2Score.wickets;
    return `${team2Name} wins by ${wicketsRemaining} wicket${wicketsRemaining !== 1 ? 's' : ''}!`;
  } else if (team1Score.runs > team2Score.runs) {
    const runDiff = team1Score.runs - team2Score.runs;
    return `${team1Name} wins by ${runDiff} run${runDiff !== 1 ? 's' : ''}!`;
  } else {
    return "Match tied! Absolute chaos!";
  }
};
