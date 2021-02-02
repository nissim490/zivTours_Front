import React, { useState ,useEffect,useContext} from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import  '../../../shared/components/FormElements/Input.scss';
import Button from '../../../shared/components/FormElements/Button';
import "react-day-picker/lib/style.css";
import { useHttpClient } from '../../hooks/http-hook';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import FlightList from '../../../flights/components/flightList';
import TourList from '../../../tours/components/tourList';
import Card from '../../../shared/components/UIElements/Card';
import axios from 'axios'
import '../../../flights/components/flightList.scss';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../App.scss';
import Switch from "react-switch";
//http://127.0.0.1:5000/api/v1/
const DayPicker1  = () => {
  const [from, setFrom] = useState(undefined);
  const [to, setTo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [f, set] = useState("2020-11-18");
  const [n, nset] = useState("");
  const [t, setT] = useState("2020-11-29");
 /* let from1="2020-11-18"
 let to1="2020-11-29" */
  const {  error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
    const [loadedUsers1, setLoadedUsers1] = useState();
    const [checkedFlights, setCheckedFlights] = useState(true);
    const [checkedCity, setCheckedCity] = useState(false);
    const [checkedTours, setCheckedTours] = useState(false);
    const [city, setCity] = useState("");
    const [price1, setPrice] = useState("a");
    const [mydata, setData] = useState(1);
    const [myd, setD] = useState();
    const auth = useContext(AuthContext);
    function getData(data){
      setData(mydata+1)
      console.log(data);
    }
   const handleChangeFlights = () =>{
    
    setCheckedFlights(true);
    setCheckedTours(false);
    }
    const handleChangeCity = () =>{
      setCheckedCity(!checkedCity);
      setFrom(undefined)
      setTo(undefined)
      }
    const handleChangeTours = () =>{
      setCheckedTours(true);
      setCheckedFlights(false);
    }
    

    useEffect(() => {
        const fetchUsers = async () => {
          try {
         
            if(checkedCity===false){
            setIsLoading(true);
            const  responseData= await  axios({
              method: "get",
              url:  `${process.env.REACT_APP_BACKEND_URL}flights?sort=price&depart_date=${f}&return_date=${t}`,
              
            })
            setLoadedUsers(responseData.data.data.data);
           
            if(responseData&&city)
          {
            setLoadedUsers( responseData.data.data.data.filter(item => item.destination.city=== city));
          
            if((price1.length!=0)){
            
              setLoadedUsers( responseData.data.data.data.filter(item => item.destination.city=== city&&item.price<= price1));
              }
          }
          
              if(responseData&&(price1.length!=0)&&!city){
            
                setLoadedUsers( responseData.data.data.data.filter(item => item.price<= price1));
                }
            const  responseData1= await  axios({
              method: "get",
              url:  `${process.env.REACT_APP_BACKEND_URL}tours?sort=price&hotel_check_in=${f}&hotel_check_out=${t}`,
            
            })
            setLoadedUsers1(responseData1.data.data.data);
            console.log(responseData1.data.data.data);
            if(city){
            setLoadedUsers1( responseData1.data.data.data.filter(item => item.hotel_city=== city));
            }
            if(responseData1&&city&&(price1.length!=0)){
           
              setLoadedUsers1( responseData1.data.data.data.filter(item => item.hotel_city=== city&&item.hotel_price<= price1));
              }
              if(responseData1&&(price1.length!=0)&&!city){
            
                setLoadedUsers1( responseData1.data.data.data.filter(item => item.price<= price1));
                }
          }

            else{   
              
            const  responseData= await  axios({
              method: "post",
              url:  `${process.env.REACT_APP_BACKEND_URL}flights/search`,

               data:{
                city:["destination.city",city]
               }
            })
       
            let m = responseData.data.data.data.filter(item => (item.user[0] !== undefined))
            var n =[];
          
            for (var i=0; i<m.length;i++) {
              for (var j=0; j< m[i].user.length;j++) {
               if(m[i].user[j]._id===auth.userId)
               n.push(m[i]._id)
               console.log(n);
        
              }
           
          }
     
          var filtered = responseData.data.data.data.filter(function(item) {
            return n.indexOf(item._id) === -1 ;
        });
            setLoadedUsers(filtered); 
            if(price1.length!=0){
             
           let l=responseData.data.data.data.filter(item => item.price<= price1)
         

           setLoadedUsers(l.sort((a, b) => parseInt(a.price) - parseInt(b.price)));
            }
            const  responseData1= await  axios({
              method: "get",
              url:  ` ${process.env.REACT_APP_BACKEND_URL}tours?sort=price&hotel_city=${city}`,
            
            })
            setLoadedUsers1(responseData1.data.data.data);
            if(price1.length!=0){
              
              setLoadedUsers1( responseData1.data.data.data.filter(item =>item.hotel_price<= price1));
              }
              if(!city)
             { 
               console.log('jjj');
              const  responseData= await  axios({
                method: "get",
                url:  `${process.env.REACT_APP_BACKEND_URL}flights?sort=price`,
                
              })
              
         
              if(responseData&&(price1.length!=0)){
              
                setLoadedUsers( responseData.data.data.data.filter(item => item.price<= price1));
                console.log(loadedUsers);
                }
              const  responseData1= await  axios({
                method: "get",
                url:  `${process.env.REACT_APP_BACKEND_URL}tours?sort=price`,
              
              })
             
              if(responseData1&&(price1.length!=0)){
           
                setLoadedUsers1( responseData1.data.data.data.filter(item => item.hotel_price<= price1));
                }
         
          }
        }
            setIsLoading(false);
          } catch (err) { setIsLoading(false);}
        };
        fetchUsers();
        
      }, [n,price1,mydata]);
      
      const inputHandler = async event => { 
        set("")
        nset(n+1)
        event.preventDefault()
     let  word= "haifa"
     let temp=""
     if(document.getElementById("city").value){
     word= document.getElementById("city").value
    
     word= word[0].toUpperCase()+word.slice(1).toLowerCase();
      temp=word[0]
  
     for (var i = 1; i < word.length; i++) {
      temp= temp+ word[i].toLowerCase()
    
    }


  }
    else{
      temp= document.getElementById("city").value

    
    }
  
   if(typeof(document.getElementById("price").value==="number"&&document.getElementById("price").value.length!=0)){
    
        setPrice( document.getElementById("price").value) 
      /*  console.log(price1); */
        }
 
   
/* console.log(document.getElementById("price").value==="number"); */
  /*   console.log(price1.length); */
        setCity(temp)
      set(f)
        setT(t)
      }
      
       
  return (

    <React.Fragment>
      
    <div class="header__text-box">
                    <h1 class="heading-primary">
                        <span class="heading-primary--main">ZIV TOURS</span>
                        <span class="headingSearch">Search</span>
                    </h1>
    
                  
                </div>
               
    <div>
    <div className="tour-item__image"><img src='https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt="title" /></div>
    <h1 className="main-navigation__title2" >Search</h1>
    <h1 className="title3" ></h1>
    {isLoading && (<div className="center"><LoadingSpinner /></div> )}
    <Card className={checkedCity ? 'DatePeker1' : 'DatePeker'}>
  
         
         
    < div className="flex-radio">
          <div className="Switch_search_continer" > 
        
              <label className='Switch_search_lable'> Search only by city</label> 
            <div className="Switch_search" >
                <Switch  onColor="#e65353"
    onHandleColor="#ffffff"
    handleDiameter={30}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(170, 26, 26, 0.2)"
    activeBoxShadow="0px 0px 1px 10px rgba(170, 26, 26, 0.2)"
    height={20}
    width={48}
    className="react-switch"
    id="material-switch" onChange={handleChangeCity} checked={checkedCity} />
            </div>

          
            </div>
           
          <div className="Tours_search_continer">
              <label className="Tours_search_lable" > Tours </label> 
              <div className="Tours_search_radio" >
            
              <input type="radio" id="Tours" name="age" value="Tours" onChange={handleChangeTours}/> 
          </div>
        
         </div>
             
     
              <p></p>
              <div className="Flights_search_continer" > 
              <label className="Flights_search_lable" > Flights </label> 
            
          
            <div className="Flights_search_radio" >
            <input type="radio" id="Flights" name="age" value="Flights" onChange={handleChangeFlights} />
               {/*  <Switch onChange={handleChangeFlights} checked={checkedFlights} /> */}
            </div>
           
          
            </div>
         
      </ div >
        
         {/*  {!checkedCity&& <div className="selectDatePlese" >  <b className='op56'> &nbsp;&nbsp;Please select a date</b>  </div> } */}
         <div  className="DayPicker_continer" >    
    
    { !checkedCity&&<DayPicker 
      
        numberOfMonths={1}
        selectedDays={[from, { from, to }]}
        onDayClick={(date) => {
          const range = DateUtils.addDayToRange(date, { from, to });
           
        
        //  console.log(range.from+"88")
          if(range.from==="Invalid Date")
          setFrom(new Date(2020-11-29));
  
          
          let b=" Thu Dec 24 2020 12:00:00 GMT+0200 (שעון ישראל (חורף))"
          let d=" Thu Dec 24 2020 12:00:00 GMT+0200 (שעון ישראל (חורף))"
         if(range.from!=" null")
         b =range.from
  
  
         if(range.to!=" null")
            d =range.to
            console.log(typeof(d));
         if(!!d)
         { d=  d.toLocaleDateString().replaceAll('.','-')
          var datePart =  d.match(/\d+/g),
         day = datePart[0], // get only two digits
         month = datePart[1],year= datePart[2];}
         if(parseInt(month)<10){
       
          month='0'+month
         }
         if(parseInt(day)<10){
          day='0'+day
         
         }
         d= year+'-'+month+'-'+day;
         console.log( "to"+d)
       
         setT(d)
        
  
         b=  b.toLocaleDateString().replaceAll('.','-')
       
         var datePart =  b.match(/\d+/g),
         day = datePart[0], // get only two digits
         month = datePart[1],year= datePart[2];
      
         if(parseInt(month)<10){
          console.log("typeof(month)");
          month='0'+month
         }
         
         if(parseInt(day)<10){
          day='0'+day

         }
        
         b= year+'-'+month+'-'+day;
          console.log("from" +b) 
          set(b) 
  
         setTo(range.to);
          setFrom(range.from);
  
        }}
      />}
     
      </div>
     
    <div className={checkedCity ? 'inputButtonCityContiner' : 'inputButtonContiner'} >
  
    

      <h3 className='lable_Price'>Max Price</h3>
     <input type="text" class="form__input1"  id="price" />  
     <h3 className='lable_City'>City</h3>
          <input type="text" class="form__input2"  id="city" />
          <div class="button_search">  <Button type="submit"onClick={inputHandler }>Search </Button>  </div>
    </div>
    
            
          



     
      </Card>
      </div>
      
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && ( <div className="center"> <LoadingSpinner /> </div> )}
        
         <div class="listRsultContiner">
          {!isLoading &&checkedFlights&& loadedUsers && <FlightList items={loadedUsers} getData={getData}/>  }
          {!isLoading && loadedUsers1 && checkedTours&&<TourList items={loadedUsers1}getData={getData} />}
          </div>
       
        </React.Fragment>
   )
}
export default DayPicker1 ;
