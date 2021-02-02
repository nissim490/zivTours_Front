import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import './tourItem.scss';
import axios from 'axios'


import  '../../shared/components/UIElements/Card.scss';
const TourItem = props => {
  //console.log(props)
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const okHandler = () => {
    setShowAddModal(false);
    props.getData("date");
  };
  const addToListUserHandler = async() => {

    //console.log(auth.userId);
   // console.log(props.id);
   setShowAddModal(true);

    ///HTTP REQUEST
    const  responseData= await  axios({
      method: 'get',
      url:   ` ${process.env.REACT_APP_BACKEND_URL}tours/${props.id}`,
      
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
      // console.log(responseData.data.data.data.user.map(user => user._id ));
        let userArr =responseData.data.data.data.user.map(user => user._id )
        userArr.push(auth.userId);
        //console.log(g);
        userArr= new Set(userArr);
        userArr= Array.from(userArr);
        //console.log(g);
      ///HTTP REQUEST
      const  responseData1= await  axios({
        method: 'PATCH',
        url:   ` ${process.env.REACT_APP_BACKEND_URL}tours/${props.id}`,
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
          if(error1.message==='Request failed with status code 401')
          error1.message='invaild email or password'
          //console.log(error1.response.data.error.code);
          if(error1.response.data.error.code===11000){
            error1.message='The email is in use'}
          throw error1;
          
        }
      });

    
/* window. location. reload() */
    }
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
    
  };
 //Change the format of time
 
 let check_in=props.check_in
 check_in.replaceAll('.','-')
var datePart =  check_in.match(/\d+/g),
 year = datePart[0], // get only two digits
 month = datePart[1], day = datePart[2];
 check_in= day+'-'+month+'-'+year;
/////Change the format of time
 let check_out=props.check_out
 check_out.replaceAll('.','-')
   var datePart =  check_out.match(/\d+/g),
  year = datePart[0], // get only two digits
  month = datePart[1], day = datePart[2];
  check_out= day+'-'+month+'-'+year;
  
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async() => {
    setShowConfirmModal(false);
    const  responseData= await  axios({
      method: 'get',
      url:   ` ${process.env.REACT_APP_BACKEND_URL}tours/${props.id}`,
      
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
      
    const index = userArr.indexOf(auth.userId);
if (index > -1) {
  userArr.splice(index, 1);
}

    const  responseData2= await  axios({
      method: 'PATCH',
      url:   ` ${process.env.REACT_APP_BACKEND_URL}tours/${props.id}`,
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
    /* window. location. reload() */
  };
  return (
    <React.Fragment>
  
    <Modal
      show={showMap}
      onCancel={closeMapHandler}
      header={props.address}
      contentClass="place-item__modal-content"
      footerClass="place-item__modal-actions"
      footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
    >
      <div className="map-container">
        <Map  address={props.address}  center={props.coordinates} zoom={16} />
      </div>
    </Modal>
    <Modal
      show={showConfirmModal}
      onCancel={cancelDeleteHandler}
      header="Are you sure?"
      footerClass="place-item__modal-actions"
      footer={
        <React.Fragment>
          <Button inverse onClick={cancelDeleteHandler}>
            CANCEL
          </Button>
          <Button danger onClick={confirmDeleteHandler}>
            DELETE
          </Button>
        </React.Fragment>
      }
    >
      <p>
         <b>  Do you want to proceed and delete this tours? </b> 
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
         <b>  The tour add to your list </b> 
        
      
        </p>
      </Modal>
      <li className="tour-item">

      <div class="cardHome">
                           <div class="cardHome__sideTour cardHome__side--front">
                                <div class="cardHome__picture cardHome__picture--5">
                                &nbsp;
                                </div>
                                <h4 class="cardHome__heading">
                                    <span class="cardHome__heading-span cardHome__heading-span--1">{props.city}</span>
                                </h4>
                                <div class="cardHome__details">
                                <div className="tour-item__actions">


          <div className="mycontent">
            <h2 className="p">{props.name} </h2>  
       </div>
          
          <div className="mycontent1">
          <h3 className="pp3" > <b> <i class="fas fa-couch"></i>&nbsp; Comfort:{props.comfort} </b></h3>
          <h3 className="pp3" > <b>   <i class="fas fa-money-check-alt"></i> &nbsp;cost:{props.value_for_money} </b></h3>
          <h3 className="pp3" > <b><i class="fas fa-broom"></i>&nbsp; Cleanliness:{props.cleanliness} </b></h3>
          <h3 className="pp3" > <b> <i class="fas fa-wifi"></i> &nbsp;Wifi:{props.wifi}</b></h3>
          <h3 className="pp3" >  <b><i class="fas fa-map-marker-alt"></i> &nbsp;Location:{props.location} </b> </h3> 
           <h3 className="pp3" >  <b> <i class="fas fa-concierge-bell"></i> &nbsp;Staff:{props.staff}</b> </h3> 
           </div>
        
           <h3 className="pp3"> <i class="fas fa-medal"></i>  &nbsp;Final score:{props.score} </h3>
       
           <div className="tour-item__actions"> 
       
         

          <h3 className="pp3">Check in: &nbsp;{check_in} </h3>
          <h3 className="pp3"> Check out: {check_out}</h3>
         </div>
       
        
          
         <h3 className="pp1">  <i class="fas fa-money-check-alt"></i> {Math.round(props.hotel_price) } ILS </h3>
         
          <h2 className="p">{props.flight_source} </h2>
          <h3 className="pp1">  <i class="fas fa-money-check-alt"></i> {Math.round(props.flight_price)  }  ILS</h3>
       
          </div>
          
                                </div>
                           </div>
                           <div class="cardHome__sideTour cardHome__side--back cardHome__side--back-1">
                                <div class="cardHome__cta">
                                    <div class="cardHome__price-box">
                                        <p class="cardHome__price-only">Only</p>
                                        <p class="cardHome__price-value">{Math.round(props.total_price) }₪</p>
                                          <Button inverse onClick={openMapHandler}> VIEW ON MAP</Button>
                                          <div className="mycontent"> <h3  ><a href={props.link}>Visit in the hotel website</a></h3></div>
          { (true===props.userId) && auth.isLoggedIn&&( <Button danger onClick={showDeleteWarningHandler}> DELETE</Button>)} 
          {(true!=props.userId) &&auth.isLoggedIn&& (  <Button  onClick={addToListUserHandler}> <i class="fas fa-heart"></i></Button>  )}
                                    </div>
                            
                                </div>
                                </div>
                                </div>
                               
       
      </li>
    </React.Fragment>
  );
};

export default TourItem;
