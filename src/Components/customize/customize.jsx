import React from "react";
import Nav from "../Home/nav/nav"
import "./customize.css"
import axios from "axios";
import DatePicker from "./datePicker";
import Footer from "../Home/Footer/Footer"

export default function Customize() {

    const [provinces, setprovinces] = React.useState()
    const [error, setError] = React.useState('') 
    const [imageSrc, setImageSrc] = React.useState()
    const [customPopUpData, setCustomPopUpData] = React.useState("")
    const Backend_URL = import.meta.env.VITE_BACKEND_URL

    React.useEffect(() => {
        const data = async () => {
            try {
                const req = await axios.get(`${Backend_URL}/api/customized`, {
                    validateStatus: (status) => {
                        return status <= 500;
                    }
                })
                if(req.status == 200 ){
                    const res = req.data
                    setprovinces(res)
                }
            }
            catch (err) {
                throw err
            }
        }
        data();
    }, [])

    const [Count, setCount] = React.useState(0)

    const [customizedPackage, setCustomizedPackage] = React.useState({
        userInfo : {
            name : String,
            phoneNumber:Number,
        },
        packageInfo : {
            destination: String,
            people: Number,
            rooms: Number,
            priceExtraRoom: Number,
            days: Number,
            date: String,
            transportation: "air",
            price: Number
    }})
//     const [POSTDATA,setPOSTDATA] = React.useState({
//         userInfo : {
//             name : customizedPackage.userInfo.name,
//             phoneNumber:customizedPackage.userInfo.phoneNumber,
//         },
//         packageInfo : {
//             destination: customizedPackage.packageInfo.destination,
//             people: customizedPackage.packageInfo.people,
//             rooms: customizedPackage.packageInfo.rooms,
//             days: customizedPackage.packageInfo.days,
//             date: customizedPackage.packageInfo.date,
//             transportation: customizedPackage.packageInfo.transportation
//     }

//    })
    function onselect(id) {
        if (Count == 0) {
            setprovinces(oldprovinces => oldprovinces.map(province =>
                province.selected ? { ...province, selected: !province.selected } : province.id == id ? { ...province, selected: true } : province
            ))
        }
        if (Count === 1) {
            setprovinces(oldprovinces => oldprovinces.map(province => (
                {
                    ...province, places: province.places.map(place => (
                        place.selected ? { ...place, selected: false } : place.id == id ? { ...place, selected: true } : place
                    ))
                }
            )
            ))
        }
    }
    function handleInput(event) {
        let value = event.target.value;

        value = value.replace(/\D/g, '');
        event.target.value = value;
        if (value > 10) {
            event.target.value = ''
        }
    }
    function onclickingNxtBtn() {
        if (Count == 0) {
            provinces.map(province => (
                province.selected ? setCount(count => count + 1) : null
            ))
        }
        if (Count == 1) {
            provinces.map(province => province.places.map(place => (
                place.selected ? setCount(count => count + 1) : null
            )))
        }
    }

    const bookingPackage = async (e) => {
        e.preventDefault()
        try{
            const POSTDATA = {
                userInfo : {
                    name : customizedPackage.userInfo.name,
                    phoneNumber:customizedPackage.userInfo.phoneNumber,
                },
                packageInfo : {
                    destination: customizedPackage.packageInfo.destination,
                    people: customizedPackage.packageInfo.people,
                    rooms: customizedPackage.packageInfo.rooms,
                    days: customizedPackage.packageInfo.days,
                    date: customizedPackage.packageInfo.date,
                    transportation: customizedPackage.packageInfo.transportation
            }
           }
           console.log(POSTDATA);
            const req = await axios.post(`${Backend_URL}/api/customized/order`, POSTDATA , {
                validateStatus : function (status) {
                    return status  <= 500
                }
            })
            if(req.status == 200){
                const res = req.data;
                setError('')
                setCustomPopUpData(res)
            }
            else{
                const res = req.data;
                const popUp = document.getElementById("custom-popUp")
                popUp.style.display = "none"
                setError(res)
            }
        }
        catch(err){
            setError(err)
        }        
    }
    const popupCancel = () => {
        const popUp = document.getElementById("custom-popUp")
        popUp.style.display = "none"
    }
    const confirmationPopUp = (e) => {
        e.preventDefault()
        const popUp = document.getElementById("custom-popUp")
        popUp.style.display = "flex"
    }
    const handleDateChange = (date) => {
        setCustomizedPackage(oldPack => ({
          ...oldPack,
          packageInfo: {
            ...oldPack.packageInfo,
            date: date
          }
        }));
      };
    return (
        <>
            <nav>
                <Nav />
            </nav>
            < div className="custom-popUp" id="custom-popUp" >
                    <div className="custom-confirmation">
                        <p>
                           {customPopUpData === "" ? "Are you sure you want to book this trip" : customPopUpData}
                        </p>
                    </div>
                    <div className="custom-popUpButtons">
                         <button className="custom-popUp-cancelbtn" onClick={popupCancel}>Cancel</button>
                         <button className="custom-popUp-okbtn" onClick={bookingPackage} style={{display : customPopUpData == "" ? "block" : "none"}}>Ok</button>
                    </div>
             </div>
            <section className="custom-body">
                <div className="custom-mainContainer">

                    <h1>
                        {Count == 2 ? "Please fill the following info." : Count == 3 ? null : "Where Do You Want To Go?"}
                    </h1>
                    <div className={Count == 0 || Count != 1 ? 'custom-choices' : 'custom-choices2'}>

                        {Count == 0 && provinces && provinces.map(province => (
                            <div
                                className="custom-button"
                                id={province.id}
                                key={province.id}
                                onClick={() => onselect(province.id)}
                                style={{ backgroundColor: province.selected ? "lightblue" : "transparent" }}
                            >
                                {province.value}
                            </div>
                        ))}
                        {Count == 1 && provinces && provinces.map(province => (
                            province.selected ? province.places.map(place => (
                                <div
                                    className="custom-button2"
                                    id={place.id}
                                    key={place.id}
                                    onClick={() => { onselect(place.id); setCustomizedPackage(oldpack => ({...oldpack, packageInfo : {...oldpack.packageInfo, destination: place.name, price: place.price, priceExtraRoom: place.perRoom }})); setImageSrc(place.image) }}
                                    style={{ backgroundColor: place.selected ? "lightblue" : "transparent" }}
                                >
                                    {place.name}
                                </div>
                            ))
                                : null
                        ))}
                        {
                            Count === 2 &&
                            <form className="custom-infoForm" onSubmit={(e) => { e.preventDefault(); setCount(count => count + 1) }} method="POST">
                                <input type="text" onInput={handleInput} name="people" placeholder="No. of people {max 10}" onChange={(e) => setCustomizedPackage(oldpack => ({...oldpack, packageInfo : { ...oldpack.packageInfo, people: e.target.value }}))} required />
                                <input type="text" onInput={handleInput} name="rooms" placeholder="No. of rooms {max 10}" onChange={(e) => setCustomizedPackage(oldpack => ({...oldpack,packageInfo: {...oldpack.packageInfo, rooms: e.target.value }}))} required />
                                <input type="text" onInput={handleInput} name="days" placeholder="No. of days {max 10}" onChange={(e) => setCustomizedPackage(oldpack => ({ ...oldpack, packageInfo : {...oldpack.packageInfo, days: e.target.value} }))} required />
                                <DatePicker onChangeFunc={handleDateChange} />
                                <div className="custom-formbuttons">
                                    <button className="custom-backBtn" onClick={() => setCount(count => count - 1)} style={{ display: Count == 0 ? "none" : "block" }}>Back</button>
                                    <button className="custom-nxtBtn" onClick={onclickingNxtBtn} type="submit">Next</button>
                                </div>
                            </form>
                        }
                        {
                            Count === 3 &&
                            <section className="custom-paymentSection">
                                <div className="custom-photo">
                                    <img src={imageSrc} />
                                </div>
                                <div className="custom-allInfoAboutPackage">

                                <div className="custom-cost">
                                    <div className="custom-costHead">
                                        <h3>{customizedPackage.packageInfo.price} PKR</h3>
                                        <p> /per person</p>
                                    </div>
                                    <div className="custom-costName">
                                        <h4>{customizedPackage.packageInfo.destination}</h4>
                                    </div>
                                </div>
                                <div className="custom-paymentForm">
                                    <div className="custom-paymentFormHead"><h4>Information</h4><span className="custom-error">{error && error}</span></div>
                                    <form method="POST" className="custom-personalform" name="custom-personalform" onSubmit={(e) => confirmationPopUp(e)}>
                                        <input name="name" type="text" placeholder="Full Name" onChange={(e) => setCustomizedPackage(oldpack => ({...oldpack, userInfo : { ...oldpack.userInfo, name: e.target.value }}))} required />
                                        <input name="number" type="number" min="1111111111" max="9999999999" placeholder="Phone" onChange={(e) => setCustomizedPackage(oldpack => ({...oldpack, userInfo : { ...oldpack.userInfo, phoneNumber: e.target.value }}))} required />
                                        <select name="custom-transport" className="custom-transport" onChange={(e) => setCustomizedPackage(oldpack => ({ ...oldpack, packageInfo : {...oldpack.packageInfo, transportation: e.target.value} }))} required>
                                            <option value="air">By Air</option>
                                            <option value="road">By Road</option>
                                        </select>
                                        <div className="custom-calculations">
                                            <div className="custom-calc1">
                                                <p>{customizedPackage.packageInfo.price} PKR * {customizedPackage.packageInfo.people} person</p>
                                                <p>
                                                    {customizedPackage.packageInfo.price * customizedPackage.packageInfo.people} PKR
                                                </p>
                                            </div>
                                            <div className="custom-priceExtraRoom">
                                                <p>Price for {customizedPackage.packageInfo.rooms - 1} Extra Room/s </p>
                                                <p>{customizedPackage.packageInfo.priceExtraRoom * (customizedPackage.packageInfo.rooms - 1)} PKR</p>
                                            </div>
                                            <div className="custom-serviceCharge">
                                                <p>Service Charge</p>
                                                <p>1000 PKR</p>
                                            </div>
                                            <div className="custom-total">
                                                <p>Total</p>
                                                <p>{`${(customizedPackage.packageInfo.price * customizedPackage.packageInfo.people) + (customizedPackage.packageInfo.transportation == "air" ? 3000 : 2000) + (customizedPackage.packageInfo.priceExtraRoom * (customizedPackage.packageInfo.rooms - 1)) + 1000} PKR`}</p>
                                            </div>
                                        </div>
                                        <button className="custom-booknow">
                                            Book Now
                                        </button>
                                    </form>
                                </div>
                                </div>
                            </section>
                        }
                    </div>
                </div>
                <div className="custom-buttons" style={{ display: Count === 2 || Count > 2 ? "none" : "flex" }}>
                    <button className="custom-backBtn" onClick={() => setCount(count => count - 1)} style={{ display: Count == 0 || Count > 2 ? "none" : "block" }}>Back</button>
                    <button className="custom-nxtBtn" style={{ display: Count > 2 ? "none" : "block" }} onClick={onclickingNxtBtn}>Next</button>
                </div>
            </section>
        </>
    )
}