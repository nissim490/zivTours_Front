import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.scss';

const NewFlight = () => {
  const [formState, inputHandler] = useForm(
    {
      Web_Source: {
        value: '',
        isValid: false
      },
      Price: {
        value: '',
        isValid: false
      },
      Return_date: {
        value: '',
        isValid: false
      },

      Destination: {
        value: '',
        isValid: false
      },
      Depart_date: {
        value: '',
        isValid: false
      },
      
    },
    false
  );

  const flightubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <form className="place-form" onSubmit={flightubmitHandler}>
      <Input
        id="Web_Source"
        element="input"
        type="text"
        label="Web Source"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a  Web Source."
        onInput={inputHandler}
      />
     
      <Input
        id="Price"
        element="input"
        label="Price"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a price."
        onInput={inputHandler}
      />
        <Input
        id="Return_date"
        element="input"
        label="Return_date"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
        <Input
        id="Destination"
        element="input"
        label="Destination"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a  Destination."
        onInput={inputHandler}
      />
       <Input
        id="Depart_date"
        element="input"
        label="Depart_date"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a Depart date."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD FLIGHT
      </Button>
    </form>
  );
};

export default NewFlight;
