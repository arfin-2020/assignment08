import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TeamDetails.css';
const TeamDetails = () => {
    const {idTeam} = useParams()
    // console.log({idTeam});
    const [teamDetails, setTeamDetails] = useState([]);

    useEffect(()=>{
            fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`)
            .then(res=>res.json())
            .then(data=>setTeamDetails(data.teams[0]))
    },[idTeam]);
    
    return (
        <div className='main-container'>
            
            {
                console.log(teamDetails)
            }
            <img className='img-fluid' src={teamDetails.strTeamBanner} alt='' />

            <div className='information-div row p-5 m-5'>
            <div className = 'col-md-6 text-start'>
            <h1>{teamDetails.strTeam}</h1>
                
                <p>Country: {teamDetails.strCountry}</p>
                <p>Sports type: {teamDetails.strSport}</p>
                <p>League: {teamDetails.strLeague}</p>
            </div>
            <div className = 'col-md-6 mb-5'>
                
                    {teamDetails.strGender==='Male' ? <img className='img-fluid' src='https://i.ibb.co/Rjp4L4F/male-744fb8fa.png' height='250px'  alt=''/>  : <img className='img-fluid' src='https://th.bing.com/th/id/OIP._imLWLlg2glgq1jOaaVm5QHaEL?pid=ImgDet&rs=1' height='250px'  alt=''/>}
                
               
            </div>
            </div>
        </div>
    );
};

export default TeamDetails;