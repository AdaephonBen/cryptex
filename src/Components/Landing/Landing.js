import React from "react";
import "./styles";
import DaVinci from "./DaVinci.jpg";
import Doll from "./Doll.webp";
import Logo from "./Logo.png";
import Russian from "./Russian.jpg";

class Landing extends React.Component {
  render() {
    return <section id="react-container is-preload landing">

		<div id="page-wrapper">

				<header id="header">
					<h1 id="logo"><a href="index.html">Cryptex</a></h1>
					<nav id="nav">
						<ul>
							<li><a href="index.html">About</a>
							<ul>
									<li><a href="left-sidebar.html">Home</a></li>
									
									<li><a href="no-sidebar.html">The Team</a></li>
								</ul></li>
							<li>
								<a href="#">Leaderboard</a>
								
							</li>
							<li><a href="elements.html">Rules</a></li>
							<li><a href="#" class="button primary">DIVE IN!</a></li>
						</ul>
					</nav>
				</header>

		
				<section id="banner">
					<div className="content">
						<header>
							<h2><code>Cryptex 2020</code></h2>
							<p>
								Got the guts to solve it? Only if you had the brains.<br />
								Still up for it? Go Dive in to sad realizations.
							</p>
						</header>
						<span className="image">::before<img src={Logo} alt="Infero Logo" /></span>
					</div>
					<a href="#one" className="goto-next scrolly">Next</a>
				</section>

			
				<section id="one" className="spotlight style1 bottom">
					<span className="image fit main">::before<img src={Doll} alt="Phyiscal Cryptex" /></span>
					<div class="content">
						<div class="container">
							<div class="row">
								<div class="col-4 col-12-medium">
									<header>
										<h2>Cryptex 2020</h2>
										<p>What is it?</p>
									</header>
								</div>
								<div class="col-4 col-12-medium">
									<p>
									Cryptex is an Online Treasure Hunt created and conducted by the students of IIT Hyderabad as a part of Litr, the Literary part of Elan & nVision, in association with Lambda, the development club of IIT Hyderabad, under Elan and nVision, IIT Hyderabad’s annual techno-cultural fest. 
								</p>
								</div>
								<div class="col-4 col-12-medium">
									<p>It’s a 54-hour long event with carefully curated questions of increasing difficulty from levels 0 to 27. It is an OTH made out of well-designed puzzles requiring little-to-no prior technical knowledge.
									
									</p>
								</div>
							</div>
						</div>
					</div>
					<a href="#two" className="goto-next scrolly">Next</a>
				</section>

			
				<section id="two" className="spotlight style2 right" style={{backgroundPosition: 'center 176.4px', backgroundImage: 'url("http://images6.fanpop.com/image/photos/40800000/LE-kpop-40837822-268-330.gif")' }}>
					<span className="image fit main">::before<img src={DaVinci} alt="Matryoshka Doll" /></span>
					<div class="content">
						<header>
							<h2>How do I solve the questions?</h2>
							<p>Just pure common sense.</p>
						</header>
						<p>All you need is a good search engine and a working mind to connect the reults. However, as with all things in life, Cryptex ain't that easy either. What it definitely is, fun. We promise that you shall not be able to solve Cryptex within the 2 days. Still up for it? Go, have a look yourself. :)  </p>

						<ul className="actions">
							<li><a href="#" className="button">DIVE IN!</a></li>
						</ul>
					</div>
					<a href="#three" className="goto-next scrolly">Next</a>
				</section>
		
		
				<section id="four" className="wrapper style1 special fade-up">
					<div className="container">
						<header className="major">
							<h2><code>Legacy of Cryptex</code></h2>
							<p>How and why we became India's #1 Online Treasure Hunt</p>
						</header>
						<div className="box alt">
							<div className="row gtr-uniform">
								<section className="col-4 col-6-medium col-12-xsmall">
									<span className="icon solid alt major fa-chart-area"></span>
									<h3>4 years</h3>
									<p>4 years of Cryptex.Questions made by expreienced folks, not just any random guy.</p>
								</section>
								<section className="col-4 col-6-medium col-12-xsmall">
									<span className="icon solid alt major fa-comment"></span>
									<h3>5000+ Participants</h3>
									<p>Sometimes, the proof of the pudding is the eating itself.</p>
								</section>
								<section className="col-4 col-6-medium col-12-xsmall">
									<span className="icon solid alt major fa-flask"></span>
									<h3>Brilliant Questions</h3>
									<p>Questions that require no apriori knowledge.
										No hints. Just pure googling and common sense.
									</p>
								</section>
								<section className="col-4 col-6-medium col-12-xsmall">
									<span className="icon solid alt major fa-paper-plane"></span>
									<h3>The experience</h3>
									<p>Whether you solve it or not,one thing's guaranteed:a brain-wracking experience.</p>
								</section>
								<section className="col-4 col-6-medium col-12-xsmall">
									<span className="icon solid alt major fa-file"></span>
									<h3>The challenge</h3>
									<p>Cryptex has had the tradition of remaining unsolved.We bet this tradition shall be upheld for posterity</p>
								</section>
								<section className="col-4 col-6-medium col-12-xsmall">
									<span className="icon solid alt major fa-lock"></span>
									<h3>You</h3>
									<p>It is people like you who make cryptex a success.Go On, enjoy!</p>
								</section>
							</div>
						</div>
						<footer className="major">
						
						</footer>
					</div>
				</section>
				<section id="five" className="wrapper style2 special fade">
					<div className="container">
						<header>
							<h2>Love Cryptex?</h2>
							<p>Subscribe to the elan & nvision newsletter and enjoy more exciting events.</p>
						</header>
						<form method="post" action="#" className="cta">
							<div className="row gtr-uniform gtr-50">
								<div className="col-8 col-12-xsmall"><input type="email" name="email" id="email" placeholder="Your Email Address" /></div>
								<div className="col-4 col-12-xsmall"><input type="submit" value="Subscribe" class="fit primary" /></div>
							</div>
						</form>
					</div>
				</section>

				<footer id="footer">
					<ul class="icons">
						<li><a href="#" className="icon brands alt fa-twitter"><span className="label">Twitter</span></a></li>
						<li><a href="#" className="icon brands alt fa-facebook-f"><span className="label">Facebook</span></a></li>
						<li><a href="#" className="icon brands alt fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
						<li><a href="#" className="icon brands alt fa-instagram"><span className="label">Instagram</span></a></li>
						<li><a href="#" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
						<li><a href="#" className="icon solid alt fa-envelope"><span className="label">Email</span></a></li>
					</ul>
					<ul className="copyright">
						<li>&copy;Elan & Nvision 2020. All rights reserved.</li><li>Design: <a href="http://html5up.net">Lambda, IIT Hyderabad</a></li>
					</ul>
				</footer>

		</div>		
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/jquery.dropotron.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>

	</section>;
  }
}

export default Landing;
