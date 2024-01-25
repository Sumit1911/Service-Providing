//in React, the "context" is a feature that allows you to share
//state data between components without explicitly passing the
//data through each level of the component tree. It's a way
//to manage global state or share data between components that 
//are not directly connected.

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [services, setServices] = useState([]);


    const storeTokenInLS = (serverToken) => { //now in other page we can pass this function(it become reusable function)
        setToken(serverToken); //recent change
        return localStorage.setItem("token", serverToken);
    }; 

    let isLoggedIn = !!token; //token value true then isLoggedIn will true, if token is not available then false;

    //tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };


   //JWT Authentication - to get the currently loggedIn user data
   const userAuthentication = async() => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/user", 
            {method: "GET",
            headers: {
                Authorization:`Bearer ${token}`,}
            });

            if(response.ok) {
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
            }
    } catch (error) {
        console.log("Error fetching use data");
    }
   }

   //to fetch the services data from the database
   const getServices = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/data/service", {
            method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
            }
    } catch (error) {
        console.log(`services fronted error: ${error}`);
    }
   }
   useEffect(() => {
    getServices();
    userAuthentication();
   }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, services}}>
            {children}
        </AuthContext.Provider>
    );
};
//the provider component is responsible for "providing" the data
//(context) to its descendants
//the value prop of the providers crucial because it' where you 
//define the data that you want to make accessible to components
//that consume the context

export const useAuth = () => { //custom hook (iske andar sara data hai)
    const authContextValue = useContext(AuthContext);
    if(!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}
//useAuth function now contains the value provided by the
//AuthContext.Provider higher up in the component tree.