import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/loading.json";

const LottieAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      animationData: animationData,
      loop: true,
      autoplay: true,
    });
    anim.setSpeed(2);
    return () => {
      anim.destroy(); // Clean up animation when component unmounts
    };
  }, []);

  return <div ref={containerRef} />;
};

export default LottieAnimation;
