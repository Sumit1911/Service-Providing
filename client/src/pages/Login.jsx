import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";
export const Login = () => {

    const [user, setUser] = useState({
        email:"",
        password:""
    });

    //navigating
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    //handling the input values
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
        });
    };
    
    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);

        try {
            const response = await fetch(URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
            // console.log(JSON.stringify(user));

            // console.log("login form : ", response);
            const responseData = await response.json();
            // console.log("res from server", responseData);

            if (response.ok) {
                // const responseData = await response.json();
                // console.log("res from server", responseData);
                storeTokenInLS(responseData.token);
                // localStorage.setItem("token", responseData.token);
                setUser({ email: "", password: "" });
                toast.success("Login Successful");
                navigate("/");
              } else {
                toast.error(responseData.extraDetails ? responseData.extraDetails: responseData.message);
                // console.log("error inside response :", "error");
              }
            
        } catch (error) {
            console.error("login", error);
        }

    };

    return <>
      <section>
        <main>
            <div className="section-login">
                <div className="container grid grid-two-cols">
                    <div className="login-image">
                        <img 
                            src="/images/login.png" 
                            alt="fill the login page" 
                            width="400"
                            height="400"
                        />
                    </div>
                    {/* let tackle login form */}
                    <div className="login-form">
                        <h1 className="main-heading mb-3">
                            Login form
                        </h1>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">email</label>
                                <input
                                 type="email" 
                                 name="email"
                                 placeholder="email"
                                 id="email"
                                 required
                                 autoComplete="off"
                                 value={user.email}
                                 onChange={handleInput}
                                 />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input
                                 type="password" 
                                 name="password"
                                 placeholder="password"
                                 id="password"
                                 required
                                 autoComplete="off"
                                 value={user.password}
                                 onChange={handleInput}
                                 />
                            </div>

                            <br />
                            <button type="submit" className="btn btn-submit">Login Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
      </section>
    </>
}
