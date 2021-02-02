import React from 'react';


import Card from '../../shared/components/UIElements/Card';
import TourItem from './tourItem';
import Button from '../../shared/components/FormElements/Button';
import './tourList.scss';

const TourList = props => {
  //console.log(props)

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
      
          <h2> No tours were found</h2>
          
      
      </div>
    );
  }

  return (
    <ul className="tour-list">
       <div class="flex-container">
      {props.items.map(tour => (
        
        <TourItem
          key={tour._id}
          id={tour._id}
          name={tour.hotel_name}
          value_for_money={tour.hotel_value_for_money}
          staff={tour.hotel_staff}
          facilities={tour.hotel_popular_facilities}
          location={tour.hotel_location}
          wifi={tour.hotel_free_wifi}
          cleanliness={tour.hotel_cleanliness}
          score={tour.hotel_score}
          comfort={tour.hotel_comfort}
          link={tour.hotel_link}
          address={tour.hotel_address}
          item={tour.popular_facilities}
          hotel_price={tour.hotel_price}
          total_price={tour.total_price}
          flight_price={tour.flight_price}
          check_out={tour.hotel_check_out}
          check_in={tour.hotel_check_in}
          city={tour.hotel_city}
          flight_source={tour.flight_source}
          userId={props.flag}
          getData={props.getData}
        />
      ))}
      </div>
    </ul>
  );
};

export default TourList;
