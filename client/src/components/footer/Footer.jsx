import "./Footer.css";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return <>
      <div className="footer-container">
        <h2>© {currentYear} Sumit Kumar. All rights reserved.</h2>
      </div>
    </>
} 