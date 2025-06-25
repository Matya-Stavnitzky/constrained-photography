import React from "react";
import CenteringDiv from "../components/CenteringDiv";
import UnconstrainedCam from "../components/UnconstrainedCam";
import sleep from "../components/sleep"; // Assuming you have a sleep utility function

function continueExperiment(
  setIdx: React.Dispatch<React.SetStateAction<number>>,
  idx: number,
  itemOrder: number[] | string[],
  setPage: React.Dispatch<React.SetStateAction<string>>,
  exitNavigation: React.Dispatch<React.SetStateAction<string>>
) {
  {
    sleep(5).then(() => {
      setIdx(idx + 1);
      
      if (idx+1 >= itemOrder.length) {
        exitNavigation("distractor");
      } else {
        setPage("prompt");
      }
    });
  }
}

type ExperimentPageProps = {
  logging: boolean;
  itemOrder: number[] | string[];
  itemPhotography: boolean[];
  nextPage: React.Dispatch<React.SetStateAction<string>>;
  participantId?: string;
  sessionId?: string;
};

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  logging,
  itemOrder,
  itemPhotography,
  nextPage,
  participantId,
  sessionId,
}) => {
  const [idx, setIdx] = React.useState(0);
  const [page, setPage] = React.useState("prompt");

  return (
    <>
      {page === "prompt" && (
        <>
          <CenteringDiv>
            <h1>Go to item number {itemOrder.at(idx)}</h1>
            <button
              onClick={() => {
                if (itemPhotography[idx]) {
                  setPage("photograph");
                } else {
                  setPage("observe");
                }
              }}
            >
              I have arrived at the item
            </button>
          </CenteringDiv>
        </>
      )}

      {page === "observe" && (
        <>
          <CenteringDiv>
            <h1>Please observe the item</h1>
          </CenteringDiv>
          {continueExperiment(setIdx, idx, itemOrder, setPage, nextPage)}
        </>
      )}

      {page === "photograph" && (
        <>
          <UnconstrainedCam 
          logging={logging}
            participantId={participantId}
            sessionId={sessionId}
            itemId={itemOrder.at(idx)?.toString() || ""}
          ></UnconstrainedCam>
          {continueExperiment(setIdx, idx, itemOrder, setPage, nextPage)}
          {/* Could get screenshot here instead of logging the photo that was taken */}
        </>
      )}
    </>
  );
};
export default ExperimentPage;
