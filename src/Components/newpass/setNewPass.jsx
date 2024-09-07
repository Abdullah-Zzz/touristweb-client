import React from "react";
import './setNewPass.css'
import Nav from "../Home/nav/nav";
import Footer from "../Home/Footer/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SetNewPass() {
    const [pass , setPass] = React.useState("")
    const [confirmPass , setConfirmPass] = React.useState("")
    const [respMessage, setRespMessage] = React.useState("")
    const Backend_URL = import.meta.env.VITE_BACKEND_URL
    const {id, token} = useParams()
    const navigate = useNavigate()
    
    const changingPass =async (e) => {
        e.preventDefault()
        const req = await axios.post(`${Backend_URL}/users/${id}/${token}`, {password:pass,confirmPass:confirmPass}, {
            validateStatus : function (status) {
                return status < 500;
            }
        })
        .then(res => {
            if (res.status == 200){
                setRespMessage(res.data)
                setTimeout(() => {
                    navigate('/login')
                }, 1500)
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
        <section className="newpass-body">    
            <Nav />
            <div className="newpass-mainContainer">
                <h1 className="newpass-head">
                    Set New Password
                </h1>
                <p className="newpass-para">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. In recusandae est quisquam reicie
                </p>
                {respMessage && <span className="newpass-respMessage">{respMessage}</span>}
                <form method="POST" className="newpass-form" onSubmit={(e) => changingPass(e)}>
                    <input className="newpass-input" placeholder="New Password" type="password" onChange={(e) => setPass(e.target.value)} required/>
                    <input className="newpass-input" placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPass(e.target.value)} required/>
                    <button type="submit" className="newpass-submit" >
                        Reset My Password
                    </button>
                </form>
            </div>
        </section>
        <Footer />
        </>
    )

}
