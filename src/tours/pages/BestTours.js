
import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios'
//import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TourList from '../components/tourList';
import '../../shared/components/Navigation/MainNavigation.scss';
import '../../css/style.css'
import { AuthContext } from '../../shared/context/auth-context';
const Besttour  = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {  error, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const auth = useContext(AuthContext);
  const [mydata, setData] = useState(1);
  function getData(data){
    setData(mydata+1)
  
  }
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setIsLoading(true);
          ///HTTP REQUEST
          const  responseData= await  axios({
            method: "get",
            url:  `${process.env.REACT_APP_BACKEND_URL}tours?`,
        //&user[ne]=${auth.userId}
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
  
      <div className="tour-item__image"><img src='https://images.unsplash.com/photo-1586611292717-f828b167408c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80' alt="title" /></div>
      <div class="header__text-box">
<h1 class="heading-primary">
                    <span class="heading-primary--main">ZIV TOURS</span>
                    <span class="headingSearch">tours</span>
                </h1>
</div>
      <h1 className="main-navigation__title2" >TOURS</h1>
      <h1 className="title2" ></h1>
      {isLoading && (<div className="center"><LoadingSpinner /></div>)}
      { !isLoading && loadedUsers &&  <TourList items={loadedUsers} getData={getData}/>}
</React.Fragment>


  )
  
  
  
  
};

export default Besttour ;
