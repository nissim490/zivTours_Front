import React, { useState  } from 'react';
import  "./RotatCard.scss";




const RotatCard = props => {
  let day = new Map(
    [[0,'Sun'],[1,'Mon'],[2,'Tue'],[3,'Wed'],[4,'Thu'],[5,'Fri'],[6,'Sat']])
  let Day = new Map(day)
  var d = new Date(props.frontDate)
  let fNight=props.backTemperature.Value
  let cNight=Math.floor((fNight-32)*5/9)
  let fDay=props.frontTemperature.Value
  let cDay=Math.floor((fDay-32)*5/9)
let srcDay=`https://www.accuweather.com/images/weathericons/${props.frontDay.Icon}.svg`
let srcNgiht=`https://www.accuweather.com/images/weathericons/${props.backNight.Icon}.svg`
//https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=733&q=80

  return (
    <React.Fragment>   
  <div class="card">
                            <div class="card__side card__side--front">
                                <div class="card__picture card__picture--1">
                                <div className="continerCard">
                                  <h2 className="h_item">{Day.get(d.getDay())}</h2>
                                  <b className="forecast-degree">{cDay}°C</b>
                                  <img  alt="weatherIcon" className="weather-icon" src={srcDay}></img>
                                </div>
                                </div>
                           
                               
                            </div>
                            <div class="card__side card__side--back card__side--back-1">
                            <div className="continerCard">
                                  <h2 className="h_item">{Day.get(d.getDay())}</h2>
                                  <b className="forecast-degree">{cNight}°C</b>
                                  <img  alt="weatherIcon" className="weather-icon" src={srcNgiht}></img>
                                </div>
                            </div>
                        </div>
    </React.Fragment>
  );
};

export default RotatCard;
