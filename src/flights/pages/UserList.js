
import React, { useEffect, useState,useContext } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import FlightList from '../components/flightList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import TourList from '../../tours/components/tourList';
import axios from 'axios'
import '../../shared/components/Navigation/MainNavigation.scss';

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);

 const {  error, clearError } = useHttpClient();
 const [loadedUsers, setLoadedUsers] = useState();
 const [loadedUsers1, setLoadedUsers1] = useState();
 const auth = useContext(AuthContext);
 const [mydata, setData] = useState(0);

 function getData(data){
  setData(mydata+1)
  
}
 
 useEffect(() => {
   const fetchUsers = async () => {
     try {
      setIsLoading(true);

     

          ///HTTP REQUEST
      const  responseData1= await  axios({
        method: "get",
        url: ` ${process.env.REACT_APP_BACKEND_URL}tours/?user=${auth.userId}`,
        
      })
  
      setLoadedUsers1(responseData1.data.data.data);
          ///HTTP REQUEST
       const  responseData= await  axios({
         method: "get",
         url: ` ${process.env.REACT_APP_BACKEND_URL}flights/?user=${auth.userId}`,
         
       })
 
       setLoadedUsers(responseData.data.data.data);
       setIsLoading(false);
     } catch (err) {    setIsLoading(false);}
   };
   fetchUsers();
 }, [auth.userId,mydata]);
 


      
  return (
  <React.Fragment>
   <ErrorModal error={error} onClear={clearError} />

   <div class="header__text-box">
                <h1 class="heading-primary">
                    <span class="heading-primary--main">ZIV TOURS</span>
                    <span class="headingSearch">list</span>
                </h1>

              
            </div>
   {isLoading && (<div className="center"><LoadingSpinner /> </div> )}
   <div className="tour-item__image"><img src='https://images.unsplash.com/photo-1597068504146-60241bb6afef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt="title" /></div>
   <h1 className="main-navigation__title2" > FLIGHTS</h1>
   <div>      { !isLoading && loadedUsers &&  <FlightList items={loadedUsers}  getData={getData} flag={true}/>}    </div>
   <h1 className="main-navigation__title2" > TOURS</h1>
   <div>       { !isLoading && loadedUsers1 &&  <TourList items={loadedUsers1}getData={getData} flag={true}/>}    </div>

  <hr></hr>
  
 
</React.Fragment>
  )
};

export default UserList;
