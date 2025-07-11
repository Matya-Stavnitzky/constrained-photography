import React, { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type KeyboardAwareScrollContainerProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

const KeyboardAwareScrollContainer: React.FC<KeyboardAwareScrollContainerProps> = ({
  children,
  style = {},
}) => {
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeightAndKeyboard = () => {
      let newHeight = window.innerHeight;
      let keyboardOpen = false;
      if (window.visualViewport) {
        newHeight = window.visualViewport.height;
        keyboardOpen = window.visualViewport.height / window.innerHeight < 0.8;
      }
      setContainerHeight(newHeight);
      setIsKeyboardOpen(keyboardOpen);
    };

    updateHeightAndKeyboard();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateHeightAndKeyboard);
    } else {
      window.addEventListener("resize", updateHeightAndKeyboard);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeightAndKeyboard);
      } else {
        window.removeEventListener("resize", updateHeightAndKeyboard);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: isKeyboardOpen ? "auto" : "hidden",
        WebkitOverflowScrolling: "touch",
        transition: "height 0.2s",
        ...style,
      }}
    >
      <div
        style={{
          minHeight: containerHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: isKeyboardOpen ? "flex-start" : "center",
          alignItems: "center",
          width: "100%",
          paddingBottom: 32,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default KeyboardAwareScrollContainer;