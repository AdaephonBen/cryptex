import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import "./styles.css";

const END_TIME = process.env.REACT_APP_END_TIME;
const end_time = Date.parse(END_TIME);

function secondsToTime(secs) {
  let hours = Math.floor(secs / (60 * 60));
  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);
  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.floor(divisor_for_seconds);
  let obj = { h: hours, m: minutes, s: seconds };
  return obj;
}

const Countdown = () => {
  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState((end_time - Date.now()) / 1000);

  const countdown = () => {
    setSeconds((seconds) => seconds - 1);
  };

  useEffect(() => {
    const timer = setInterval(countdown, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTime(secondsToTime(seconds));
  }, [seconds]);

  return (
    <Box className="countdown" fontSize={{ base: "3rem", md: "3.5rem" }}>
      {time.h}:{time.m}:{time.s}
    </Box>
  );
};

export default Countdown;
