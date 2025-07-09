import { useRef, useState } from "react";
import { Camera, type CameraType } from "react-camera-pro";
import FullscreenButton from "./buttons/FullScreenButton";
import styled from "styled-components";
import ImageDisplayPage from "./ImageDisplayPage";
import BottomBarComponent from "./BottomBarComponent";

const CameraContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 10%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 1;
  overflow: hidden;
`;

const CoverDiv = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0);
`;

const TinyViewFinder = () => {
  const regCamera = useRef<CameraType>(null);
  const miniCamera = useRef<CameraType>(null);
  const takenPhotos = useRef<string[]>([]);
  const [showImages, setShowImages] = useState(false); //boolean should the Image display page or this page be shown

  //Lock the screen orientation to portrait (only works for mobile on some browsers)
  if ("orientation" in screen && "lock" in screen.orientation) {
    // @ts-ignore
    screen.orientation.lock("portrait").catch(() => {});
  }

  return (
    <div>
      <FullscreenButton>
        {/* Renderes ShowImages Page */}
        {showImages && (
          <ImageDisplayPage
            takenPhotos={takenPhotos}
            setShowImages={setShowImages}
          ></ImageDisplayPage>
        )}

        {!showImages && (
          <>
            <CameraContainer>
              <Camera ref={miniCamera} />
            </CameraContainer>

            <Camera ref={regCamera} />

            <CoverDiv></CoverDiv>

            <BottomBarComponent
              passedCamera={regCamera}
              setShowImages={setShowImages}
              takenPhotos={takenPhotos}
              logging={false} //TODO: set to true when logging is implemented
              changeCameraFunction={() => {
                regCamera.current?.switchCamera();
                miniCamera.current?.switchCamera();
              }}
            ></BottomBarComponent>
          </>
        )}
      </FullscreenButton>
    </div>
  );
};

export default TinyViewFinder;
