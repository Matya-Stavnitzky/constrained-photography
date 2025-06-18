import { useRef, useState } from "react";
import { Camera, type CameraType } from "react-camera-pro";
import styled from "styled-components";
import TakePhotoButton from "./buttons/TakePhotoButton";
import BottomBarComponent from "./BottomBarComponent";
import FullscreenButton from "./buttons/FullScreenButton";
import DiaryDisplayPage from "./DiaryDisplayPage";

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 15%;
  background-color: rgba(95, 13, 87, 0.56);
  display: flex;
  direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #bf4f74;
  color: #bf4f74;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
`;

const PhotoDiary = () => {
  const camera = useRef<CameraType>(null);
  const takenPhotos = useRef<string[]>([]);
  const [showImages, setShowImages] = useState(false);

  //Lock the screen orientation to portrait (only works for mobile on some browsers)
  if ("orientation" in screen && "lock" in screen.orientation) {
    // @ts-ignore
    screen.orientation.lock("portrait").catch(() => {});
  }

  return (
    <div>
      <FullscreenButton>

        {showImages && 
        (<DiaryDisplayPage setImageDisplay={setShowImages} takenPhotos={takenPhotos}></DiaryDisplayPage>)}

        {!showImages && (
          <>
            <Camera ref={camera} />

            <BottomBarComponent
              passedCamera={camera}
              setShowImages={setShowImages}
              takenPhotos={takenPhotos}
            >
              {/* TODO: add a function with special take photo responsibility */}
            </BottomBarComponent>
          </>
        )}
      </FullscreenButton>
    </div>
  );
};

export default PhotoDiary;
