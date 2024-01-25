import { useState } from "react";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5000/api/form/contact";

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  //getting data to the user
  const [userData, setUserData] = useState(true);
  const {user} = useAuth();

  if(userData && user) {
    setContact({
      username:user.username,
      email:user.email,
      message:"",
    })
    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
    //the setContact can also write as
    // setContact((prev) => ({
    //     ...prev,
    //     [name]:value,
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(contact);
    // console.log(contact);

    //sending contact data to database
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      console.log("response contact data: ", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log("res from server", responseData);
        // storeTokenInLS(responseData);
        setContact({ username: "", email: "", message: "" });
        // alert("message send succesfully");
      } else {
        console.log("error inside response ", "error");
      }
    } catch (error) {
      console.error("contact", error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        {/* contact page main */}
        <div className="container grid grid-two-cols">
          <div className="contact-image">
            <img
              src="/images/support.png"
              alt="support"
              width="400"
              height="400"
            />
          </div>
          {/* contact form content actual */}
          <section className="section-form">
            <form onClick={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  required
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  cols="30"
                  rows="6"
                  type="message"
                  name="message"
                  id="message"
                  required
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                ></textarea>
              </div>

              <div>
                <button type="submit" className="btn btn-submit">
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.831645071149!2d74.83851317606404!3d34.125059513881325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e185afae42b685%3A0xdf5ec84b1ac8f98d!2sNational%20Institute%20of%20Technology%20(NIT)%2C%20Srinagar!5e0!3m2!1sen!2sin!4v1705485351679!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
