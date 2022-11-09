import React from "react";
import "./footer.style.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li>
                <a href="/">Company</a>
              </li>
              <li>
                <a href="/">Service</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Application</h4>
            <ul>
              <li>
                <a href="/">At home</a>
              </li>
              <li>
                <a href="/">At school</a>
              </li>
              <li>
                <a href="/">At work</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Terms and conditions</h4>
            <ul>
              <li>
                <a href="/">
                  Terms and conditions
                </a>
              </li>
              <li>
                <a href="/">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow us</h4>
            <div className="footer-social-links">
              <a href="/">
                <FacebookIcon />
              </a>
              <a href="/">
                <TwitterIcon />
              </a>
              <a href="/">
                <InstagramIcon />
              </a>
              <a href="/">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
