import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../../Home/nav/nav"
import Footer from "../../Home/Footer/Footer"
import "./package.css"
import PackageCard from "./packageCard";

export default function Packages() {
    const { productId } = useParams();
    const [data, setdata] = React.useState()
    const Backend_URL = import.meta.env.VITE_BACKEND_URL

    React.useEffect(() => {

        const fetchData = async () => {
            const data = await axios.get(`${Backend_URL}/api/booking/${productId}`, {
                validateStatus: (status) => {
                    return status < 500;
                }
            })

            const res = data;
            setdata(res.data)
        }
        fetchData()
    }
        , [])
    return (
        <>
            <section className="package-container">
                <Nav />
                <section className="package-Hero">
                    <h1>
                        {data && data.mainData[0].city} Tour Packages 2024 – Book family trips to {data && data.mainData[0].city} at 30% Off
                    </h1>
                    <p>
                        Browse {data && data.mainData[0].city} tour packages in 2024 from a list of 50-plus tours. These trips fall in the best-selling Pakistan tour packages. Our Multi-day 
                        {data && data.mainData[0].city} tours range from standard to deluxe 
                        facilities. {data && data.mainData[0].description} Our trips include private vehicles, family hotels, and 24/7 support staff.
                    </p>
                </section>
                <section className="package-packages">
                    <h2>
                        List of famous {data && data.mainData[0].city} Tour Packages 2024 - Book a Trip to {data && data.mainData[0].city} like Never Before!
                    </h2>
                    <div className="package-renderPackage">

                        {
                            data && data.mainData[0].packages.map((pack) => {
                                return (

                                    <PackageCard
                                        img={pack.image_url[0]}
                                        city={pack.package_name}
                                        para={pack.description}
                                        key={pack.id}
                                        id={pack.id}
                                        product={productId}
                                        price={pack.price}
                                    />
                                )   
                            })
                        }
                    </div>
                </section>
            </section>
            <Footer />
        </>
    )

}