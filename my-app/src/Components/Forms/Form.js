import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { User } from "../../Pages/Wibsite/Context/UserContext";

export default function Forms(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [emailError, setEmailError] = useState(false);

  const userNow = useContext(User);
  console.log(userNow);
  const styleRegister = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  };
  const registerForm = {
    boxShadow: "0px 2px 15px rgb(0 0 0 / 10%)",
    width: "400px",
  };
  const buttonstyle = {
    width: "100%",
  };

  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);

  async function Submit(e) {
    e.preventDefault();
    try {
      //send data
      let res = await axios.post(`http://127.0.0.1:8000/api/${props.endPoint}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        }
      );
      //if the register is correct go to the main page and save the email in localstorage
      const token = res.data.data.token;
      const userDetails = res.data.data.user;
      userNow.setAuth({token, userDetails});
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  return (
    <div className="SignUp" style={props.styleRegister && styleRegister}>
      <form
        onSubmit={Submit}
        className="SignUpForm"
        style={props.registerForm && registerForm}
      >
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Name..."
          value={name || ""}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        {/* {name==="" && accept && <p className="error">Username is Required</p>} */}
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="Email..."
          value={email || ""}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {accept && emailError === 422 && <p className="error">Email is already been taken</p>} */}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Password..."
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* {password.length < 8 && accept && <p className="error">Password must be more than 8 Char</p>} */}

        <label htmlFor="repeat">Repeat Password:</label>
        <input
          id="repeat"
          type="password"
          placeholder="Repeat Password..."
          value={passwordR || ""}
          onChange={(e) => setPasswordR(e.target.value)}
        />

        {/* {password != passwordR && accept&& <p className="error">Password dose not match</p>} */}

        <div style={{ textAlign: "center" }}>
          <button type="submit" style={props.buttonstyle && buttonstyle}>
            {props.button}
          </button>
        </div>
      </form>
    </div>
  );
}
