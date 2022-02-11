import React, { useEffect, useRef, useState } from "react";

export default function LevelBreakout() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.style.width = `1250px`;
        canvas.style.height = `500px`;
        canvas.width = 1250;
        canvas.height = 500;
        canvas.style.backgroundColor = "black";
        var paddleHeight = 30;
        var paddleWidth = 200;
        var paddleX = (canvas.width-paddleWidth) / 2;
        var paddleY = 10;
        const ballRadius = 10;
        var x = canvas.width/2;
        var y = canvas.height-paddleHeight-paddleY-ballRadius;
        var dx = 2;
        var dy = -2;
        
        const mycolors = ["#D12229", "#F68A1E", "#FDE01A", "#007940", "#24408E", "#732982"];

        var brickRowCount = 4;
        var brickColumnCount = 6;
        var brickWidth = 180;
        var brickHeight = 50;
        var brickPadding = 10;
        var brickOffsetTop = 60;
        var brickOffsetLeft = 60;

        var score = 0;
        var lives = 3;

        var bricks = [];
        for (var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight - paddleY, paddleWidth, paddleHeight);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }
        function drawBricks() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    if (bricks[c][r].status == 1) {
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX + ballRadius, brickY + ballRadius, brickWidth - 2*ballRadius, brickHeight - 2*ballRadius);
                        ctx.fillStyle = mycolors[c];
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
            if(bricks[3][2].status == 0)
            {
                var brickX1 = (3 * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY1 = (2 * (brickHeight + brickPadding)) + brickOffsetTop;
                    ctx.font =  "25px Arial";
                    ctx.fillStyle = mycolors[3];
                    ctx.fillText("HAIL HYDRA!", brickX1 + 10, brickY1 + 32); //****************************
            }
            if(bricks[0][3].status == 0)
            {
                var brickX1 = (0 * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY1 = (3 * (brickHeight + brickPadding)) + brickOffsetTop;
                    ctx.font =  "25px Arial";
                    ctx.fillStyle = mycolors[0];
                    ctx.fillText("Top Secret", brickX1 + 10, brickY1 + 32); //****************************
            }
        }        
        
        function collisionDetection() {
            for(var c=0; c<brickColumnCount; c++) {
                for(var r=0; r<brickRowCount; r++) {
                    var b = bricks[c][r];
                    if(b.status == 1) {
                        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if(score == brickRowCount*brickColumnCount) {
                                drawBricks();
                                ctx.strokeText("Score: " + score, 50, 30);
                                // DO API REQUESTS HERE!! ////////////////////////////////////////////////
                                // document.location.reload();
                                clearInterval(interval); 
                            }
                        }
                    }
                }
            }
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
            else if(e.key == "Space") {

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
            ctx.strokeStyle = "white";
            ctx.strokeText("Lives : " + lives, 1100, 30);
            ctx.strokeText("Score: " + score, 50, 30);

            drawBall();
            drawPaddle();
            drawBricks();
            collisionDetection();
            
            if(x > canvas.width-ballRadius || x < ballRadius) {
                dx = -dx;
            }
            if(y  < ballRadius) {
                dy = -dy;
            }
            else if(y  > canvas.height-ballRadius-paddleY-paddleHeight && x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
            }
            else if(y < canvas.height - paddleY && y > canvas.height - paddleY - paddleHeight && x + ballRadius > paddleX && x < paddleX)
            {
                dx = -dx;
            }
            else if(y < canvas.height - paddleY && y > canvas.height - paddleY - paddleHeight && x - ballRadius < paddleX + paddleWidth && x > paddleX + paddleWidth)
            {
                dx = -dx;
            }
            else if(y > canvas.height-ballRadius){
                lives--;
                if(!lives) {
                    alert("You couldn't win breakout... Sheesh!");
                    document.location.reload();
                    clearInterval(interval);
                }
                else
                {
                    x = paddleX + paddleWidth/2;
                    y = canvas.height-paddleHeight-paddleY-ballRadius;
                    dx = 2;
                    dy = -2;
            }
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