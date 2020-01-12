import React from 'react'
import CardList from '../components/cards/CardList';
import back from './Home.js'
const Home = () => {
    return (
        <div className="page" style={{ textAlign: "center", background: ({back}) }}>
            <p className="page-title"></p>
            <p style={{ fontSize: 28}}>
               
            </p>
             <CardList />
            <div style={{ marginBottom: 20 }} />
        </div>
    );
};

export default Home;