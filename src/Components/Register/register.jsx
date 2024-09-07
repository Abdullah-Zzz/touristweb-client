import React from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import "./register.css"
import Footer from "../Home/Footer/Footer";
import login from "/Images/login.jpeg"
import Nav from "../Home/nav/nav"
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate =  useNavigate()
    const Backend_URL = import.meta.env.VITE_BACKEND_URL

    const [errorStyles,seterrorStyles]=React.useState({
        color:"rgb(200,0,0)",
        display:"inline",
        visibility :"hidden",
    })
    const [errorMessage, seterrorMessage] = React.useState("")

    const [PostData, setPostData] = React.useState({
        name:"",
        email:"",
        password:""
    })

    function handleSubmit(e){
        e.preventDefault()
        axios.post(`${Backend_URL}/users/register`, {name:PostData.name, email:PostData.email, password:PostData.password},{
            validateStatus : function (status){
                return status < 500;
            }
        })
        .then(resp => {
            if (resp.status === 200){
                navigate('/login')
            }
            else if(resp.status === 409){
                seterrorMessage(resp.data)
                seterrorStyles({...errorStyles, visibility : 'visible'})
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return(
        <>  
        <Nav/>
        <section className="register-section">
            <div className="register-container">
                <div className="register-photoSection">
                    <img src={login} />
                </div>
                <div className="register-formSection">
                    <h2>Register</h2>
                    
                    <form method="POST" onSubmit={handleSubmit} className="register-form">
                        <label style={errorStyles}>{errorMessage}</label>
                        <input type="text" placeholder="Username" name="name"  required onChange={(e) => setPostData({...PostData, name:e.target.value})}/> 
                        <input type="email" placeholder="Email" name="email"  required onChange={(e) => setPostData({...PostData, email:e.target.value})}/>
                        <input type="password" placeholder="Password" name="password" required onChange={(e) => setPostData({...PostData, password:e.target.value})}/>
                        <button className="register-subBtn">Register</button>
                    </form>
                    
                    

                    <p>Login <Link to="/login"> Here</Link></p>
                </div>
                
            </div>
            
        </section>
        <Footer/>  
             
        </>
    )
}