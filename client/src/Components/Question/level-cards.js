import React, { useEffect, useRef, useState } from 'react';
import {
	Flex,
	Image,
	FormControl,
	Input,
	Button,
	FormErrorMessage,
} from '@chakra-ui/react';
import { callApi } from '../../api/auth';

import king from './cards/king.png';
import queen from './cards/queen.png';
import jack from './cards/jack.png';
import ten from './cards/ten.png';
import ace from './cards/ace.png';

const API_URL = process.env.REACT_APP_API_URL;

const LevelCards = props => {
	const { question, getAccessTokenSilently, setAnswers } = props;
	const { url } = question.question;
	const [answer, setAnswer] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);
	const canvasRef = useRef(null);
	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 1000);
		const accessToken = await getAccessTokenSilently({
			audience: process.env.REACT_APP_AUDIENCE,
			scope: 'read:current_user update:current_user_metadata',
		});
		const res = await callApi(accessToken, `${API_URL}question`, {
			fetchOptions: {
				method: 'POST',
				body: JSON.stringify({
					answer: answer,
				}),
			},
		});
		if (res == 'correct-answer') {
			document.location.reload();
		} else {
			setIsIncorrect(true);
			setAnswers(old => [...old, answer]);
		}
	};

	useEffect(() => {
		var dpr = window.devicePixelRatio;

		var canvas = canvasRef.current;
		// canvas.width = canvasDiv.current.offsetWidth * dpr;
		// canvas.height = canvasDiv.current.offsetHeight * dpr;
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		canvas.style.width = '80%';
		canvas.style.height = '80%';

		var context = canvas.getContext('2d');

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

		var kingImg = document.createElement('img');
		var queenImg = document.createElement('img');
		var tenImg = document.createElement('img');
		var jackImg = document.createElement('img');
		var aceImg = document.createElement('img');

		kingImg.src = king;
		queenImg.src = queen;
		tenImg.src = ten;
		jackImg.src = jack;
		aceImg.src = ace;

		function throwCard(x, y) {

			var currImg;
			if(count==0) {
				currImg = tenImg;
				count++;
			} else if(count==1) {
				currImg = jackImg;
				count++;
			} else if(count==2) {
				currImg = queenImg;
				count++;
			} else if(count==3) {
				currImg = kingImg;
				count++;
			} else if(count==4) {
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

		document.addEventListener('pointerdown', function (event) {
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
			direction='column'
			width='100%'
			height='100%'
			alignItems='center'
			justifyContent='center'
			minHeight='0px'
		>
			<canvas ref={canvasRef}></canvas>
			<Flex flex='1' minHeight='0px'>
				<form
					style={{
						marginTop: '30px',
					}}
					onSubmit={handleSubmit}
				>
					<FormControl id='answer' isInvalid={isIncorrect}>
						<Input
							type='text'
							placeholder='Answer'
							value={answer}
							onChange={e => setAnswer(e.target.value)}
						/>
						<FormErrorMessage>Incorrect Answer :(</FormErrorMessage>
					</FormControl>
					<Button
						mt={4}
						colorScheme='teal'
						type='submit'
						width='100%'
						isLoading={isLoading}
						isDisabled={isLoading}
					>
						Submit
					</Button>
				</form>
			</Flex>
		</Flex>
	);
};

export default LevelCards;
