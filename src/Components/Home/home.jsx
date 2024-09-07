import React from "react";
import Hero from "./HeroAndNav/HeroAndNav"
import PopularDestinations  from "./PopularDestination/DestinationSection"
import Trips from "./Trips/Trips"
import Footer from "./Footer/Footer"
import CustomizedTripHomeSect from "./CustomizedTrips/customizedTrips";

export default function Home(){
    return(
        <>
            
            <Hero />
            <PopularDestinations />
            <CustomizedTripHomeSect />
            <Trips />
            <Footer />
        </>
    )
}