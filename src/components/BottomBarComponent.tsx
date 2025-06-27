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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

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
  participantId?: string;
  sessionId?: string;
  logging: boolean;
  itemId?: string;
};

const BottomBarComponent: React.FC<BottomBarComponentProps> = ({
  passedCamera,
  setShowImages,
  takenPhotos,
  thumbNailFunction,
  takePhotoFunction,
  changeCameraFunction,
  participantId,
  sessionId,
  logging,
  itemId,
}) => {
  const [image, setImage] = useState<string | ImageData | undefined | null>(
    null
  ); //image to be displayed in the thumbnail
  const camera = passedCamera; //access to the camera so photos can be saved

  //STORING IMAGEs IN FIREBASE
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();
  const storageRef = ref(storage);
  // Create a storage reference from our storage service
  const imagesRefName = `s-${sessionId}-p-${participantId}/i-${itemId}`;

  const savePhoto = (
    photo: string,
    photonum: number,
    imagesRefName: string
  ) => {
    // Create a reference to 'images/photo.jpg'
    const photoRef = ref(storageRef, `${imagesRefName}-${photonum}.jpg`);

    console.log("photo is:", photo);
    uploadString(photoRef, photo, "data_url").then(() => {
      console.log("Uploaded a photo (format data_url)!");
    });

    const storage = getStorage();
    getDownloadURL(ref(storage, photoRef.fullPath)).then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      // This can be used to display the image in an <img> tag or as a CSS background
      console.log("Download URL:", url);
    });
  };

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

      if (logging) {
        savePhoto(photo, takenPhotos.current.length, imagesRefName); //save photo to firebase
      }
      
    });

  const handleSwitchCamera =
    changeCameraFunction ??
    (() => {
      camera.current?.switchCamera();
    });

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
