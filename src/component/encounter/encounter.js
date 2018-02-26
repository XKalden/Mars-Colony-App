import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './encounter.css';


class Encounter extends Component {
    constructor(props){
        super(props);
        this.state={
            encounters: []
        }
    }

    componentDidMount(){
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
        .then(response =>{
            const encounters = response.data.encounters;
            this.setState({
                encounters
            });
        });
    }

    render(){
        console.log(this.state);
        return(
            <div className="view">
                <h1>Recent Encounters</h1>
                <p id="first_p">See An Alien? Report it!</p>
              
                    <ul>
                        {this.state.encounters.reverse().map(alain => {
                            return(<li key={alain.id}>
                                <p>{alain.date} - {alain.atype}</p> 
                                <p className="action">{alain.action}</p>
                            </li>)
        
                        })}
                    </ul>
        
            <Link to="/report">
                <h2>Report Encounter</h2>
            </Link>

            </div>
        );
    }
    
}


export default Encounter;
