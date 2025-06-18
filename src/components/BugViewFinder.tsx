import { useMemo, useRef, useState } from "react";
import { Camera, type CameraType } from "react-camera-pro";

import styled from "styled-components";
import BottomBarComponent from "./BottomBarComponent";
import FullscreenButton from "./buttons/FullScreenButton";
import ImageDisplayPage from "./ImageDisplayPage";

const CameraContainer = styled.div`
  height: 12.5%;
  width: 20%;
  justify-content: center;
  align-items: center;
  transform: translate(0%, 0%);
`;

const CoverDiv = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  background-color: rgb(0, 0, 0);
  z-index: 1;
`;

const SmallSquareCamera = () => {
  return (
    <CameraContainer>
      <Camera />
    </CameraContainer>
  );
};

const BugViewFinder = () => {
  const [showImage, setShowImage] = useState(false);
  const camera = useRef<CameraType>(null);
  const count = 40;
  const bugCameras = useMemo(() => new Array(count).fill(null), [count]);
  const takenPhotos = useRef<string[]>([]);

  //Lock the screen orientation to portrait (only works for mobile on some browsers)
  if ("orientation" in screen && "lock" in screen.orientation) {
    // @ts-ignore
    screen.orientation.lock("portrait").catch(() => {});
  }

  return (
    <div>
      <FullscreenButton>
        {/* Renderes ShowImages Page */}
        {showImage && (
          <ImageDisplayPage
            takenPhotos={takenPhotos}
            setShowImages={setShowImage}
          ></ImageDisplayPage>
        )}

        {!showImage && (
          <>
            <CoverDiv>
              {bugCameras.map((_, index) => (
                <SmallSquareCamera key={index} />
              ))}
            </CoverDiv>

            <Camera ref={camera} />

            <BottomBarComponent
              passedCamera={camera}
              setShowImages={setShowImage}
              takenPhotos={takenPhotos}
              // NOTE to flip camera need a special method here that flips ALL the camera
            ></BottomBarComponent>
          </>
        )}
      </FullscreenButton>
    </div>
  );
};

export default BugViewFinder;
