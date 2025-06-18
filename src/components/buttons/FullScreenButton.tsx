import { useEffect, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  z-index: 11;
  top: 50%;
  left: 50%;
`;

interface FullscreenButtonProps {
  children?: ReactNode;

}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({children}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === divRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [divRef, setIsFullscreen]);

  //function to make fullscreen
  const handleFullscreen = () => {
    if (divRef.current && divRef.current.requestFullscreen) {
      divRef.current.requestFullscreen();
    }
  };

  return (
    <div ref={divRef}>
      {/* Renders if not in full screen */}
      {!isFullscreen && (
        <Button onClick={handleFullscreen}>Go Fullscreen</Button>
      )}

      {children}
    </div>
  );
};

export default FullscreenButton;
