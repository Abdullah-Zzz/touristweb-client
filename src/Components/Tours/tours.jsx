import React from "react";
import Nav from "../Home/nav/nav";
import Footer from "../Home/Footer/Footer";
import { Link, useParams } from "react-router-dom"
import "./tours.css"
import axios from "axios";
import CardTrips from "../Home/Trips/CardTrips";

export default function Tours() {
    const [showMoreTrips, setshowMoreTrips] = React.useState(false);
    const [dataTrips, setdataTrips] = React.useState()
    const [search, setSearch] = React.useState("")
    const {productId} =useParams();
    const Backend_URL = import.meta.env.VITE_BACKEND_URL

    React.useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`${Backend_URL}/api/trips/${productId}`,{
                    validateStatus: (s) =>{
                        return s < 500;
                    }
                })
                setdataTrips(res.data.mainData)
            }
            catch (err) {
                throw err
            }
        }

        fetchData();
    }, [])
    return (

        <div className='tours-body'>
            <div className="tours-hero">
                <Nav />
                <div className="tours-heroContent">

                    <h1 className="tours-heroHead">All Tours</h1>
                    <p>These are all the tours we offer.</p>

                    <input type="text" placeholder="Search For the trip you want." className="tours-search" onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <section className="tours-allTrips">
                {
                    dataTrips && dataTrips.slice(1).filter((item) => {
                            return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
                        }).map((trip,index) => {
                            if (showMoreTrips === true ){
                           return( <CardTrips
                                img={trip.image_url}
                                head={trip.name}
                                para={trip.description}
                                key={trip.id}
                                id={trip.id}
                                redirURL ={"/booking"}
                            />)}
                            else{
                                if(index < 3){
                                    return( <CardTrips
                                        img={trip.image_url}
                                        head={trip.name}
                                        para={trip.description}
                                        key={trip.id}
                                        id={trip.id}
                                        redirURL ={"/booking"}
                                    />)
                                }
                                return null
                            }
                        })
                    }


            </section>
            <div className="tours-Btn">

                <button onClick={() => setshowMoreTrips(prev => !prev)} className="tours-viewMoreBtn">{showMoreTrips ? "Show Less" : "View More"}</button>
            </div>
            <Footer />
        </div>
    )
}