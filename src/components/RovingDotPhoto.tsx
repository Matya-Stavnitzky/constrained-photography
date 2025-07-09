import UnconstrainedCam from "./UnconstrainedCam";
import RovingDot from "./RovingDot";
import FullscreenButton from "./buttons/FullScreenButton";
import { useState } from "react";

const RovingDotPhoto = () => {
  const [showImages, setShowImages] = useState(false); //boolean should the Image display page or this page be shown

  return (
    <>
      <FullscreenButton>
        <UnconstrainedCam
          showImagePage={showImages}
          displayImagePageSetter={setShowImages}
          logging={false}
        ></UnconstrainedCam>
        {!showImages && <RovingDot transparent={false} circleDim="40vh" />}
      </FullscreenButton>
    </>
  );
};

export default RovingDotPhoto;
