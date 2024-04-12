import axios from "axios";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
export default function Header(){
    const cookie = new Cookies();
    const token = cookie.get("Bearer");
     
    async function handelLogOut(){
        try{
        await axios.post("http://127.0.0.1:8000/api/logout",null,{
            headers:{
                Authorization:'Bearer '+ token,
            },
        });
        cookie.remove("Bearer");
        window.location.pathname="/";
        }catch(e){
            console.log(e);
        }
    }

    return(
        <div className="container shadow">
            <nav className="d-flex p-2">
                <div className="d-flex">
                        <Link to="/" style={{fontSize:"20px", color:"black", textDecoration:"none"}}>Home</Link>
                        <Link to="/about" style={{marginLeft :"13px", fontSize:"20px", color:"black", textDecoration:"none"}}>About</Link>
                </div>
                <div className="d-flex">
                    
                       { !token ? (
                        <>
                        <Link to="/register" style={{textAlign:"center"}} className="register-nav">Register</Link>
                        <Link to="/login" style={{textAlign:"center"}} className="register-nav">Login</Link>
                        </>
                        ):(
                         <>
                        <Link to="/dashboard" style={{textAlign:"center"}} className="register-nav">Dashboard</Link>
                        <div className="register-nav" onClick={handelLogOut}>Logout</div>
                        </>)}
                </div>
            </nav>
        </div>
    );
}