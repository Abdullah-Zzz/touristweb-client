import React from "react";
import './resetpass.css'
import Nav from "../Home/nav/nav";
import Footer from "../Home/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
    const navigate = useNavigate()
    const Backend_URL = import.meta.env.VITE_BACKEND_URL

    const [input , setInput] = React.useState("")
    const [respMessage, setRespMessage] = React.useState("")

    const sendingMail =async (e) => {
        e.preventDefault()
        const req = await axios.post(`${Backend_URL}/users/resetpass`, {email:input}, {
            validateStatus : function (status) {
                return status < 500;
            }
        })
        .then(res => {
            if (res.status == 200){
                setRespMessage(`${res.data}`)
            }
            else{
                setRespMessage(res.data)
            }
        })
        .catch(res => {
           setRespMessage(res.data)
        })
    }

    return(
        <>
        <section className="resetpass-body">    
            <Nav />
            <div className="resetpass-mainContainer">
                <h1 className="resetpass-head">
                    Forgot Password
                </h1>
                <p className="resetpass-para">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. In recusandae est quisquam reicie
                </p>   
                {respMessage && respMessage == 'Email Sent' ?  <span className="resetpass-respMessage">{respMessage}, Go to the <a href="/login" style={{color:"color:  rgba(1, 134, 229, 1);"}}>login page</a></span> :  
                <span className="resetpass-respMessage">{respMessage}</span>}
                <form method="POST" className="resetpass-form" onSubmit={(e) => sendingMail(e)} >
                    <input className="resetpass-input" placeholder="Your Email" type="email" onChange={(e) => setInput(e.target.value)} required />
                    <button type="submit" className="resetpass-submit" >
                        Reset My Password
                    </button>
                </form>
            </div>
        </section>
        <Footer />
        </>
    )

}