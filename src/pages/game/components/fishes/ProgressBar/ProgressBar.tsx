import { TFish } from "@/types/game";
import { FC } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

type ProgressBarProps = {
  fish: TFish;
};

export const ProgressBar: FC<ProgressBarProps> = ({ fish }) => {
  return (
    <div style={{ width: 37, height: 37 }}>
      <CircularProgressbar
        value={60}
        text={String(fish.level)}
        background
        styles={{
          // Customize the root svg element
          root: {
            filter: "drop-shadow(1px 2px 0px rgba(0, 0, 0, 0.25))",
            overflow: "visible",
          },
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: "#C6CC76",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",
            // Customize transition animation
            transition: "stroke-dashoffset 0.5s ease 0s",
            // Rotate the path
            transform: "rotate(0.1turn)",
            transformOrigin: "center center",
            borderRadius: "50%",
            strokeWidth: "14px",
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "#FFF",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Rotate the trail
            transformOrigin: "center center",
            strokeWidth: "24px",
          },
          // Customize the text
          text: {
            // Text color
            fill: "#2E2E2E",
            // Text size
            fontSize: "44px",
            fontFamily: "Jeko",
            transform: "translateY(4px)",
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: "#F6EFE5",
          },
        }}
      />
    </div>
  );
};
