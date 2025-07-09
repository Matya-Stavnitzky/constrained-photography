import { useRef, useState } from "react";
import { Camera, type CameraType } from "react-camera-pro";
import styled from "styled-components";
import FullscreenButton from "./buttons/FullScreenButton";
import ImageDisplayPage from "./ImageDisplayPage";
import BottomBarComponent from "./BottomBarComponent";

const CameraContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 1;
  overflow: hidden;
`;

const ZoomedViewFinder = () => {
  const zoomedCamera = useRef<CameraType>(null);
  const regCamera = useRef<CameraType>(null);
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

        {/* Renders photo page */}
        {!showImages && (
          <>
            <Camera ref={regCamera} />

            <CameraContainer>
              <Camera ref={zoomedCamera} aspectRatio={2 / 8} />
            </CameraContainer>

            <BottomBarComponent
              passedCamera={regCamera}
              setShowImages={setShowImages}
              takenPhotos={takenPhotos}
              changeCameraFunction={() => {
                regCamera.current?.switchCamera();
                zoomedCamera.current?.switchCamera();
              }}
              logging={false} //TODO: set to true when logging is implemented
            ></BottomBarComponent>
          </>
        )}
      </FullscreenButton>
    </div>
  );
};

export default ZoomedViewFinder;
