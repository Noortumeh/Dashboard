import Header from "../../../Components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./login.css"   ;
import { User } from "./../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [Err, setErr] = useState(false);

    //* Store Cookie
    const cookie = new Cookies();

    const userNow = useContext(User);
    const nav = useNavigate();

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            //send data
            let res = await axios.post("http://127.0.0.1:8000/api/login", {
                email: email,
                password: password,
            });
            //if the register is correct go to the main page and save the email in localstorage
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            userNow.setAuth({ token, userDetails });
            nav("/dashboard");
        } catch (err) {
            if (err.response.status === 401) {
                setErr(true);
            }
            setAccept(true);
        }
    }

    return (
        <div>
            <Header />
            <div className="SignUp login" >
                <div className="register">
                    <form
                        onSubmit={Submit}
                        className="SignUpForm"
                    >
                        {/* Email :  */}
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email..."
                            value={email || ""}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        {/* Password :  */}
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password..."
                            value={password || ""}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {password.length < 8 && accept && (
                            <p className="error">Password must be more than 8 Char</p>
                        )}

                        <div style={{ textAlign: "center" }}>
                            <button type="submit">Login</button>
                        </div>
                        {accept && Err && (
                            <p className="error">Wrong Password or Email</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
