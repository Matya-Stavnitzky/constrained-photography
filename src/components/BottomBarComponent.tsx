import {
  useState,
  type SetStateAction,
  type Dispatch,
  type RefObject,
} from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { type CameraType } from "react-camera-pro";
import TakePhotoButton from "./buttons/TakePhotoButton";

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 15%;
  background-color: rgba(47, 59, 45, 0.56);
  display: flex;
  direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
`;

const ChangeFacingCameraButton = styled.button`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  border-width: 0;
`;

const SquareContainer = styled.div`
  height: 70%;
  aspect-ratio: 1/1;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

type BottomBarComponentProps = {
  passedCamera: React.RefObject<CameraType | null>;
  setShowImages: Dispatch<SetStateAction<boolean>>;
  takenPhotos: RefObject<string[]>;
  thumbNailFunction?: () => void;
  takePhotoFunction?: () => void;
  changeCameraFunction?: () => void;
};

const BottomBarComponent: React.FC<BottomBarComponentProps> = ({
  passedCamera,
  setShowImages,
  takenPhotos,
  thumbNailFunction,
  takePhotoFunction,
  changeCameraFunction,
}) => {
  const [image, setImage] = useState<string | ImageData | undefined | null>(
    null
  ); //image to be displayed in the thumbnail
  const camera = passedCamera; //access to the camera so photos can be saved

  // Provide a default if thumbNailFunction is not passed
  const handleThumbNailClick =
    thumbNailFunction ??
    (() => {
      if (typeof image === "string" || takenPhotos.current.length >= 1) {
        setShowImages(true);
      }
    });

  const handleTakePhoto =
    takePhotoFunction ??
    (() => {
      const photo = camera.current?.takePhoto() as string; //get photo from camera
      takenPhotos.current.push(photo); //add to array
      setImage(photo); //set photo thumbnail to the last photo taken
    });

  const handleSwitchCamera = changeCameraFunction ?? (() => {
      camera.current?.switchCamera();
  })

  return (
    <>
      <BottomBar>
        {/* Image thumbnail display */}
        <SquareContainer>
          <Img
            src={
              takenPhotos.current.length >= 1
                ? takenPhotos.current[takenPhotos.current.length - 1]
                : typeof image === "string"
                ? image
                : "/solid-color-image.jpeg"
            }
            alt="Taken photo"
            onClick={() => {
              handleThumbNailClick();
            }}
          />
        </SquareContainer>

        {/* Take photo button */}
        <TakePhotoButton
          onClick={() => {
            handleTakePhoto();
          }}
        ></TakePhotoButton>

        {/* Switch camera button */}
        <ChangeFacingCameraButton
          onClick={() => {
            handleSwitchCamera();
          }}
        ></ChangeFacingCameraButton>
      </BottomBar>
    </>
  );
};

export default BottomBarComponent;
