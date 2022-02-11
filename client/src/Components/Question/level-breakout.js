import React, { useEffect, useRef, useState } from "react";

export default function LevelBreakout() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    
    const [lives, setLives] = useState(3);
    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.style.width = `1250px`;
        canvas.style.height = `500px`;
        canvas.width = 1250;
        canvas.height = 500;
        canvas.style.backgroundColor = "white";
        var paddleHeight = 30;
        var paddleWidth = 200;
        var paddleX = (canvas.width-paddleWidth) / 2;
        var paddleY = 0;
        const ballRadius = 10;
        var x = canvas.width/2;
        var y = canvas.height-paddleHeight-paddleY-ballRadius;
        var dx = 2;
        var dy = -2;

        

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight - paddleY, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
        
        var rightPressed = false;
        var leftPressed = false;

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
        }

        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px Arial";
            ctx.strokeText("Lives : " + lives, 1100, 50);
            drawBall();
            drawPaddle();
            
            if(x > canvas.width-ballRadius || x < ballRadius) {
                dx = -dx;
            }
            if(y  < ballRadius) {
                dy = -dy;
            }
            else if(y  > canvas.height-ballRadius-paddleY-paddleHeight && x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
            }
            else if(y > canvas.height-ballRadius){
                    setLives(lives-1);
                    clearInterval(interval); 
                    x = paddleX + paddleWidth/2;
                    y = canvas.height-paddleHeight-paddleY-ballRadius;
            }

            if(rightPressed) {
                paddleX += 7;
                if (paddleX + paddleWidth > canvas.width){
                    paddleX = canvas.width - paddleWidth;
                }
            }
            else if(leftPressed) {
                paddleX -= 7;
                if (paddleX < 0){
                    paddleX = 0;
                }
            }        
            
            x += dx;
            y += dy;

        }

        var interval = setInterval(draw, 10);
        ctxRef.current = ctx;
    }, []);



    return (
        <canvas ref = {canvasRef} style={{
            border : '10px solid #0095DD',
            alignSelf: 'center'
          }}>

        </canvas>
    );
}