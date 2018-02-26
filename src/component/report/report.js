import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './report.css'; 

class Report extends Component {

    constructor(){
        super();
        this.state = {
            alienType:[],
            actionTaken: '',
            alienId: '',
            todayDate: '',
            colonist_id: sessionStorage.getItem('job')
        }
        this._updateAliens = this._updateAliens.bind(this);
        this._updateAction = this._updateAction.bind(this);
        this._SubmitAction = this._SubmitAction.bind(this);

    }

    // OnChange Update Alian 
    _updateAliens(event){
        // Change Date
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let today = `${year}-${month}-${day}`; 
        this.setState({
            alienId: event.target.value,
            todayDate: today
        });
    }

    _updateAction(event){
        this.setState({
            actionTaken: event.target.value
        });
    }

    _SubmitAction(event){
        axios.post('https://red-wdp-api.herokuapp.com/api/mars/encounters', {
            encounter: {
              atype: this.state.alienType[this.state.alienId - 1].type,
              date: this.state.todayDate,
              action: this.state.actionTaken,
              colonist_id: this.state.colonist_id,
            }
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
    }


    // Get Aliens && Pushes to State 
    componentDidMount(){
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/aliens')
        .then(response => {
              const alienType = response.data.aliens;
              this.setState({
                alienType
              })        
          })
          .catch(function (error) {
            console.log(error);
          });
    }



    render(){    
        console.log(this.state);
        return(
        <div className="report">
            <h1>Report Encounter</h1>
            <p id="first_report_p">Safety On Mars is Your Responsibility</p>
            <form>
            <select onChange={this._updateAliens}>
                <option> -- Select Alien Type -- </option>
                {this.state.alienType.map(alain => {
                    return <option value={alain.id}>{alain.type}</option>
                })}
            </select>
            <br />
            <textarea className="textBox" placeholder="Acton Taken" onChange={this._updateAction} />
            
            </form>
            
            <Link to="/encounter" onClick={this._SubmitAction}>
                <h2>Submit Report</h2>
            </Link>
        </div>
        );   
    }
}

export default Report;

