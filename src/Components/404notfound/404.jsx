import React from "react";
import Nav from "../Home/nav/nav";
import Footer from "../Home/Footer/Footer"
import "./404.css"
import { Link } from "react-router-dom";

export default function NotFound(){

    return(
        <section className="notFound-container">
            <Nav />
            <section className="notFound-body">
                <div className="notFound-bodyHead">
                    <h1>404</h1>
                </div>
                <div className="notFound-bodypara">
                    <h2>This page was not found.</h2>
                    <h3>Go to <Link to={"/"}>homepage</Link></h3>
                </div>
            </section>
            <Footer />
        </section>
    )

}