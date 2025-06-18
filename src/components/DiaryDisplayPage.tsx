import styled from "styled-components";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

const Img = styled.img`
  height: 100%;
  top: 50%;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 20%;
  left: 0;
  right: 0;
  height: 0%;
  background-color: rgba(95, 13, 87, 0.56);
  display: flex;
  direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ReturnButton = styled.button`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

type DiaryDisplayPageProps = {
  setImageDisplay: Dispatch<SetStateAction<boolean>>;
  image: string;
}

const DiaryDisplayPage: React.FC<DiaryDisplayPageProps> = ({setImageDisplay, image}) => {
  function stopRecording() {
    console.log("Recording stopped");
    setReturnIsVisible(true);
  }

  function recordingDeleted() {
    console.log("Canvas cleared");
    setReturnIsVisible(false);
  }

  const recorderControls = useVoiceVisualizer({
    onStopRecording: stopRecording,
    onClearCanvas: recordingDeleted,
  });
  const { recordedBlob, error } = recorderControls;
  const [returnIsVisible, setReturnIsVisible] = useState(false);

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;

    console.log(recordedBlob);
  }, [recordedBlob]);

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);

  return (
    <>
      {returnIsVisible && (
        <ReturnButton
          onClick={() => {
            setImageDisplay(false);
          }}
        >
          Take Another Photo
        </ReturnButton>
      )}
      <Img
        src={image}
        alt="Captured"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <BottomBar>
        <VoiceVisualizer controls={recorderControls} />
      </BottomBar>
    </>
  );
};

export default DiaryDisplayPage;
