import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';



import UserList from './flights/pages/UserList';
import BestFlight from './flights/pages/BestFlight ';
import HomePage from './flights/pages/HomePage';

import BestTours from './tours/pages/BestTours';
import Updateflight from './flights/pages/Updateflight';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import Search from './flights/pages/SearchFlight';
import { useAuth } from './shared/hooks/auth-hook';
const App = () => {
  const { token, login, logout, userId ,role} = useAuth();
 
  let routes;
console.log(userId);

  if (token) {
   //debugger
    routes = (
      <Switch>
        <Route path="/" exact>
        <HomePage />
        </Route>
        <Route path="/Search" exact>
        <Search />
        </Route>
        
        <Route path="/Mylist" exact>
          <UserList />
        </Route>
        <Route path="/Tours" exact>
        <BestTours />
        </Route>
        <Route path="/Flights">
        <BestFlight />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
       
        <Route path="/Search" exact>
        <Search />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/Tours" exact>
        <BestTours />
        </Route>
        <Route path="/Flights">
        <BestFlight />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        job:  !!(role==='admin'),
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        role:role
      }}
    >
      <Router>
        <MainNavigation />
        <main className='app' >{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;