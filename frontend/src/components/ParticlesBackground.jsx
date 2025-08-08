import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      className="absolute top-0 left-0 w-full h-full z-0"
      options={{
        fullScreen: false,
        particles: {
          number: { value: 80 },
          size: { value: 3 },
          color: { value: "#a855f7" },
          links: {
            enable: true,
            color: "#6366f1",
            distance: 150,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100 },
            push: { quantity: 4 },
          },
        },
        background: { color: "transparent" },
      }}
    />
  );
}
