import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';


const Home = () => (
    <div className="backGround">
        <h1>MARS COLONY</h1>
        <Link to="/register">
            <div className="start_button" />
        </Link>
        <h2>Tap the Circle to ENTER!</h2>     
    </div>
);

export default Home;