import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

export default function ButtonChase() {
  const buttonWidth = 140;
  const buttonHeight = 50;

  const [springs, api] = useSpring(() => ({
    x: 300,
    y: 200,
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
  }));

  function moveButton() {
    const padding = 20;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const newX = padding + Math.random() * (maxX - padding);

    const newY = padding + Math.random() * (maxY - padding);

    const currentX = springs.x.get();
    const currentY = springs.y.get();

    const xDirection = newX > currentX ? 1 : -1;
    const yDirection = newY > currentY ? 1 : -1;

    // Stretch while escaping
    api.start({
      x: newX,
      y: newY,
      scaleX: 1.4,
      scaleY: 0.7,
      rotate: xDirection * 8,
      config: {
        tension: 500,
        friction: 18,
      },

      onRest: () => {
        // Squish when it lands, then spring back
        api.start({
          scaleX: 0.8,
          scaleY: 1.25,
          rotate: -xDirection * 3,
          config: {
            tension: 600,
            friction: 12,
          },

          onRest: () => {
            api.start({
              scaleX: 1,
              scaleY: 1,
              rotate: 0,
              config: {
                tension: 500,
                friction: 10,
              },
            });
          },
        });
      },
    });
  }

  useEffect(() => {
    function handleMouseMove(event) {
      const currentX = springs.x.get();
      const currentY = springs.y.get();

      const buttonCenterX = currentX + buttonWidth / 2;
      const buttonCenterY = currentY + buttonHeight / 2;

      const distanceX = event.clientX - buttonCenterX;
      const distanceY = event.clientY - buttonCenterY;

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < 120) {
        moveButton();
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="runaway-page">
      <h1>Submit Your Report</h1>
      <p>Just click submit. How hard could it be?</p>

      <animated.button
        className="runaway-button"
        style={{
          x: springs.x,
          y: springs.y,
          scaleX: springs.scaleX,
          scaleY: springs.scaleY,
          rotate: springs.rotate,
        }}
        onMouseDown={moveButton}
      >
        Submit
      </animated.button>
    </div>
  );
}
