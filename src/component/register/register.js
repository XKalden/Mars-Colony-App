import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css'

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            age: '',
            jobs: [],
            job_id: '',
            inputName: true,
            inputAge: true,
            select: true    
          }
          this._updateStateJob = this._updateStateJob.bind(this);
          this._updateStateAge = this._updateStateAge.bind(this);
          this._updateStateName = this._updateStateName.bind(this);
          this._submitState = this._submitState.bind(this);
        }


    // function to Update STATE
    _updateStateName(event){
        this.setState({
            name: event.target.value,
            inputName: true
        });
    }

    
    _updateStateAge(event){
        this.setState({
            age: event.target.value,
            inputAge: true
        });
    }

    _updateStateJob(event){
        this.setState({
            job_id: event.target.value,
            select: true

        });
    }

    // functiont to submit State Data to Session.
    _submitState(event){
        if(!this._validate()){
            event.preventDefault();
        } else {
        axios.post('https://red-wdp-api.herokuapp.com/api/mars/colonists', {
            colonist: {
              name: this.state.name,
              age: this.state.age,
              job_id: this.state.job_id,
            }
          })
            .then(function (response) {
              var id = response.data.colonist.id;
              sessionStorage.setItem("job", JSON.stringify(id));
            })
            .catch(function (error) {
              console.log(error);
              console.error(error);
            });
        }
    }

    
    _validate(){
        let checkBool = true;
        if(this.state.name === ''){
            checkBool = false;
            this.setState({
                inputName: false
            })
        }
        if(this.state.age === ''){
            checkBool = false;
            this.setState({
                inputAge: false
            })
        
        }
        if(this.state.job_id <= 0){
            checkBool = false;
            this.setState({
                select: false
            })
        }
        return checkBool;
    }    

    
    componentDidMount(){
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/jobs')
            .then((response) => {
                const jobs = response.data.jobs;
                this.setState({
                    jobs
                });
            });
    };

    render(){
        console.log(this.state);
        return(
            <div className="register">
                <div className="center">
                <h1>Register</h1>
                <div className="wrapForm">
                    <form>
                        <label for="name">Name :</label>
                        <input type="text" name="name" 
                        className="colonistname" value={this.state.name} 
                        onChange={this._updateStateName} 
                        className={this.state.inputName.toString()}
                        />
                    </form>
                    <form>
                 
                        <label for="age">Age :</label>
                        <input type="number" id="age" value={this.state.age} 
                            onChange={this._updateStateAge} 
                            className={this.state.inputAge.toString()}/>
                    </form>
                    <form>
                        <label for="occupation">Occupation: </label>
                        <select className="colinstoccupation" onChange={this._updateStateJob}
                        className={this.state.select.toString()}
                        >
                        <option> -- Select Occupation -- </option>
                        {this.state.jobs.map(function (job) {
                            return <option value={job.id}>{job.name}</option>
                        })}
                        </select>
                    </form>
                </div>
                <Link to="/encounter" onClick={this._submitState}> 
                    <h2>Check here</h2>       
                </Link> 
                </div>  
            </div>
        )
    }
};

export default Register;