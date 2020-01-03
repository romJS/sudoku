import React, { useState, useEffect, useCallback } from "react";

type Props = {
  getTime: (time: string) => void;
};

const Time = ({ getTime }: Props) => {
  const [date] = useState(new Date(2020, 0, 1, 0, 0, 0, 0));
  const [time, setTime] = useState<string>("");

  const getClock = useCallback(() => {
    date.setSeconds(date.getSeconds() + 1);
    return date.toLocaleTimeString("en-GB");
  }, [date]);

  const setClock = useCallback(() => {
    setTime(getClock());
  }, [getClock]);

  useEffect(() => {
    const timerID = setInterval(() => setClock(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, [setClock, time]);
  return (
    <div>
      time: {time}
      {getTime(time)}
    </div>
  );
};

export default Time;
