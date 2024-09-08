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
                Pakistan's history is a tapestry woven with the threads of ancient civilizations, including the Indus Valley and the Persian Empire. 
                From the advent of Islam to the creation of our modern nation, our past is rich with cultural and historical milestones that continue to influence our present and future.
                </p>
            </div>
            <div className="ourMission">
                <h2>
                    Our Mission
                </h2>
                <p>
                Our mission is to highlight the diverse attractions and cultural heritage of Pakistan to both locals and international visitors. 
                We are dedicated to providing comprehensive travel information and promoting the unique experiences that make Pakistan a remarkable destination for exploration.
                </p>
            </div>
            <div className="ourVision">
                <h2>
                    Our Vision
                </h2>
                <p>
                We envision a future where Pakistan is recognized as a top travel destination, known for its stunning landscapes, historical richness, and vibrant culture. 
                By supporting responsible tourism and preserving our heritage, we aim to foster a greater appreciation of Pakistan's beauty and history.
                </p>
            </div>
        </section>
        <Footer />
        </>
    )

}
