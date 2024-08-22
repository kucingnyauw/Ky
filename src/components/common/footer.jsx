import React from "react";
import { Link } from "react-router-dom";
import "./styles/footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			
			<div className="footer-credits">
				<div className="footer-credits-text">
				<p className="footer-title">Copyright © {new Date().getFullYear()} - All right reserved by Owner</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
