import Header from "../../../Components/Header";
import { useContext, useState } from "react";
import axios from "axios";
import "./login.css"   ;
import { User } from "./../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);
        
    //* Store Cookie
    const cookie = new Cookies();

    const userNow = useContext(User);
    const nav = useNavigate();

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            //send data
            let res = await axios.post("http://127.0.0.1:8000/api/register", {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordR,
            });
            //if the register is correct go to the main page and save the email in localstorage
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            userNow.setAuth({ token, userDetails });
            nav("/dashboard");
        } catch (err) {
            if (err.response.status === 422) {
                setEmailError(true);
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
                        {/* Name :  */}
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name..."
                            value={name || ""}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                        />
                        {name === "" && accept && (
                            <p className="error">Username is Required</p>
                        )}
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
                        {accept && emailError === 422 && (
                            <p className="error">Email is already been taken</p>
                        )}
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
                        {/* Repeat Password */}
                        <label htmlFor="repeat">Repeat Password:</label>
                        <input
                            id="repeat"
                            type="password"
                            placeholder="Repeat Password..."
                            value={passwordR || ""}
                            onChange={(e) => setPasswordR(e.target.value)}
                        />

                        {password !== passwordR && accept && (
                            <p className="error">Password dose not match</p>
                        )}

                        <div style={{ textAlign: "center" }}>
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
