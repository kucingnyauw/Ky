import React from "react";
import { Link } from "react-router-dom";
import "./styles/footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			
			<div className="footer-credits">
				<div className="footer-credits-text">
				  <div className="first">
				  © 2024 Rifky Firmansyah.
				  </div>
				  <div className="second">
				  All Rights Reserved.
				  </div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
