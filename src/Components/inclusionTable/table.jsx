import React from "react";
import "./table.css"

export default function Table(props){

    const [Count, setCount] =  React.useState(1)

    const selection = (e) =>{
        const name = e.target.id;
        if(name == "inclusion"){
            setCount(1)
        }
        else if(name == "exclusion"){
            setCount(2)
        }
        else if(name == "itinerary"){
            setCount(3)
        }
    }

    return(
        <section className="table-body">
            <div className="table-options">

                <div className="table-inclusion"  >
                    <button onClick={(e) => selection(e)} style={{backgroundColor : Count == 1 ? "lightblue" : "transparent"}} id="inclusion">Tour Inclusion</button>
                </div>
                <div className="table-exclusion" >
                    <button onClick={(e) => selection(e)} style={{backgroundColor : Count == 2 ? "lightblue" : "transparent"}} id="exclusion">Tour Exculsion</button>
                </div>
                <div className="table-itinerary" >
                    <button onClick={(e) => selection(e)} style={{backgroundColor : Count == 3 ? "lightblue" : "transparent"}} id="itinerary">Itinerary</button>
                </div>
            </div>
            <div className="data">
                {Count ==1 && <ul>
                                    {props.inclusion && props.inclusion.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul>
                                }
                {Count ==2 && <ul>
                                    {props.exclusion.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul>
                                }
                {Count ==3 && <ul>
                                    {props.itinerary.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul>
                                }
            </div>
        </section>
    )
}