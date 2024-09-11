import React, { useEffect } from "react";
import Nav from "../Home/nav/nav";
import "./booking.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../Slider/ImageSlider";
import Table from "../inclusionTable/table";
import DatePicker from "../customize/datePicker";
import FullScreenLoading from "../loadingComp/fullScreenloader"

export default function Booking() {
    const navigate = useNavigate()
    const Backend_URL = import.meta.env.VITE_BACKEND_URL
    const [Total, setTotal] = React.useState(1);
    const [pageInfo, setpageInfo] = React.useState()
    const [error, setError] = React.useState("");
    const { productId, packageId } = useParams();
    const [reservationInfo, setreservationInfo] = React.useState({
        name: "",
        number: Number,
        people: 0,
        packageName: '',
        transportation: "air",
        date:String
    })
    const [bookedInfo, setbookedInfo] = React.useState("")
    const [comments, setComments] = React.useState()
    const [addComment, setAddComment] = React.useState("")
    const [commentError,setCommentError] = React.useState("")
    const [rating, setRating] = React.useState(3)
    const [loadingScreen, setLoadingScreen] = React.useState(false)
    useEffect(() => {
        const fetchInformation = async () => {
            try {
                const res = await axios.get(`${Backend_URL}/api/booking/${productId}/${packageId}`, {
                    validateStatus: (status) => {
                        return status < 500;
                    }
                })
                const data = res.data.mainData[0].packages.filter((pack) => {
                    return pack.id === packageId
                })
                setpageInfo(data[0])
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchInformation();
    }, [productId])
    useEffect(() => {
        const fetchInformation = async () => {
            try {
                const res = await axios.get(`${Backend_URL}/comments/${packageId}`, {
                    validateStatus: (status) => {
                        return status < 500;
                    }
                })
                if (res.status == 200) {
                    setComments(res.data)
                }
                else {
                    setComments('')
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchInformation();
    }, [])
    function settingInput(event) {
        const name = event.target.name;
        const value = event.target.value
        setreservationInfo({ ...reservationInfo, [name]: value })
    }

    function totalPrice(event) {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value) && value <= 10) {
            setTotal(value);
        } else {
            event.target.value = '';
        }
        settingInput(event)
    }

    function handleInput(event) {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        event.target.value = value;
    }

    const handleSubmit = async () => {
        setLoadingScreen(true)
        const popUp = document.getElementById("booking-popUp");
        try {
            const res = await axios.post(`${Backend_URL}/api/booked`, {
                name: reservationInfo.name,
                number: reservationInfo.number,
                people: reservationInfo.people,
                packageName: pageInfo && pageInfo.package_name,
                transportation: reservationInfo.transportation,
                date: reservationInfo.date
            }, {
                validateStatus: (status) => {
                    return status < 500;
                }
            })
            if (res.status == 200) {
                const data = res.data
                setError("")
                setbookedInfo(data)
                window.location.reload()
            }
            else {
                const data = res.data
                popUp.style.display = "none";
                setError(data)
            }
        }
        catch (err) {
            setbookedInfo(err)
        }
        finally{
            setLoadingScreen(false)
        }
    }
    const popupCancel = () => {
        const popUp = document.getElementById("booking-popUp");
        popUp.style.display = "none";
    }
    const confirmationPopUp = (e) => {
        e.preventDefault()
        const popUp = document.getElementById("booking-popUp");
        popUp.style.display = "flex";
    }
    const POSTCOMMENT =async (e) =>{
        setLoadingScreen(true)
        e.preventDefault()
        try{
            const res = await axios.post(`${Backend_URL}/comments/${packageId}`,{
                    comment:addComment,
                    rating:rating
            },{
                validateStatus:(status) =>{
                    return status < 500;
                },
                withCredentials:true,
            })
            setCommentError(res.data)
            if(res.status == 200){
                window.location.reload()
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoadingScreen(false)
        }
    }
    const handleDateChange = (date) =>{
        setreservationInfo(oldInfo => ({
            ...oldInfo,
            date:date
        }))
    }
    return (
        <section className="booking-mainContainer">
            {pageInfo ? null :  <FullScreenLoading />}
            {loadingScreen ? <FullScreenLoading /> : null}
            <Nav />
            < div className="booking-popUp" id="booking-popUp">
                <div className="booking-confirmation">
                    <p>
                        {bookedInfo === "" ? "Are you sure you want to book this trip?" : bookedInfo}
                    </p>
                </div>
                <div className="booking-popUpButtons">
                    {bookedInfo === "" ? <button className="booking-popUp-cancelbtn" onClick={popupCancel}>Cancel</button> : null}
                    {bookedInfo === "" ? <button className="booking-popUp-okbtn" onClick={handleSubmit}>Ok</button> : <button className="booking-popUp-bookedOkbtn" onClick={(e) => { setbookedInfo(""); popupCancel(e) }}>Ok</button>}
                </div>
            </div>
            <section className="booking-body">

                <section className="booking-parentSection">
                    <section className="booking-infoSection">
                        <div className="booking-mainImage" >
                            {pageInfo && <ImageSlider imageURLs={pageInfo && pageInfo.image_url} />}
                        </div>
                        <section className="booking-information">
                            <h2 className="booking-name">{pageInfo && pageInfo.package_name}</h2>
                            <div className="booking-city">
                                <img src="/Images/location.png" />
                                <p>{pageInfo && pageInfo.city}</p>
                            </div>
                            <div className="booking-priceAndDistance">
                                <div className="booking-price">

                                    <img src="/Images/dollar-symbol.png" />
                                    <p>{pageInfo && pageInfo.price} PKR/per person</p>
                                </div>
                            </div>
                            <div className="booking-description">
                                <h2>Description</h2>
                                <p>
                                    {pageInfo && pageInfo.description}
                                </p>
                                <h2>Tour Duration</h2>
                                <p>The whole tour will be of {pageInfo && pageInfo.duration}.</p>
                                <h2>History</h2>
                                <p>{pageInfo && pageInfo.big_description}</p>
                                <div className="booking-history">
                                    <img src="/Images/book.png" />
                                    <a href="#" className="booking-historyURL"><b>Read More About the History of {pageInfo && pageInfo.city}</b></a>
                                </div>
                                {/* <ul>
                                    {pageInfo && pageInfo.details.tour_inclusion.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul>
                                <h2>Tour Exclusion</h2>
                                <ul>
                                    {pageInfo && pageInfo.details.tour_exclusion.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul>
                                <h2>Tour Itinearary</h2>
                                <ul>
                                    {pageInfo && pageInfo.details.tour_itinerary.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul> */}
                                <Table
                                    inclusion={pageInfo && pageInfo.details.tour_inclusion}
                                    exclusion={pageInfo && pageInfo.details.tour_exclusion}
                                    itinerary={pageInfo && pageInfo.details.tour_itinerary}
                                />
                            </div>
                            <section className="booking-commentSection">
                                <h1>Add A Comment</h1>
                                <span className="booking-commentError">{commentError && commentError}</span>
                                    <div className="booking-commentRatingStars">
                                      <p className="booking-commentRatingHead">
                                        please Rate our package:
                                       </p>
                                       <div className="booking-commentRatingAllStarsDiv">

                                        {
                                            new Array(5).fill(null).map((_, index) => {
                                                return(
                                                    <div className="booking-commentRatingStarsDiv" key={index+1} onClick={(e) => setRating(index+1)} >
                                                    {rating >= index+1 ? <img src="/Images/star.png" key={index}/> : <img src="/Images/starEmpty.png" key={index}/>}
                                                </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                <form method="POST" className="booking-commentForm" onSubmit={(e) => POSTCOMMENT(e)}>
                                <textarea className="booking-commentInput" placeholder="Your Comment" onChange={(e) =>setAddComment(e.target.value)} required></textarea>
                                        <button className="booking-commentButton" type="submit">
                                            Add
                                        </button>
                                    {/* <div className="booking-commentFormRating">
                                        <h2>Rating: </h2>
                                        <select className="booking-commentSetRating" onChange={(e) => setRating(parseInt(e.target.value))} required>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div> */}
                                </form>
                                {comments ? comments.comments.map(comment => {
                                   return (<div className="booking-comment">
                                        <div className="booking-commentWriter">
                                            {comment.createdBy}
                                        </div>
                                        <div className="booking-commentDetails">
                                            <p className="booking-commentDate">{comment.createdAt} | <span className="booking-commentRating">{comment.rating}<img src="/Images/star.png" /></span></p>
                                        </div>
                                        <div className="booking-commentText">
                                            {comment.comment}
                                        </div>
                                    </div>)
                                }) : <div className="booking-NoComment">No Comments</div>
                                }
                            </section>
                        </section>
                    </section>
                    <section className="booking-paymentSection">
                        <div className="booking-cost">
                            <h3>{pageInfo && pageInfo.price} PKR</h3>
                            <p> /per person</p>
                        </div>
                        <div className="booking-paymentForm">
                            <div className="booking-paymentFormHead"><h4>Information</h4><span className="booking-error">{error}</span></div>
                            <form method="POST" onSubmit={(e) => confirmationPopUp(e)} className="booking-form" name="booking-form">
                                <input name="name" type="text" placeholder="Full Name" onChange={settingInput} required />
                                <input name="number" type="number" min="1111111111" max="9999999999" placeholder="Phone" onChange={settingInput} required />
                                <input name="people" type="number" min="1" max="10" placeholder="No of People ( max 10 )" onChange={totalPrice} onInput={handleInput} required />
                                <select name="custom-transport" className="custom-transport" onChange={(e) => setreservationInfo(oldInfo => ({ ...oldInfo, transportation: e.target.value }))} required>
                                    <option value="air">By Air</option>
                                    <option value="road">By Road</option>
                                </select>
                                <DatePicker onChangeFunc={handleDateChange} />
                                <div className="booking-calculations">
                                    <div className="booking-calc1">
                                        <p>{pageInfo && pageInfo.price} PKR * 1 person</p>
                                        <p>
                                            {pageInfo && pageInfo.price} PKR
                                        </p>
                                    </div>
                                    <div className="booking-serviceCharge">
                                        <p>Service Charge</p>
                                        <p>1000 PKR</p>
                                    </div>
                                    <div className="booking-total">
                                        <p>Total</p>
                                        <p>{`${pageInfo && (pageInfo.price * (reservationInfo.people ? reservationInfo.people : 1)) + (reservationInfo.transportation == "air" ? 3000 : 2000)} PKR`}</p>
                                    </div>
                                </div>
                                <button className="booking-booknow">
                                    Book Now
                                </button>
                            </form>
                        </div>
                    </section>
                </section>
            </section>
        </section>
    )
}