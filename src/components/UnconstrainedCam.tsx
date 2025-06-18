import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Camera, type CameraType } from "react-camera-pro";
import BottomBarComponent from "./BottomBarComponent";
import ImageDisplayPage from "./ImageDisplayPage";

type UnconstrainedCamProps = {
  showImagePage?: boolean;
  displayImagePageSetter?: Dispatch<SetStateAction<boolean>>; 
};

const UnconstrainedCam: React.FC<UnconstrainedCamProps> = ({
  showImagePage,
  displayImagePageSetter,
}) => {
  const camera = useRef<CameraType>(null); //The camera
  const [showImages, setShowImages] = useState(false); //boolean should the Image display page or this page be shown
  const takenPhotos = useRef<string[]>([]); //array of photos that have been taken
  let defaultFacingMode = "environment"; // Default facing mode for the camera

  // Use showImages as default for showImagePage
  const effectiveShowImagePage = showImagePage ?? showImages;
  // Use setShowImages as default for displayImagePageSetter
  const effectiveDisplayImagePageSetter = displayImagePageSetter ?? setShowImages;

  //Lock the screen orientation to portrait (only works for mobile on some browsers)
  if ("orientation" in screen && "lock" in screen.orientation) {
    // @ts-ignore
    screen.orientation.lock("portrait").catch(() => {});
  }

  return (
    <>
      {/* Renderes ShowImages Page */}
      {effectiveShowImagePage && (
        <ImageDisplayPage
          takenPhotos={takenPhotos}
          setShowImages={effectiveDisplayImagePageSetter}
        ></ImageDisplayPage>
      )}

      {/* Renders Photo takingpage */}
      {!effectiveShowImagePage && (
        <>
          <Camera ref={camera} facingMode={defaultFacingMode} />
          <BottomBarComponent
            passedCamera={camera}
            setShowImages={effectiveDisplayImagePageSetter}
            takenPhotos={takenPhotos}
          />
        </>
      )}
    </>
  );
};

export default UnconstrainedCam;
