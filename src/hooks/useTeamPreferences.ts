import { useEffect, useState } from "react";

export const ALL_TEAMS = [
  { id: "IND", name: "India", emoji: "🇮🇳" },
  { id: "AUS", name: "Australia", emoji: "🇦🇺" },
  { id: "ENG", name: "England", emoji: "🏴" },
  { id: "NZ", name: "New Zealand", emoji: "🇳🇿" },
  { id: "SA", name: "South Africa", emoji: "🇿🇦" },
];

const STORAGE_KEY = "cricbugs_favorite_teams";

export const useTeamPreferences = () => {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFavoriteTeams(JSON.parse(saved));
  }, []);

  const toggleTeam = (teamId: string) => {
    setFavoriteTeams(prev => {
      const updated = prev.includes(teamId)
        ? prev.filter(t => t !== teamId)
        : [...prev, teamId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    favoriteTeams,
    toggleTeam,
    allTeams: ALL_TEAMS,
  };
};
