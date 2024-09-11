import React from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import "./login.css"
import Footer from "../Home/Footer/Footer";
import dev from "/Images/dev.png"
import Nav from "../Home/nav/nav"
import { useNavigate } from "react-router-dom";
import FullScreenLoading from "../loadingComp/fullScreenloader";

export default function Login() {
    const Backend_URL = import.meta.env.VITE_BACKEND_URL
    const navigate =  useNavigate()

    const [errorStyles,seterrorStyles]=React.useState({
        color:"rgb(200,0,0)",
        display:"inline",
        visibility :"none",
    })

    const [errorMessage, seterrorMessage] = React.useState("")

    const [PostData, setPostData] = React.useState({
    email:"",
    password: "",
    })

    const [loadingScreen, setLoadingScreen] = React.useState(false)


    function handleSubmit(e){
        setLoadingScreen(true)
        e.preventDefault()
        axios.post(`${Backend_URL}/users/login` , {email:PostData.email, password:PostData.password},{
            validateStatus: function (status) {
                return status < 500; 
            },
            withCredentials:true
        })
        .then(res => {
            if(res.status === 200 ){
                navigate('/')
                window.location.reload()
            }
            else if (res.status === 401 || 404 ){
                seterrorMessage(res.data)
                seterrorStyles({...errorStyles, visibility:'visible'})
            }   
        })
        .catch(err => {seterrorMessage('An error has occurred, please refresh the page')
        })
        .finally(()=>{
            setLoadingScreen(false)
        })
    }
    return (
        <>
        {loadingScreen ? <FullScreenLoading /> : null}
            <Nav />
            <section className="login-section">
                <div className="login-container">
                    <div className="login-photoSection">
                        <img src={dev} />
                    </div>
                    <div className="login-formSection">
                        <h2>Login</h2>
                        <form method="POST" onSubmit={handleSubmit} className="login-form">
                            <label className="errorMsg" style={errorStyles}>{errorMessage}</label>
                            <input type="email" placeholder="Email" name="email" required onChange={(e) => setPostData({...PostData, email:e.target.value})}/>
                            <input type="password" placeholder="Password" name="password" required onChange={(e) => setPostData({...PostData, password:e.target.value})}/>
                          <a href="/reset-password" className="login-forgotPass">Forgot Your Pass?</a>  
                          <button className="subBtn">Login</button>
                        </form>
                        <p>Register <Link to="/register"> Here</Link></p>
                    </div>

                </div>

            </section>
            <Footer />
        </>
    )
}
