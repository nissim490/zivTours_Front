
import axios from 'axios'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import FlightList from '../components/flightList';
import React, { useEffect, useState,useContext } from 'react';
import '../../shared/components/Navigation/MainNavigation.scss';
import '../../css/style.css'
import { AuthContext } from '../../shared/context/auth-context';
const BestFlight  = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {  error,  clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [mydata, setData] = useState(1);
  
  const auth = useContext(AuthContext);
  function getData(data){
    setData(mydata+1)
    
  }
    useEffect(() => {
      setIsLoading(true);
      const fetchUsers = async () => {
        try {

          

//&user[ne]=${auth.userId}

         
           ///HTTP REQUEST
           const  responseData= await  axios({
            method: "get",
            url:  `${process.env.REACT_APP_BACKEND_URL}flights?sort=price&price[lt]=300`,
            
            
          })
         
          setLoadedUsers(responseData.data.data.data);
          setIsLoading(false);
        } catch (err) {setIsLoading(false);}
      };
      fetchUsers();
    }, [mydata]);

  return (
<React.Fragment>
  <ErrorModal error={error} onClear={clearError} />

  <div className="tour-item__image2"><img src='https://images.unsplash.com/photo-1584910861392-c32a066041a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80' alt="title" /></div>
    
  <div class="header__text-box">
<h1 class="heading-primary">
                    <span class="heading-primary--main">ZIV TOURS</span>
                    <span class="headingSearch">FLIGHTS</span>
                </h1>
</div>
  <h1 className="main-navigation__title1" > FLIGHTS</h1>
  {isLoading && (<div className="center"><LoadingSpinner /></div> )}
  <h1 className="title" ></h1>
  {!isLoading && loadedUsers && <FlightList items={loadedUsers} getData={getData} />}
</React.Fragment>
  )
};
///'https://images.unsplash.com/photo-1581012771300-224937651c42?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzJ8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60'
export default BestFlight ;
