import React from 'react';
import { Router, Route } from "react-router-dom";
import history from "./history";
import UserProvider from "./contexts/UserProvider";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import MenuBar from "./components/menus/MenuBar";
import ItemList from './pages/ItemList';
import NavBar from './pages/NavBar';


//import Footer from "./components/footer/Footer";

const App = () => {
    return (
        <Router history={history}>
            <UserProvider>
                <Route path="/register" component={MenuBar} />
                <Route path="/restaurant" component={Restaurant} />
                <Route path="/" component={NavBar} />
                <Route path='/' exact component={ItemList}/>
                <Route path="/register" exact component={Home} />
            </UserProvider>
            
            
            
        </Router>
    );
};

export default App;
