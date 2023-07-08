import { useEffect, useState } from "react";

const useCountdown = (initialTime, interval = 1000) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime !== 0) {
          return prevTime - 1;
        }
        return prevTime;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return remainingTime;
};

export default useCountdown;
