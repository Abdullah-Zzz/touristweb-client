import React from "react"
import './nav.css'
import axios from "axios"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

axios.defaults.withCredentials = true;

export default function Nav() {
  const Backend_URL = import.meta.env.VITE_BACKEND_URL

  const { data: user, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axios.get(`${Backend_URL}/users/api/user`, {
        validateStatus: s => s < 500,
        withCredentials: true,
      });
      return res.status === 200 ? res.data : null
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });

  async function loggingOut() {
    try {
      const res = await axios.get(`${Backend_URL}/users/logout`, {
        validateStatus: (s) => s < 500,
        withCredentials: true
      });
      if ([200, 404, 401].includes(res.status)) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [hamValue, sethamValue] = React.useState(true)

  return (
    <nav className={hamValue ? "navbar-nav" : "navbar-navMobile"}>
      <div className="navbar-mainHead">
        <h1>Trippy</h1>
        <div className={hamValue ? "navbar-hamIcon" : "navbar-change"} onClick={() => sethamValue(p => !p)}>
          <div className="navbar-bar1"></div>
          <div className="navbar-bar2"></div>
          <div className="navbar-bar3"></div>
        </div>
      </div>

      <div className={hamValue ? "navbar-navList" : "navbar-navListMobile"}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>

          <Link to={!user ? "/login" : "#"}>
            <button className={!user ? "navbar-navBtn" : "navbar-username"}>
              {isLoading ? "..." : user ? user.name : "login"}
            </button>
          </Link>

          {isLoading ? null :
            !user ?
              <Link to="/register">
                <button className='navbar-navBtn'>register</button>
              </Link>
              :
              <button className="navbar-logoutBtn" onClick={loggingOut}>
                logout
              </button>
          }
        </ul>
      </div>
    </nav>
  )
}
