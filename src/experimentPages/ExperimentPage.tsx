import React from "react";
import CenteringDiv from "../components/CenteringDiv";
import UnconstrainedCam from "../components/UnconstrainedCam";
import MyTimer from "../components/timer";
import TopBarComponent from "../components/TopBarComponent";

function continueExperiment(
  setIdx: React.Dispatch<React.SetStateAction<number>>,
  idx: number,
  itemOrder: number[] | string[],
  setPage: React.Dispatch<React.SetStateAction<string>>,
  exitNavigation: React.Dispatch<React.SetStateAction<string>>,
  exitTo: string
) {
  {
    //TODO: CHECK IF THE VIBRATION WORKS ON A PHONE
    window.navigator.vibrate([500]);
    setIdx(idx + 1);

    if (idx + 1 >= itemOrder.length) {
      console.log("Experiment complete, exiting to:", exitTo);
      exitNavigation(exitTo);
    } else {
      setPage("prompt");
    }
  }
}

type ExperimentPageProps = {
  logging: boolean;
  itemOrder: number[] | string[];
  itemPhotography: boolean[];
  nextPage: React.Dispatch<React.SetStateAction<string>>; // Function to navigate to the next page of the experiment

  // Optional props
  setVeiwingIdx?: React.Dispatch<React.SetStateAction<number>>; //local control of which item is being viewed, to allow for reloading the page
  itemVeiwingIdx?: number; //item being veiwed
  participantId?: string;
  sessionId?: string;
  exitTo?: string; // Optional prop to specify where to exit
};

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  logging,
  itemOrder,
  itemPhotography,
  nextPage,
  participantId,
  sessionId,
  setVeiwingIdx,
  itemVeiwingIdx = 0, // Default to 0 if not provided
  exitTo = "distractor", // Default exit page if not provided
}) => {
  const [page, setPage] = React.useState(`prompt`);
  const [veiwingIdx, setLocalVeiwingIdx] = React.useState<number>(
    itemVeiwingIdx ?? 0
  );

  // Use local state if setVeiwingIdx is not provided
  const setIdx = setVeiwingIdx ?? setLocalVeiwingIdx;
  const currentIdx = setVeiwingIdx ? itemVeiwingIdx : veiwingIdx;

  return (
    <>
      {page === "prompt" && (
        <CenteringDiv>
          <h1>Go to item number {itemOrder.at(currentIdx)}</h1>
          <button
            onClick={() => {
              if (itemPhotography[currentIdx]) {
                setPage("photograph");
              } else {
                setPage("observe");
              }
            }}
          >
            I have arrived at the item
          </button>
        </CenteringDiv>
      )}

      {page === "observe" && (
        <>
          <CenteringDiv>
            <h1>Please observe the item</h1>
            <MyTimer
              timeS={5}
              onExpire={() => {
                continueExperiment(
                  setIdx,
                  currentIdx,
                  itemOrder,
                  setPage,
                  nextPage,
                  exitTo
                );
              }}
            ></MyTimer>
          </CenteringDiv>

          {/* {continueExperiment(setIdx, currentIdx, itemOrder, setPage, nextPage)} */}
        </>
      )}

      {page === "photograph" && (
        <>
          <TopBarComponent>
            <MyTimer
              timeS={5}
              onExpire={() => {
                continueExperiment(
                  setIdx,
                  currentIdx,
                  itemOrder,
                  setPage,
                  nextPage,
                  exitTo
                );
              }}
              color={"white"}
            />
          </TopBarComponent>
          <UnconstrainedCam
            logging={logging}
            participantId={participantId}
            sessionId={sessionId}
            itemId={itemOrder.at(currentIdx)?.toString() || ""}
          />
          {/* {continueExperiment(setIdx, currentIdx, itemOrder, setPage, nextPage)} */}
        </>
      )}
    </>
  );
};
export default ExperimentPage;
