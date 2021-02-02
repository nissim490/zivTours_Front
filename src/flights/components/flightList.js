

import Card from '../../shared/components/UIElements/Card';
import FlightItem from './flightItem';

import './flightList.scss';

const FlightList = props => {
 // console.log(props)

 
 
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        
          <h2>No flights were found</h2>
        
       
      </div>
    );
  }

  return (
    <ul className="flight-list">
     <div class="flex-container">
      {props.items.map(flight => (
       <div class="item">
        <FlightItem
          key={flight._id}
          id={flight._id}
          web={flight.source}
          departure_code={flight.departure.code}
          price={flight.price}
          departure_country={flight.departure.country.name}
          departure_country_code={flight.departure.country.code}
          departure_airport={flight.departure.name}
          depart_date={flight.depart_date}
          destination_code={flight.destination.code}
          destination_country={flight.destination.country.name}
          destination_country_code={flight.destination.country.code}
          destination_airport={flight.destination.name}
          return_date={flight.return_date}
          city={flight.destination.city}
          userId={props.flag}
          getData={props.getData}
        />
        </div>
      ))}
       </div>
    </ul>
  );
};

export default FlightList;
