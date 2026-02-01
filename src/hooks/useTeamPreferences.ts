import { useState, useEffect } from "react";

export interface Team {
  id: string;
  name: string;
  short: string;
  emoji: string;
}

export const ALL_TEAMS: Team[] = [
  { id: "india", name: "India", short: "IND", emoji: "🇮🇳" },
  { id: "australia", name: "Australia", short: "AUS", emoji: "🇦🇺" },
  { id: "england", name: "England", short: "ENG", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "pakistan", name: "Pakistan", short: "PAK", emoji: "🇵🇰" },
  { id: "new-zealand", name: "New Zealand", short: "NZ", emoji: "🇳🇿" },
  { id: "south-africa", name: "South Africa", short: "SA", emoji: "🇿🇦" },
  { id: "west-indies", name: "West Indies", short: "WI", emoji: "🌴" },
  { id: "sri-lanka", name: "Sri Lanka", short: "SL", emoji: "🇱🇰" },
  { id: "bangladesh", name: "Bangladesh", short: "BAN", emoji: "🇧🇩" },
  { id: "afghanistan", name: "Afghanistan", short: "AFG", emoji: "🇦🇫" },
];

const STORAGE_KEY = "cricbugs-favorite-teams";

export const useTeamPreferences = () => {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavoriteTeams(JSON.parse(stored));
      } catch {
        setFavoriteTeams([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleTeam = (teamId: string) => {
    setFavoriteTeams((prev) => {
      const updated = prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isTeamFavorite = (teamId: string) => favoriteTeams.includes(teamId);

  const getFavoriteTeamObjects = () => 
    ALL_TEAMS.filter((team) => favoriteTeams.includes(team.id));

  return {
    favoriteTeams,
    toggleTeam,
    isTeamFavorite,
    getFavoriteTeamObjects,
    allTeams: ALL_TEAMS,
    isLoaded,
  };
};
