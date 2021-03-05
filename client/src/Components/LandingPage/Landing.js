import React from "react";
import { Flex, Heading, Button, Box } from "@chakra-ui/react";
import "./styles.css";
import "./assets/css/main.css";
import "./assets/css/fontawesome-all.min.css";
import DaVinci from "./assets/DaVinci.jpg";
import PhyCryp from "./assets/invertedposter.png";
import LogInvert from "./assets/logo_invert.png";
import ElanLogo from "./assets/elan-row-white-flat.png";

const LandingPage = (props) => {
  return (
    <div>
      <section id="banner">
        <div class="lcontent">
          <header>
            <div className="l te">
              <img className="te" src={ElanLogo} style={{ height: "3.5em" }} />
            </div>
            <h2 className="l">
              <code className="l">Cryptex 2021</code>
            </h2>
            <p className="l">
              Welcome to Cryptex 2021!
              <br /> Coming soon on 5th March 2021 at 6:00 PM IST.
            </p>
            <a
              className="button primary landing"
              onClick={props.loginWithRedirect}
            >
              {" "}
              Dive In!
            </a>
          </header>
          <span class="image">
            <img src={LogInvert} alt="Cryptex Logo" />
          </span>
        </div>
        <a href="#one" class="goto-next scrolly">
          Next
        </a>
      </section>

      <section
        id="one"
        className="lspotlight style1 bottom"
        style={{ backgroundImage: { PhyCryp } }}
      >
        <span className="image fit main">
          <img src={PhyCryp} alt="Phyiscal Cryptex" />
        </span>
        <div className="lcontent">
          <div className="lcontainer">
            <div className="lrow">
              <div className="lcol-12 lcol-12-medium">
                <header>
                  <h2 className="l te">Cryptex 2021</h2>
                </header>
              </div>
              <div className="lcol-12 lcol-12-medium">
                <header>
                  {/*<Heading size="lg" className="l te">Title Sponsor</Heading>*/}
                </header>
                <p>&nbsp;</p>
              </div>

              <div className="lcol-12 lcol-12-medium">
                <header>
                  <h3 className="l te">Coordinators</h3>
                </header>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Soumi Chakraborty</p>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Saurav Madhusoodanan</p>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Srinikitha Bhagvati</p>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Nikhil Pallamreddy</p>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Spandan More</p>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Vishnu VS</p>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Rachit Keerti Das</p>
              </div>
              <div className="lcol-3 lcol-4-medium lcol-6-small te x">
                <p className="l">Shreyas Havaldar</p>
              </div>
            </div>
          </div>
        </div>
        <a href="#two" className="goto-next scrolly">
          Next
        </a>
      </section>
      <section id="two" className="lspotlight style2 right">
        <span className="image fit main">
          <img src={DaVinci} alt="Matryoshka Doll" />
        </span>
        <div className="lcontent">
          <header>
            <h2 className="l">How do I solve the questions?</h2>
            <p className="l">Just common sense should do.</p>
          </header>
          <p className="l">
            All you need is a good search engine and a working mind to connect
            the reults. However, as with all things in life, Cryptex isn't easy
            either. What it definitely is, is fun. We promise that you shall not
            be able to solve Cryptex before 54 hours. Best of Luck :)
          </p>

          <ul className="actions">
            <li>
              <a href="countdown.html" className="button">
                DIVE IN!
              </a>
            </li>
          </ul>
        </div>
        <a href="#three" className="goto-next scrolly">
          Next
        </a>
      </section>
      <section id="three" className="wrapper style1 special fade-up">
        <div className="lcontainer">
          <header className="major">
            <h2 className="l">
              <code className="l">Legacy of Cryptex</code>
            </h2>
            <p></p>
          </header>
          <div className="box alt">
            <Box className="lrow gtr-uniform">
              <section className="lcol-4 lcol-6-medium lcol-12-xsmall">
                <span className="icon solid alt major fa-chart-area"></span>
                <h3 className="l">5 years</h3>
                <p className="l">
                  5 years of Cryptex. Carefully curated questions made by a team
                  of experienced question makers.
                </p>
              </section>
              <section className="lcol-4 lcol-6-medium lcol-12-xsmall">
                <span className="icon solid alt major fa-user"></span>
                <h3 className="l">5000+ Participants</h3>
                <p className="l">
                  Sometimes, the proof of the pudding is the eating itself.
                </p>
              </section>
              <section className="lcol-4 lcol-6-medium lcol-12-xsmall">
                <span className="icon solid alt major fa-flask"></span>
                <h3 className="l">Brilliant Questions</h3>
                <p className="l">
                  Questions that require no apriori knowledge. No hints. Just
                  Googling and common sense is sufficient.
                </p>
              </section>
              <section className="lcol-4 lcol-6-medium lcol-12-xsmall">
                <span className="icon solid alt major fa-paper-plane"></span>
                <h3 className="l">The Experience</h3>
                <p className="l">
                  Whether you solve it or not, one thing's guaranteed: a
                  brain-wracking experience.
                </p>
              </section>
              <section className="lcol-4 lcol-6-medium lcol-12-xsmall">
                <span className="icon solid alt major fa-trophy"></span>
                <h3 className="l">The Challenge</h3>
                <p className="l">
                  Cryptex has had the tradition of being a meticulously designed
                  and thoroughly enjoyable OTH. We bet this tradition shall be
                  upheld for posterity.
                </p>
              </section>
              <section className="lcol-4 lcol-6-medium lcol-12-xsmall">
                <span className="icon solid alt major fa-heart"></span>
                <h3 h3 className="l">
                  You
                </h3>
                <p className="l">
                  It is people like you who make Cryptex a success. Go forth and
                  conquer.
                </p>
              </section>
            </Box>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
