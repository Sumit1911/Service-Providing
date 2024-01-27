import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

const URL = "http://localhost:5000/api/auth/register";

export const Register = () => {

    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    //handling the input values
    const handleInput = (e) => {  //e:event
        let name = e.target.name; 
        let value = e.target.value;

        setUser({
            ...user, //to store previous data using spread operator
            [name]: value,  //to make it dynamically because we have different like username, email, ....
        });
    };

    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  //to prevent the page refresh behabiour
        console.log(user);
        
        try {
            const response = await fetch(URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
            // console.log("response data : ", response);
            const responseData = await response.json();
            console.log("res from server", responseData.message);
            if (response.ok) {
            //   const responseData = await response.json();
            //   console.log("res from server", responseData);
              storeTokenInLS(responseData);
              setUser({ username: "", email: "", phone: "", password: "" });
            //   toast.success("Registration Successful");
              navigate("/");
            } else {
            //   console.log("error inside response ", "error");
            toast.error(responseData.extraDetails ? responseData.extraDetails: responseData.message);
            }
          } catch (error) {
            console.error("register", error);
          }
    };

    return <>
      <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    <div className="registration-image">
                        <img 
                            src="/images/register.png" 
                            alt="fill the registration form here"
                            width="400" 
                            height="400"
                        />
                    </div>
                    {/* let tackle registration form */}
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">registration form</h1>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="username"
                                    id="username"
                                    required
                                    autoComplete="off"
                                    value={user.username}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="enter your email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">phone</label>
                                <input 
                                    type="number" 
                                    name="phone" 
                                    placeholder="phone"
                                    id="phone"
                                    required
                                    autoComplete="off"
                                    value={user.phone}
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
                            <button type="submit" className="btn btn-submit">
                                Register Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
      </section>
    </>
}

