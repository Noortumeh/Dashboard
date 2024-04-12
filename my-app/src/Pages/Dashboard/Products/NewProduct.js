import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Wibsite/Context/UserContext";

export default function NewProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();

    const context = useContext(User);
    const token = context.auth.token;

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);
            //send data
            let res = await axios.post("http://127.0.0.1:8000/api/product/create",
                formData,
            {
                headers:{
                    Authorization : "Bearer " + token,
                }
            });
            //if the register is correct go to the main page and save the email in localstorage
            nav("/dashboard/products");
        } catch (err) {
            setAccept(true);
        }
    }

    return (
        
            <div className="SignUp" >
                <div>
                    <form
                        onSubmit={Submit}
                        className="SignUpForm"
                    >
                        {/* Title :  */}
                        <label htmlFor="name">Title:</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Title..."
                            value={title || ""}
                            autoComplete="off"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {title.length < 1 && accept && (
                            <p className="error">Title must be more than 2 Char</p>
                        )}  
                        {/* Description :  */}
                        <label htmlFor="desc">Description: </label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Description..."
                            value={description || ""}
                            autoComplete="off"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {/* {accept && emailError === 422 && (
                            <p className="error">Email is already been taken</p>
                        )} */}

                        {/* Image :  */}
                        <label htmlFor="image">Image:</label>
                        <input
                            id="image"
                            type="file"
                            placeholder="Image..."
                            onChange={(e) => setImage(e.target.files.item(0))}
                        />
                        {/* {password.length < 8 && accept && (
                            <p className="error">Password must be more than 8 Char</p>
                        )} */}
                        <div style={{ textAlign: "center" }}>
                            <button type="submit">Create Product</button>
                        </div>
                    </form>
                </div>
            </div>
        
    );
}
