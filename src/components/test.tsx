import { useRef } from "react";
import { Camera, type CameraType } from "react-camera-pro";
import styled from "styled-components";
// import UnconstrainedCam from "./UnconstrainedCam";

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

const TestPage = () => {
  const zoomedCamera = useRef<CameraType>(null);

  return (
    <>
      <CameraContainer>
        <Camera ref={zoomedCamera} aspectRatio={2 / 8} />
      </CameraContainer>

      {/* <UnconstrainedCam></UnconstrainedCam> */}
    </>
  );
};

export default TestPage;
