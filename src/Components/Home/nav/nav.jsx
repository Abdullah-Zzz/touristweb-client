import React from "react"
import './nav.css'
import axios from "axios"
import { Link } from "react-router-dom"
axios.defaults.withCredentials = true;

export default function Nav() {

  const [user, setUser] = React.useState({})
  const [hamValue, sethamValue] = React.useState(true)
  const Backend_URL = import.meta.env.VITE_BACKEND_URL

  const userInfo = async () => {
    const req = await axios.get(`${Backend_URL}/users/api/user`, {
      validateStatus: (status) => {
        return status < 500;
      },
      withCredentials: true
    })
    .catch(err => {
      console.log(err)
    })
    const status = req.status
    if(status == 200){

      const data = req.data
      return data
    }
    else{
      return {}
    }

  }
  React.useEffect(() => {
      userInfo().then(data => setUser(data))
  }, [])

  async function loggingOut() {
    try {
        const req = await axios.get(`${Backend_URL}/users/logout`,{
          validateStatus : (status) => {return status < 500;}
        }).then(res => {
          if (res.status === 200 || res.status === 404 || res.status == 401){
            window.location.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })
        
    }
    catch (err) {
      console.log(err)
    }

  }

  return (
    <nav className={hamValue ? "navbar-nav" : "navbar-navMobile"}>
      <div className="navbar-mainHead">
        <h1>Trippy</h1>
        <div className={hamValue ? "navbar-hamIcon" : "navbar-change"} onClick={() => sethamValue(preValue => !preValue)}>
          <div className="navbar-bar1"></div>
          <div className="navbar-bar2"></div>
          <div className="navbar-bar3"></div>
        </div>

      </div>
      <div className={hamValue ? "navbar-navList" : "navbar-navListMobile"}>
        <ul>
          <li><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 
            9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
            Home</Link></li>
          <li><Link to="/about"><svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
            About Us</Link></li>

          <Link to={Object.keys(user).length === 0 ? "/login" : "#"}>
            <button className={Object.keys(user).length === 0 ? "navbar-navBtn" : "navbar-username"}>
              {Object.keys(user).length === 0 ? "login" : user.name}
            </button>

          </Link>
          {
            Object.keys(user).length === 0 ?
              <Link to="/register">
                <button className='navbar-navBtn'>
                  register
                </button>
              </Link>
              :

              <button className="navbar-logoutBtn" onClick={() => loggingOut()}>
                logout
              </button>
          }
        </ul>
      </div>
    </nav>
  )
}