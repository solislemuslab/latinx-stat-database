import React from "react";
import Obfuscate from 'react-obfuscate';

const Footer = () => (
  <div className="footer-container">
    <div className="divider"/>
    <footer className="footer">
      <div>
        <p>
          Developed by the{" "}
          <a href="https://solislemuslab.github.io/" target="blank">
            Solís-Lemus Lab
          </a>
        </p>
      </div>
      <div>
        Contact Us: <Obfuscate email="widlisd@gmail.com"/>
      </div>
    </footer>
  </div>
);

export default Footer

