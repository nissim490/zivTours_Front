import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './flightItem.scss';
import axios from 'axios'

const FlightItem = props => {
  //console.log(props)
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [data2, setData] = useState(false);
  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
 
  const addToListUserHandler = async() => {
    setShowAddModal(true);
   
    //console.log(props.id);
    ///HTTP REQUEST
    const  responseData= await  axios({
      method: 'get',
      url:   ` ${process.env.REACT_APP_BACKEND_URL}flights/${props.id}`,
      
    }) .catch(function (error1) {
      
      if (error1.response) {
        if(error1.message==='Request failed with status code 401')
        error1.message='invaild email or password'
        console.log(error1.response.data.error.code);
        if(error1.response.data.error.code===11000){
          error1.message='The email is in use'}
        throw error1;
        
      }
    });
       //console.log(responseData.data.data.data.user.map(user => user._id ));
       
     
        let userArr =responseData.data.data.data.user.map(user => user._id )
        setData(userArr)
        
        userArr.push(auth.userId);
        console.log(userArr);
        userArr= new Set(userArr);
        userArr= Array.from(userArr);
        
        console.log("userArr");
  ///HTTP REQUEST
      const  responseData1= await  axios({
        method: 'PATCH',
        url:   ` ${process.env.REACT_APP_BACKEND_URL}flights/${props.id}`,
        data: {
          user:userArr
        },
         headers: {
          "Access-Control-Allow-Origin" : "*",
          "Content-type": "Application/json",
          "Authorization": `Bearer ${auth.token}`
          }   
      
      }) .catch(function (error1) {
        if (error1.response) {
          console.log(error1.response);
        }
          
        
      });
      
     /*  window. location. reload() */
    }
    const okHandler = () => {
      setShowAddModal(false);
      props.getData("date");
    };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler =  async() => {
    setShowConfirmModal(false);

   
        

    const  responseData= await  axios({
      method: 'get',
      url:   ` ${process.env.REACT_APP_BACKEND_URL}flights/${props.id}`,
      
    }) .catch(function (error1) {
      
      if (error1.response) {
        if(error1.message==='Request failed with status code 401')
        error1.message='invaild email or password'
        console.log(error1.response.data.error.code);
        if(error1.response.data.error.code===11000){
          error1.message='The email is in use'}
        throw error1;
        
      }
    });
        let userArr =responseData.data.data.data.user.map(user => user._id )
        setData(userArr)
    const index = userArr.indexOf(auth.userId);
if (index > -1) {
  userArr.splice(index, 1);
}

    const  responseData2= await  axios({
      method: 'PATCH',
      url:   ` ${process.env.REACT_APP_BACKEND_URL}flights/${props.id}`,
      data: {
        user:userArr
      },
       headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": `Bearer ${auth.token}`
        }   
    
    }) .catch(function (error1) {
      if (error1.response) {
        console.log(error1.response);
      }
    });
    props.getData("date");
   /*  window. location. reload() */

 


  };
/////Change the format of time
 let depart_date= props.depart_date
 depart_date.replaceAll('.','-')
 var datePart =  depart_date.match(/\d+/g),
 year = datePart[0], // get only two digits
 month = datePart[1], day = datePart[2];
 depart_date= day+'-'+month+'-'+year;
/////Change the format of time
 let return_date=props.return_date
 return_date.replaceAll('.','-')
 var datePart =  return_date.match(/\d+/g),
 year = datePart[0], // get only two digits
 month = datePart[1], day = datePart[2];
 return_date= day+'-'+month+'-'+year;

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="flight-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}> DELETE </Button>
          </React.Fragment>}
      >
        <p>
         <b>  Do you want to proceed and delete this flight? </b> 
         <b> Please note that it can't be undone there after. </b>
      
        </p>
      </Modal>
      <Modal
        show={showAddModal}
        onCancel={okHandler}
        header={props.city}
        footerClass="flight-item__modal-actions"
        footer={
          <React.Fragment>
            
            <Button danger onClick={okHandler}> OK </Button>
          </React.Fragment>}
      >
        <p>
         <b>  The flight add to your list </b> 
        
      
        </p>
      </Modal>
    
      <li className="flight-item">
      <div class="cardHome">
                           <div class="cardHome__side cardHome__side--front">
                                <div class="cardHome__picture cardHome__picture--4">
                                &nbsp;
                                </div>
                                <h4 class="cardHome__heading">
                                    <span class="cardHome__heading-span cardHome__heading-span--1">{props.city}</span>
                                </h4>
                                <div class="cardHome__details">
                                <div className="flight-item__actions">
          <div className="mycontent1">
              <h2 className="pp3">{props.web} </h2>
              <i class="fas fa-plane-departure  pp3"></i>
              <h3 className="pp3" >Departure: {depart_date} </h3>
             
             <h3 className="pp3" > {props.departure_airport}  ({props.departure_code})</h3>
           
         </div>
          </div>
          <div className="flight-item__actions">
          <div className="mycontent1">
            <i class="fas fa-plane-arrival  pp3"></i>
            <h3 className="pp3" >Return: {return_date} </h3>
           
            <h3 className="pp3">{props.destination_country} ({props.destination_country_code})</h3>
            <h3 className="pp3"> ({props.city})  {props.destination_airport} </h3>
            </div>
         </div>
         <h3 className="pp1"><i class="fas fa-money-bill-wave"></i>  &nbsp;{Math.round(props.price) } &nbsp;ILS  </h3>
         
          <div className="flight-item__actions">
         
          <div className="mycontent1">
          
       
           {/*    {auth.job && (<Button to={`/flight/${props.id}`}>EDIT</Button> )} */}
             <div className="my">
               
             </div>
            
        </div>  
                  
          </div>
                                </div>
                           </div>
                           <div class="cardHome__side cardHome__side--back cardHome__side--back-1">
                                <div class="cardHome__cta">
                                    <div class="cardHome__price-box">
                                        <p class="cardHome__price-only">Only</p>
                                        <p class="cardHome__price-value">{Math.round(props.price) }₪</p>
                                        {(true!=props.userId) && auth.isLoggedIn&& ( <Button onClick={addToListUserHandler} ><i class="fas fa-heart"></i></Button>  )}
                                        { (true===props.userId) && auth.isLoggedIn &&( <Button danger onClick={showDeleteWarningHandler}> DELETE</Button>)} 
                                    </div>
                            
                                </div>
                                </div>
                                </div>
                             

     
      

      </li>
    </React.Fragment>
  );
};

export default FlightItem;
