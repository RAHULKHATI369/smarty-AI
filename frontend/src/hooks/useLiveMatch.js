import { useState, useEffect } from 'react';

// Simulated IPL match data
const IPL_MATCHES = [
  {
    team1: "CSK",
    team2: "RCB",
    stadium: "M. A. Chidambaram Stadium, Chennai",
    battingTeam: "RCB",
    bowlingTeam: "CSK",
    batter: "Virat Kohli",
    bowler: "Matheesha Pathirana"
  },
  {
    team1: "MI",
    team2: "GT",
    stadium: "Wankhede Stadium, Mumbai",
    battingTeam: "MI",
    bowlingTeam: "GT",
    batter: "Rohit Sharma",
    bowler: "Rashid Khan"
  },
  {
    team1: "RR",
    team2: "DC",
    stadium: "Sawai Mansingh Stadium, Jaipur",
    battingTeam: "RR",
    bowlingTeam: "DC",
    batter: "Sanju Samson",
    bowler: "Kuldeep Yadav"
  },
  {
    team1: "LSG",
    team2: "PBKS",
    stadium: "Ekana Cricket Stadium, Lucknow",
    battingTeam: "LSG",
    bowlingTeam: "PBKS",
    batter: "KL Rahul",
    bowler: "Kagiso Rabada"
  }
];

export function useLiveMatch() {
  const [matchContext, setMatchContext] = useState(null);

  useEffect(() => {
    // Pick a random match to simulate "today's live match"
    const randomMatch = IPL_MATCHES[Math.floor(Math.random() * IPL_MATCHES.length)];
    setMatchContext(randomMatch);

    // Optional: Simulate bowler/batter changing every minute
    const interval = setInterval(() => {
        // You could rotate players here to make it hyper-realistic
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return matchContext;
}
