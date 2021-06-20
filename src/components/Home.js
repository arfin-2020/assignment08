import React, { useEffect, useState } from 'react';
import Header from './Header';
import Team from './Team';

const Home = () => {
  const [teams, setTeams] = useState([]);

  useEffect(()=>{
    fetch('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League')
    .then(res=>res.json())
    .then(result=>setTeams(result.teams));
  },[])

  return (
    <div>
    <Header/>
      <div className = 'row d-flex justify-content-center'>
      {
        teams.map(team=><Team team={team} key={team.idTeam}/>)
      }
      </div>
    </div>
  );
};

export default Home;
