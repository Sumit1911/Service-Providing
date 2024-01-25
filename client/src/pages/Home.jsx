import { Analytics } from "../components/Analytics"

export const Home = () => {
    return <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <h1>Lorem ipsum dolor sit.</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis blanditiis labore iste. Non, illum consectetur, nulla harum voluptatibus repellendus debitis quod magni ducimus minus</p>
                        <div className="btn btn-group">
                            <a href="/contact">
                               <button className="btn">connect now</button>
                            </a>
                            <a href="/services">
                               <button className="btn secondary-btn">learn more</button>
                            </a>
                        </div>
                    </div>
                    {/* hero-image */}
                    <div className="hero-image">
                        <img src="/images/home.png" alt="coding" width="400" height="400"/>
                    </div>
                </div>
            </section>
        </main>

        {/* 2nd section */}
        <Analytics />

        {/* 3rd section */}
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    {/* hero-image */}
                    <div className="hero-image">
                        <img src="/images/design.png" alt="coding" width="400" height="400"/>
                    </div>
                    <div className="hero-content">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <h1>Lorem ipsum dolor sit.</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis blanditiis labore iste. Non, illum consectetur, nulla harum voluptatibus repellendus debitis quod magni ducimus minus</p>
                        <div className="btn btn-group">
                            <a href="/contact">
                               <button className="btn">connect now</button>
                            </a>
                            <a href="/services">
                               <button className="btn secondary-btn">learn more</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>
}

