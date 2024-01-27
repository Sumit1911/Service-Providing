import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import {useAuth} from "../store/auth";


export const About = () => {
    //getting username from user data
    const {user} = useAuth();

    return <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Welcome, {user? `${user.username} to our website`: "to our website"}</p>
                        <h1>Why Choose Us?</h1>
                        <p>TechSumit is your go-to destination for comprehensive coverage of full-stack website development, specializing in the MERN stack. We delve into a myriad of web development languages, including HTML, CSS, JavaScript, React, Node, Express, MongoDB, and Next.js, aiming to make these subjects accessible to everyone, regardless of their level of expertise.</p>
                        <p>Dedicated to excellence, TechSumit has built a strong following, positioning itself as a reliable service provider in website development and programming. Our meticulously crafted services aim to elevate client experiences.
                        </p>
                        <p>Founder Sumit, armed with a Undergraduate degree in Computer Science, enriches TechSumit with extensive experience. His fervor for technology and education is reflected in the high-quality freelancing services we provide in full-stack development and designing. 
                        </p>
                        <p>Thank you for choosing TechSumit for your freelancing needs. We are committed to provide best service in full-stack website development and designing. Please feel free to explore the range of services we offer, and if you have any questions or feedback, do not hesitate to reach out to us.
                        </p>
                        <div className="btn btn-group">
                            <NavLink to="/contact">
                                <button>Connect Now</button>
                            </NavLink>
                            <button className="btn secondary-btn">learn more</button>
                        </div>
                    </div>
                    <div className="about-image sumit">
                        <img src="/images/sumit.jpg " alt="about" width="400" height="400"/>
                    </div>
                </div>
            </section>

            <Analytics />
        </main>
    </>
}
