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
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus nisi eaque deserunt adipisci dicta, laborum facilis ab! Voluptatem repudiandae, dolorum molestiae voluptatum, consequuntur repellat reiciendis aliquid quibusdam quasi ducimus animi.</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis eveniet corrupti, nostrum labore blanditiis laboriosam vel consequatur quibusdam fuga, modi minus reiciendis minima, commodi velit laudantium et suscipit voluptas quidem.
                        </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum consectetur, suscipit laborum veniam labore error vel ad adipisci sed voluptas qui sint dolor obcaecati et veritatis, nam nostrum impedit deleniti.
                        </p>
                        <div className="btn btn-group">
                            <NavLink to="/contact">
                                <button>Connect Now</button>
                            </NavLink>
                            <button className="btn secondary-btn">learn more</button>
                        </div>
                    </div>
                    <div className="about-imgage">
                        <img src="/images/about.png " alt="about" width="400px" height="400px"/>
                    </div>
                </div>
            </section>

            <Analytics />
        </main>
    </>
}
