
import axios from 'axios'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import FlightList from '../components/flightList';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../shared/components/Navigation/MainNavigation.scss';
import { AuthContext } from '../../shared/context/auth-context';
import '../../css/style.css'
const HomePage  = () => {
  

  const [isLoading, setIsLoading] = useState(false);
  const {  error,  clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const auth = useContext(AuthContext);
  const inputHandler = async event => { 
        
    event.preventDefault()
    
  }
    

  return (
<React.Fragment>
  <ErrorModal error={error} onClear={clearError} />
  {isLoading && (<div className="center"><LoadingSpinner /></div> )}
  <div className="tour-item__image"><img src='https://images.unsplash.com/photo-1558882423-bebedae70ea8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt="title" /></div>
    
  <div class="header__text-box">
                <h1 class="heading-primary">
                    <span class="heading-primary--main">ZIV TOURS</span>
                    <span class="heading-primary--sub">is where life happens</span>
                </h1>
                {!auth.isLoggedIn && (<NavLink to="/flights"  class="btn btn--white btn--animated">Discover our tours</NavLink>) }
 </div>
           
    <main>
     <section class="section-about">  
        <div class="u-center-text u-margin-bottom-big">
                    <h2 class="heading-secondary">
                        Exciting tours for people who need a break
                    </h2>
        </div>
        <div class="row">
          <div class="col-1-of-2">

                     <h3 class="heading-tertiary u-margin-bottom-small">You're going to fall in love with our tours</h3>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                            ducimus quam nisi exercitationem omnis earum qui.
                        </p>

                        <h3 class="heading-tertiary u-margin-bottom-small">You're going to enjoy like you never have before</h3>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla deserunt voluptatum nam.
                        </p>

                        {auth.isLoggedIn && ( <NavLink to="/tours" 
                          class="btn btn--green"
                
                                  >Discover all Tours</NavLink>)}
                      
                       

                </div>
            <div class="col-1-of-2">  
                
                <div class="composition"> 
                        
                        <img src="https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="title"  class="composition__photo composition__photo--p1"/>
                        <img src="https://images.unsplash.com/photo-1549875648-357fef68fec7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTEzfHxob3RlbHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="title"  class="composition__photo composition__photo--p2"/>
                        <img src="https://images.unsplash.com/photo-1588791198899-87316655dbd9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTAxfHxob3RlbHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="title"  class="composition__photo composition__photo--p3"/>
                        
                        </div>
                 </div>
            </div>
     </section>
     <section class="section-features">
                <div class="row">
                    <div class="col-1-of-4">
                        <div class="feature-box">
                          <i class=" feature-box__icon fas fa-globe"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Explore the world</h3>
                            <p class="feature-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="feature-box">
                        <i class=" feature-box__icon far fa-compass"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Meet nature</h3>
                            <p class="feature-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="feature-box">
                        <i class=" feature-box__icon far fa-map"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Find your way</h3>
                             <p class="feature-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="feature-box">
                        <i class=" feature-box__icon far fa-heart"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Live a healthier life</h3>
                            <p class="feature-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
     <section class="section-tours" id="section-tours">
            <div class="u-center-text u-margin-bottom-big">
                    <h2 class="heading-secondary">
                        Most popular flights
                    </h2>
            </div>
            <div class="row">
            <div class="col-1-of-3">
                       <div class="cardHome">
                           <div class="cardHome__side cardHome__side--front">
                                <div class="cardHome__picture cardHome__picture--1">
                                &nbsp;
                                </div>
                                <h4 class="cardHome__heading">
                                    <span class="cardHome__heading-span cardHome__heading-span--1">Milano</span>
                                </h4>
                                <div class="cardHome__details">
                                    <ul>
                                    <li>departure: 20-04-2021</li>
                                        <li>retutn: 22-04-2021</li>
                                        <li> 2 people</li>
                                       
                                    </ul>
                                </div>
                           </div>
                           <div class="cardHome__side cardHome__side--back cardHome__side--back-1">
                                <div class="cardHome__cta">
                                    <div class="cardHome__price-box">
                                        <p class="cardHome__price-only">Only</p>
                                        <p class="cardHome__price-value">700₪</p>
                                    </div>
                            
                                </div>
                                </div>
                                </div>
                                </div>
            <div class="col-1-of-3">
                        <div class="cardHome">
                        <div class="cardHome__side cardHome__side--front">
                                <div class="cardHome__picture cardHome__picture--2">
                                    &nbsp;
                                </div>

                                <h4 class="cardHome__heading">
                                    <span class="cardHome__heading-span cardHome__heading-span--2">Hungary </span>
                                </h4>
                                <div class="cardHome__details">
                                    <ul>
                                        <li>departure: 20-05-2021</li>
                                        <li>retutn: 22-05-2021</li>
                                        <li> 2 people</li>
                                        
                                    </ul>
                                  </div>


                                </div>

                                <div class="cardHome__side cardHome__side--back cardHome__side--back-2">
                                <div class="cardHome__cta">
                                    <div class="cardHome__price-box">
                                        <p class="cardHome__price-only">Only</p>
                                        <p class="cardHome__price-value">500₪</p>
                                    </div>
                                    {/* <a href="#popup" class="btn btn--white">Book now!</a> */}
                                </div>
                            </div>

                        </div>
                                </div>       
            <div class="col-1-of-3">
                        <div class="cardHome">
                    <div class="cardHome__side cardHome__side--front">

                            <div class="cardHome__picture cardHome__picture--3">
                                    &nbsp;
                                </div>

                                <h4 class="cardHome__heading">
                                    <span class="cardHome__heading-span cardHome__heading-span--3">Bulgaria</span>
                                </h4>
                                <div class="cardHome__details">
                                    <ul>
                                        <li>departure: 21-01-2021</li>
                                        <li>retutn: 22-01-2021</li>
                                        <li> 2 people</li>
                                       
                                    </ul>
                                </div>

                            </div>
                            <div class="cardHome__side cardHome__side--back cardHome__side--back-3">
                                <div class="cardHome__cta">
                                    <div class="cardHome__price-box">
                                        <p class="cardHome__price-only">Only</p>
                                        <p class="cardHome__price-value">500₪</p>
                                    </div>
                                  {/*   <a href="#popup" class="btn btn--white">Book now!</a> */}
                                    </div>
                                  </div>


            </div>




            </div></div>
        <div class="u-center-text u-margin-top-huge">
        {auth.isLoggedIn && ( <NavLink to="/flights" class="btn btn--green">Discover all flights</NavLink>)}
        </div>

    </section>
    <section class="section-stories">
                 <div class="bg-video">
                 <video class="bg-video__content" autoplay muted loop>
         
                {/*  <source src="img/video.mp4" type="video/mp4">
                        <source src="img/video.webm" type="video/webm">
                        Your browser is not supported! */}

                    </video>
                 </div>
                 <div class="u-center-text u-margin-bottom-big">

                 <h2 class="heading-secondary">
                        We make people genuinely happy
                    </h2>

                 </div>
                 <div class="row">
                    <div class="story">
                    <figure class="story__shape">
                    <img src="https://upload.wikimedia.org/wikipedia/en/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg" alt="title"  class="story__img"/>
                    <figcaption class="story__caption">Joey tribbiani</figcaption>
                    </figure>
                    <div class="story__text">
                    <h3 class="heading-tertiary u-margin-bottom-small">I had the best week ever with my family</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                                ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                                repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
                            </p>

                      </div>
                    </div>
                  </div>


               <div class="row">
                  <div class="story">
                  <figure class="story__shape">
                  <img src="https://i.ytimg.com/vi/SU-WgjLIyTU/maxresdefault.jpg" alt="title"  class="story__img"/>
                  <figcaption class="story__caption">Monica geller</figcaption>
                  </figure>
                  <div class="story__text">
                  <h3 class="heading-tertiary u-margin-bottom-small">WOW! My life is completely different now</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                                ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                                repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
                            </p>


                  </div>
                  </div>
                </div>


                <div class="u-center-text u-margin-top-huge">
                   {/*  <a href="#" class="btn-text">Read all stories &rarr;</a> */}
                </div>

                 </section>   
    </main>

                
 
                
                
</React.Fragment>
  )
};
///'https://images.unsplash.com/photo-1581012771300-224937651c42?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzJ8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60'
export default HomePage ;
