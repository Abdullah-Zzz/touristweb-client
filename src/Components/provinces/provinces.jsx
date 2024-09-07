import React from "react";
import "./provinces.css"
import Nav from "../Home/nav/nav"
import axios from "axios";
import TripCards from "../Home/Trips/CardTrips";
import Footer from "../Home/Footer/Footer"

export default function Provinces() {
    const [data, setData] = React.useState()
    const Backend_URL = import.meta.env.VITE_BACKEND_URL

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${Backend_URL}/api/trips`)
            const data = res.data;
            setData(data)
        }
        fetchData();
    }, [])

    return (
        <section className="provinces-mainContainer">
            <Nav />
            <div className="provinces-hero">
                <h1>
                    All provinces
                </h1>
                <h2>
                    Please select to where you want to travel
                </h2>
            </div>
            <div className="provinces-card">
                {
                    data && data.map((province) => {
                        return (
                            <TripCards
                                img={province.mainData[0].image_url}
                                head={province.mainData[0].name}
                                para={province.mainData[0].description}
                                key={province._id}
                                id={province._id}
                                redirURL = {"/trips"}
                            />)
                    })
                }
            </div>
            <Footer />
        </section>
    )
}