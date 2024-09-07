import './cardtrips.css'
import {Link} from "react-router-dom"

export default function TripCards(props) {



    return (
        <div className='card-tripsCard'>
           <Link to={`${props.redirURL}/${props.id}`}> <img src={props.img} /> </Link>
            <div className='card-tripsInfo'>
                <h4>
                    {props.head}
                </h4>
                <p>
                    {props.para}
                </p>
            </div>
        </div>
    )
}