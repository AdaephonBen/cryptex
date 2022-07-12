import React, { useEffect, useState, useRef } from "react";
import { Flex, Heading, Stack, Image, Text, Button , Link} from "@chakra-ui/react";
import { callApi } from "../../api/auth";
import "./styles.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../LoadingPage/Loading";
import * as Tone from "tone";
import king from "../Question/cards/king.png";
import queen from "../Question/cards/queen.png";
import jack from "../Question/cards/jack.png";
import ten from "../Question/cards/ten.png";
import ace from "../Question/cards/ace.png";

const API_URL = process.env.REACT_APP_API_URL;

const LevelDownload = (props) => {
  const { question } = props;
  const { url } = question.question;
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="0px"
    >
      <Flex justifyContent="center" minHeight="200px">
        <Link href={url} download>
          Click me!
        </Link>
      </Flex>
    </Flex>
  );
};

const LevelLink = (props) => {
  const { question } = props;
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="0px"
    >
      <Text marginBlock="10px">
        {" "}
        Question Number: {question.question_number}{" "}
      </Text>

      <Flex justifyContent="center" flex="1" minHeight="200px">
        <div style={{ position: "relative", width: "600px", height: "400px" }}>
          <img
            style={{
              position: "absolute",
              width: "600px",
              height: "400px",
            }}
            src={question.question.url}
          />
          <a
            target="_blank"
            href={question.question.link}
            style={{
              top: "78%",
              left: "79%",
              width: "3%",
              height: "3%",
              display: "block",
              position: "absolute",
            }}
          ></a>
        </div>
      </Flex>
    </Flex>
  );
};

const LevelCards = (props) => {
  const { question } = props;
  const { code } = question.question;
  const canvasRef = useRef(null);

  useEffect(() => {
    var dpr = window.devicePixelRatio;

    var canvas = canvasRef.current;
    // canvas.width = canvasDiv.current.offsetWidth * dpr;
    // canvas.height = canvasDiv.current.offsetHeight * dpr;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = "70%";
    canvas.style.height = "70%";

    var context = canvas.getContext("2d");

    var id = 52;

    var width = 96;
    var height = 96;

    var cwidth = width * Math.round(dpr);
    var cheight = height * Math.round(dpr);

    var cwidthhalf = cwidth / 2;
    var cheighthalf = cheight / 2;

    var particles = [];
    var count = 0;
    function Particle(currImg, x, y, sx, sy) {
      if (sx === 0) sx = 2;

      this.update = function () {
        x += sx;
        y += sy;

        if (x < -cwidthhalf || x > canvas.width + cwidthhalf) {
          var index = particles.indexOf(this);
          particles.splice(index, 1);

          return false;
        }

        if (y > canvas.height - cheighthalf) {
          y = canvas.height - cheighthalf;
          sy = -sy * 0.85;
        }

        sy += 0.98;

        context.drawImage(
          currImg,
          Math.floor(x - cwidthhalf),
          Math.floor(y - cheighthalf),
          cwidth * 2,
          cheight * 2
        );

        return true;
      };
    }

    var kingImg = document.createElement("img");
    var queenImg = document.createElement("img");
    var tenImg = document.createElement("img");
    var jackImg = document.createElement("img");
    var aceImg = document.createElement("img");

    kingImg.src = king;
    queenImg.src = queen;
    tenImg.src = ten;
    jackImg.src = jack;
    aceImg.src = ace;

    function throwCard(x, y) {
      var currImg;
      if (count == 0) {
        currImg = tenImg;
        count++;
      } else if (count == 1) {
        currImg = jackImg;
        count++;
      } else if (count == 2) {
        currImg = queenImg;
        count++;
      } else if (count == 3) {
        currImg = kingImg;
        count++;
      } else if (count == 4) {
        currImg = aceImg;
        count++;
      } else {
        count = 0;
        particles = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      var particle = new Particle(
        currImg,
        x,
        y,
        Math.floor(Math.random() * 6 - 3) * 2,
        -Math.random() * 16
      );
      particles.push(particle);
    }

    document.addEventListener("pointerdown", function (event) {
      throwCard(event.clientX * dpr, event.clientY * dpr);
    });

    function animate() {
      var i = 0,
        l = particles.length;

      while (i < l) {
        particles[i].update() ? i++ : l--;
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="0px"
    >
      <Text marginBlock="10px">
        {" "}
        Question Number: {question.question_number}{" "}
      </Text>

      <canvas ref={canvasRef}></canvas>
      <Text>{code}</Text>
    </Flex>
  );
};

const LevelGrid = (props) => {
  const { question } = props;
  const [isVisible, setIsVisible] = useState(false);
  const { quote } = question.question;
  const [synth, setSynth] = useState(null);
  const playNote = (note) => {
    if (synth) {
      synth.triggerAttackRelease(note, 0.5);
      console.log("Hello");
    }
  };
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="0px"
    >
      <Flex
        direction="column"
        justifyContent="center"
        flex="1"
        minHeight="200px"
        marginTop="5px"
      >
        <Text marginBlock="10px">
          {" "}
          Question Number: {question.question_number}{" "}
        </Text>

        <Button
          size="md"
          style={{ display: isVisible ? "none" : "block" }}
          colorScheme="blue"
          padding="10px"
          onClick={async () => {
            setIsVisible(true);
            await Tone.start();
            setSynth(new Tone.PolySynth().toDestination());
          }}
        >
          Show Question
        </Button>
        <table
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: isVisible ? "block" : "none",
          }}
          className="borders"
        >
          <tr className="borders">
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr className="borders">
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["A4", "C#4", "E4"])}
            ></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["G4", "B4", "D4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["F4", "A4", "C4"])}
            ></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["D4", "F#4", "A4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td className="borders"></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td
              className="borders"
              onMouseOver={() => playNote(["C4", "E4", "G4"])}
            ></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
            <td className="borders"></td>
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </table>
      </Flex>
      <Flex flex="1" minHeight="0px" marginTop="10px">
        <Text>{quote}</Text>
      </Flex>
    </Flex>
  );
};

const LevelImage = (props) => {
  const { question } = props;
  const { url } = question.question;
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        justifyContent="center"
        flex="1"
        minHeight="200px"
      >
        <Text marginBlock="10px">
          {" "}
          Question Number: {question.question_number}{" "}
        </Text>
        <Image src={url} minHeight="200px" maxHeight="400px" />
      </Flex>
    </Flex>
  );
};

const PreviousQuestion = (question) => {
  let currentLevel;
  if (question.question_type === 1) {
    currentLevel = <LevelImage question={question} />;
  } else if (question.question_type === 2) {
    currentLevel = <LevelGrid question={question} />;
  } else if (question.question_type === 3) {
    currentLevel = <LevelImage question={question} />;
  } else if (question.question_type === 4) {
    currentLevel = <LevelCards question={question} />;
  } else if (question.question_type === 5) {
    currentLevel = <LevelLink question={question} />;
  } else if (question.question_type === 6) {
    currentLevel = <LevelDownload question={question} />;
  }

  return (
    <Flex direction="column" border="1px solid white" padding="10px">
      {currentLevel}
    </Flex>
  );
};

const PreviousQuestions = (props) => {
  const { getAccessTokenSilently } = props;
  const [previous, setPrevious] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "read:current_user update:current_user_metadata",
      });
      const res = await callApi(accessToken, `${API_URL}question/previous`, {
        fetchOptions: {
          method: "GET",
        },
      });
      console.log(res);
      if (res === null) {
        // history.push("/register");
      } else {
        setPrevious(res);
      }
    };
    getQuestions();
  }, []);
  return (
    <div className="landing">
      <Flex
        align="center"
        justifyContent="space-between"
        className="center-box"
        flexDirection="column"
      >
        <Heading className="title">Previous Questions</Heading>
        <Stack spacing={8} minWidth="80vw">
          {previous.map((question) => PreviousQuestion(question))}
        </Stack>
      </Flex>
    </div>
  );
};

export default withAuthenticationRequired(PreviousQuestions, {
  onRedirecting: () => <Loading />,
});
