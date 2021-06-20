import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Team = (props) => {
    const {strTeamBadge,strTeam,idTeam} =props.team;
    // console.log(props.team);
    const history = useHistory();

    const dynamicRouter = idTeam =>{
        const url = `team/${idTeam}`;
        history.push(url);
    }
    return (
      
                <div class="card col-lg-3 col-md-6 m-5 align-items-center p-3">
                    <img src={strTeamBadge} alt="" height='150px' width='150px'/>
                    <div class="card-body">
                    <h5 class="card-title">{strTeam}</h5>
                    <h5>Sports type: Football</h5>
                    </div>
                   <button onClick={()=>dynamicRouter(idTeam)} className="btn btn-primary">Explore <FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
        
        
    );
};

export default Team;