import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import '../../css/style.css'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_CONFRIM
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.scss';

const Auth = () => {
  
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
        
          password: {
            value: '',
            isValid: false
          },
          passwordConfirm: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    console.log("isLoginMode");

    event.preventDefault();
    if (isLoginMode) {
      

      
      try {

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users/login`,
          'POST',
         {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }
      
        );
        
   
        auth.login(responseData.data.data.user._id, responseData.data.token,responseData.data.data.user.role );
      

        
      } catch (err) {   }
    } else {
      try {
       
        
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users/signup`,
          'POST',
          {
            email: formState.inputs.email.value,
            name: formState.inputs.name.value,
            password: formState.inputs.password.value,
            passwordConfirm:formState.inputs.passwordConfirm.value,
         

          }
        );
   

auth.login(responseData.data.data.user._id, responseData.data.token,responseData.data.data.user.role );
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className='h2Aut'><i class="fas fa-user-lock"></i></h2>
    
       
        <form onSubmit={authSubmitHandler}>
        <div class="form__group">
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
         {/*  {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )} */}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode &&(<Input
            element="input"
            id="passwordConfirm"
            type="password"
            label="password Confirm"
            validators={[VALIDATOR_CONFRIM()]}
            errorText='Passwords are not the same!'
            onInput={inputHandler}
          />)}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          </div>
        </form>
      
        <Button inverse onClick={switchModeHandler}>
           {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
