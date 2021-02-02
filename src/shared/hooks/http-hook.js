import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios'
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body =null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
//console.log(body+"44")


      try {
      
        const  responseData= await  axios({
          method: method,
          url: url,
          data: {
            email: body.email,
            name: body.name,
            password: body.password,
            passwordConfirm:body.passwordConfirm,
      
          }
        }) .catch(function (error) {
          
          if (error.response) {
            if(error.message==='Request failed with status code 401')
            error.message='invaild email or password'
            console.log(error.response.data.error.code);
            if(error.response.data.error.code===11000){
            error.message='The email is in use'}
            setError(error.message);
            setIsLoading(false);
            throw error;
            
          }
        });
        //debugger
        //console.log(responseData)
        
 

     

       setIsLoading(false);
        return responseData;
      } catch (err) {

        if(err.message==='Request failed with status code 401'||err.message===`Cannot read property 'code' of undefined`)
        err.message='invaild email or password'
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
