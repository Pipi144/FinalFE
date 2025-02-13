import { useGamePlayContext } from "@/Providers/GamePlayProvider";
import { Variants } from "framer-motion";
import React, { useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import AnimatedSpan from "../AnimatedComponents/AnimatedSpan";
import { useRouter } from "next/navigation";

const GameTimer = () => {
  const { timeCountDown, setTimeCountDown, game, attempt, resetGamePlay } =
    useGamePlayContext();
  const router = useRouter();

  const percentage =
    game.timeLimit && timeCountDown
      ? (timeCountDown / game.timeLimit) * 100
      : 0;
  const minutes = timeCountDown ? `${Math.floor(timeCountDown / 60)}` : "00";
  const seconds = timeCountDown
    ? `${String(timeCountDown % 60).padStart(2, "0")}`
    : "00";

  const textAnimatedVariants: Variants = {
    initial: {
      color: "#000",
    },
    timesUp: {
      color: ["#000", "#f00", "#000"],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeCountDown((prev) => (prev ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeCountDown]);

  // if user is in the middle of the game and tries to close the tab
  // we want to prevent the user from closing the tab

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      event.returnValue =
        "You haven't done the game, Are you sure you want to leave?";
    };
    const handleUnload = (event: Event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  // times up => navigate to the result page
  useEffect(() => {
    if (timeCountDown === 0) {
      router.replace(`/game/${game.gameId}/${attempt?.attemptId}`);
      resetGamePlay();
    }
  }, [timeCountDown]);

  if (!timeCountDown) return null;
  return (
    <div className="w-14 h-14 self-center">
      {game.timeLimit && (
        <CircularProgressbarWithChildren
          value={percentage}
          styles={{
            path: {
              stroke: "#22D3EE",
              strokeWidth: "6px", // Thickness of the path
              strokeLinecap: "round", // Rounded ends for the progress path
            },
            trail: {
              stroke: "black", // Color of the trail
              strokeWidth: "8px", // Thickness of the trail
              strokeLinecap: "round", // Rounded ends for the trail
            },
            root: {
              padding: 4,
            },
          }}
        >
          <AnimatedSpan
            className=" font-concert text-xs font-medium"
            animate={percentage <= 15 && percentage > 0 ? "timesUp" : "initial"}
            variants={textAnimatedVariants}
          >
            {minutes}:{seconds}
          </AnimatedSpan>
        </CircularProgressbarWithChildren>
      )}
    </div>
  );
};

export default GameTimer;
