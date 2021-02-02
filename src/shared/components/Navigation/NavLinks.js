import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.scss';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
     
          <li class="navButoon">
            <i class="fas fa-search"></i>
          <NavLink to="/Search">SEARCH</NavLink>
          
        </li>
    
      {auth.isLoggedIn && (
         <li class="navButoon">
            <i class="fas fa-list"></i>
          <NavLink to="/Mylist">MY LIST</NavLink>
         
        </li>
      )}
    <li class="navButoon">
              <i class="fas fa-hotel"></i>
          <NavLink to="/Tours">TOURS</NavLink>
      
        </li>
   
       
     
         <li class="navButoon">
             <i class="fas fa-plane-departure"></i>
          <NavLink to="/Flights">FLIGHTS</NavLink>
        
        </li>
     
     {/*  {auth.job && (
        <li class="navButoon">
          <NavLink to="/flight/new">ADD FLIGHT</NavLink>
        </li>
      )} */}
      {!auth.isLoggedIn && (
          <li class="navButoon">
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      
      {auth.isLoggedIn && (
         <li class="navButoon">
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
