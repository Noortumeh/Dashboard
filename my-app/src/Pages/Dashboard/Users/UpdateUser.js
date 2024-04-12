import { useContext, useEffect, useState } from "react";
import { User } from "../../Wibsite/Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const nav = useNavigate();

    const context = useContext(User);
    const token = context.auth.token;

  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{
        headers:{
            Authorization: "Bearer " + token,
        },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
        //send data
        let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
        },{
            headers:{
                Authorization : "Bearer " + token,
            }
        });
        //if the register is correct go to the main page and save the email in localstorage
        nav("/dashboard/users");
    } catch (err) {
        if (err.response.status === 422) {
            setEmailError(true);
        }
        setAccept(true);
    }
}
  return (
    <>
      <h1>Update User</h1>
      <div>
        <div className="SignUp login">
          <div className="register">
            <form onSubmit={Submit} className="SignUpForm">
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
                <button type="submit">Update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
