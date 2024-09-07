import React from "react";
import "./aboutUs.css"
import Nav from "../Home/nav/nav"
import Footer from "../Home/Footer/Footer"

export default function AboutUs(){
    return(
        <>
        <section className="aboutus-Hero">
            <Nav />
            <div className="aboutus-mainHead">

            <h1>About Us</h1>
            </div>
        </section>
        <section className="aboutus-body">
            <div className="ourHistory">
                <h2>
                    Our History
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestiae id, ullam voluptates reprehenderit 
                    labore inventore aperiam dolore accusamus tempore neque nemo debitis laborum expedita maxime sequi vitae explicabo iure.
                </p>
            </div>
            <div className="ourMission">
                <h2>
                    Our Mission
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, adipisci dolorem numquam ut aspernatur maxime! 
                    Eius officia aliquam iste sapiente, praesentium, libero ex molestias illo quam, tenetur aspernatur quidem assumenda?
                </p>
            </div>
            <div className="ourVision">
                <h2>
                    Our Vision
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ducimus hic consequuntur dolorem ad nesciunt voluptas 
                    excepturi, vel quam repudiandae commodi, libero ratione blanditiis laboriosam? Harum illum possimus libero commodi.
                </p>
            </div>
        </section>
        <Footer />
        </>
    )

}
