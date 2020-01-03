import React, { useState, useEffect, useCallback } from "react";

type Props = {
  getTime: (time: string) => void;
};

const Time = ({ getTime }: Props) => {
  const [time, setTime] = useState(new Date(2020, 0, 1, 0, 0, 0, 0));

  const setClock = useCallback(() => {
    const newTime = new Date(time);
    newTime.setSeconds(newTime.getSeconds() + 1);
    setTime(newTime);
  }, [time]);

  useEffect(() => {
    const timerID = setInterval(() => setClock(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, [setClock]);
  return (
    <div>
      time: {time.toLocaleTimeString("en-GB")}
      {getTime(time.toLocaleTimeString("en-GB"))}
    </div>
  );
};

export default Time;
