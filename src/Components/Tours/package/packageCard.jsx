import React from "react";
import "./packageCard.css"
import {Link} from "react-router-dom"

export default function PackageCard(props) {

    return (
        <div className='packageCard-tripsCard'>
           <Link to={`/booking/${props.product}/${props.id}`}> <img src={props.img} className="packageCard-mainImg"/> </Link>
            <div className='packageCard-tripsInfo'>
                <div className="packageCard-city">
                    <img src="/Images/location.png" />
                    <p>
                        {props.city}
                    </p>
                </div>
                <div className="packageCard-para">

                <p>
                    {props.para}
                </p>
                </div>
                <div className="packageCard-price">
                    <p>
                        {props.price} <span className="packageCard-perperson">PKR /per person</span>
                    </p>
                    <Link to={`/booking/${props.product}/${props.id}`} ><button className="packageCard-booknowbtn">Book Now</button></Link> 
                </div>
            </div>
        </div>
    )
}