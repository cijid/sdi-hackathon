import { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import "./App.css";

import goodJobCard from "./assets/png/good-job-card.png";
import stopCard from "./assets/png/stop-card.png";
import ughCard from "./assets/png/ugh-card.png";
import whatCard from "./assets/png/what-card.png";
import yayCard from "./assets/png/yay-card.png";

const cards = [goodJobCard, stopCard, ughCard, whatCard, yayCard];

//Cliff - Adding shuffle logic

function shuffleCards(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

const from = (_i) => ({
  x: 0,
  rot: 0,
  scale: 1.5,
  y: -1000,
});

// Interpolates rotation and scale into a CSS transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [shuffledCards] = useState(() => shuffleCards(cards));
  const [gone] = useState(() => new Set());

  const [props, api] = useSprings(shuffledCards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = Math.abs(mx) > 100 || vx > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        gone.add(index);
      }

      api.start((i) => {
        if (index !== i) return;

        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;

        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: {
            friction: 50,
            tension: down ? 800 : isGone ? 200 : 500,
          },
        };
      });

      if (!down && gone.size === cards.length) {
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
      }
    },
  );

  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className="deck" key={i} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${shuffledCards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </>
  );
}

export default function CardsDeck() {
  return (
    <div className="container">
      <Deck />
    </div>
  );
}
