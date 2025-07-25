import { useRef, useState } from "react";
import { Camera, type CameraType } from "react-camera-pro";
// import styled from "styled-components";
import BottomBarComponent from "./BottomBarComponent";
import DiaryDisplayPage from "./DiaryDisplayPage";

// Photo taken with press and hold, check for a certain level of audio for photo to be taken
// can keep normal display page

const PhotoDiary = () => {
  const camera = useRef<CameraType>(null);
  const takenPhotos = useRef<string[]>([]);
  const [showImages, setShowImages] = useState(false);
  // const photoTaken = useRef<boolean>(false);
  // const [image, setImage] = useState<string | null>(null);

  //Lock the screen orientation to portrait (only works for mobile on some browsers)
  if ("orientation" in screen && "lock" in screen.orientation) {
    // @ts-ignore
    screen.orientation.lock("portrait").catch(() => {});
  }

  // const takePhoto = () => {
  //     const photo = camera.current?.takePhoto() as string; //get photo from camera
  //     takenPhotos.current.push(photo); //add to array
  //     setImage(photo); //set photo thumbnail to the last photo taken
  //     photoTaken.current = true;  //display the photo currently taken
  // }

  return (
    <div>
      {showImages && (
        <>
          TEXT HERE
          <DiaryDisplayPage
            setImageDisplay={setShowImages}
            takenPhotos={takenPhotos}
          ></DiaryDisplayPage>
        </>
      )}

      {!showImages && (
        <>
           <Camera ref={camera} />


          <BottomBarComponent
              passedCamera={camera}
              setShowImages={setShowImages}
              takenPhotos={takenPhotos}
              logging={false} //TODO: pass logging here
            >
              {/* TODO: add a function with special take photo responsibility */}
          </BottomBarComponent>
        </>
      )}
    </div>
  );
};

export default PhotoDiary;
