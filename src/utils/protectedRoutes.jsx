import { Outlet, Navigate, useParams } from "react-router-dom";
import axios from "axios"
import React from "react";

export const LoginRouteProtect = () => {
    const Backend_URL = import.meta.env.VITE_BACKEND_URL
    const [userIsAuthenticted, setUserIsAuthenticated] = React.useState(false)
    React.useEffect(() => {
        try {
            const routeProtect = async () => {
                const req = axios.get(`${Backend_URL}/users/login`, { validateStatus: (status) => { return status < 500; }, withCredentials: true })
                    .then(res => {
                        if (res.status == 200) {
                            setUserIsAuthenticated(true)
                        }
                    })
                    .catch(err => {
                        throw err
                    })

            }
            routeProtect();
        }
        catch (err) {
            throw err
        }
    }, [])
    return userIsAuthenticted ? <Navigate to="/" /> : <Outlet />
}

export const SetPassRouteProtect = () => {
    const Backend_URL = import.meta.env.VITE_BACKEND_URL
    const [validLink, setValidLink] = React.useState(false)
    const { id, token } = useParams()
    React.useEffect(() =>{
        const routeProtect = async () =>{
            try{

                const res = await axios.get(`${Backend_URL}/users/${id}/${token}`,{
                    validateStatus : (status) =>{
                        return status < 500
                    }
                })
                if(res.status != 200){
                   setValidLink(true)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        routeProtect();
    },[])
    return validLink ? <Navigate to="/" /> : <Outlet />;
}