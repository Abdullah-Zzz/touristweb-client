import { Link } from 'react-router-dom'
import CardTrips from "./CardTrips"
import axios from "axios"
import './Trips.css'
import React from 'react'
import Loading from "../../loadingComp/loading"


export default function Trips(){

  const [dataTrips, setdataTrips] = React.useState()
  const Backend_URL = import.meta.env.VITE_BACKEND_URL
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Backend_URL}/api/trips`);
        setdataTrips(response.data);
      } catch (err) {
        throw err 
      }
    };

    fetchData();
  }, []);
  return(
        <section className="trip-availableTrips">
        <div className='trip-tripsHead'>
          <h3>
            Trips we offer
          </h3>
          <p>
            These are some of the trips we offer
          </p>
        </div>
        <div className='trip-cards'>
          {
            dataTrips ? dataTrips.map((trip,index) =>{
              if(index < 3){
                return (
                <CardTrips 
                img={trip.mainData[0].image_url}
                head={trip.mainData[0].name}
                para={trip.mainData[0].description}
                key={trip._id}
                id={trip._id}
                redirURL ={"/trips"}
                /> )
              }
              return null
            }) : <Loading />
                
          }
        </div>
        <Link to={'/trips'}> <button className='trip-ExploreMorebtn'>Explore Trips  </button> </Link>
      </section>
    )
}