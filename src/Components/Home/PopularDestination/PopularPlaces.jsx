import React from 'react';
import './Destination.css'
import 'aos/dist/aos.css'; 
import AOS from 'aos';

export default function PopularPlaces(props){

  React.useEffect(() => {
    AOS.init({
      duration: 400, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

    return(
        <div className={props.class}>
          <div data-aos={props.fade1} className='popularPlace-funDestinationsPara'>
            <h4>
              {props.title}
            </h4>
            <p> 
              {props.para}  
            </p>
          </div>
          <div data-aos={props.fade2} className='popularPlace-destinationsPhotos'>
              <img src={props.Img1} />
              <img src={props.Img2} />
          </div>
        </div>

    )
}