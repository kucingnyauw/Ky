import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projects.css";

const Projects = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">

					<div className="projects-container">
						<div className="title projects-title">
							Projects Enhancing User Experiences and Mobile Solutions
						</div>

						<div className="subtitle projects-subtitle">
							Throughout my career, I have had the opportunity to develop a wide range of mobile applications and UI/UX designs, many of which I have made open-source. These projects reflect my commitment to quality, innovation, and the continuous pursuit of excellence in software development. I firmly believe that sharing knowledge and collaborating with others is crucial for personal and professional growth.

							I encourage you to explore my work, review the code, and offer any feedback or suggestions you may have. Your insights, whether they highlight areas of improvement or spark new ideas, are invaluable to me. I am always eager to learn from others and to refine my craft based on constructive criticism.

							In addition to my development work, I take great pleasure in sharing my knowledge with the community. Whether through mentorship, open-source contributions, or collaborative projects, I am passionate about helping others grow and succeed. I believe that by fostering a culture of learning and open exchange of ideas, we can all advance together in the ever-evolving world of technology.
						</div>

						<div className="projects-list">
							<AllProjects />
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;
