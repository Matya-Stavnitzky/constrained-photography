import React from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import CenteringDiv from "../components/CenteringDiv";
import ExperimentPage from "./ExperimentPage";

interface CenteredPageProps {
  setVisiblePage: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}

const InstructionPage: React.FC<CenteredPageProps> = ({ setVisiblePage }) => {
  const [visiblePage, InstructionPageNavigation] =
    React.useState<string>("InstructionPage");

  return (
    <>
      {visiblePage === "InstructionPage" && (
        <>
          <CenteringDiv>
            <h1>Instructions</h1>
            <p>
              In this experiment you will be prompted to walk around an art
              gallery and look at items. The phone will vibrate and a prompt
              will appear on the screen when you should move to the next item.
              At each item you will be asked to either observe it or take a
              picture of it. At the end of the experiment you will be asked to
              remember what you saw (the names of the items you saw?).
            </p>
            <p>You can opt out of the study at any point (ethics info here)</p>
            <p>
              When you are ready, click the button below to start an example
              item
            </p>
            <button
              onClick={() => InstructionPageNavigation("exampleExperimenet")}
            >
              Start Example
            </button>
          </CenteringDiv>
        </>
      )}

      {visiblePage === "exampleExperimenet" && (
        <>
          <p
            style={{
              position: "absolute",
              left: "50%",
              top: "20px",
              transform: "translateX(-50%)",
              textAlign: "center",
              width: "80%"
            }}
          >
            This is an example of what you will do in the experiment. 
          </p>
          <ExperimentPage
            logging={false}
            itemOrder={[0, 0]}
            itemPhotography={[false, true]}
            nextPage={InstructionPageNavigation}
          ></ExperimentPage>
        </>
      )}

      {visiblePage === "distractor" && (
        <>
          <CenteringDiv>
            <h1>Instructions</h1>
            <p>
              In this experiment you will be prompted to walk around an art
              gallery and look at items. The phone will vibrate and a prompt
              will appear on the screen when you should move to the next item.
              At each item you will be asked to either observe it or take a
              picture of it. At the end of the experiment you will be asked to
              remember what you saw (the names of the items you saw?).
            </p>
            <p>You can opt out of the study at any point (ethics info here)</p>
            <p>
              When you are ready, click the button below to start an example
              item
            </p>
            <button
              onClick={() => InstructionPageNavigation("exampleExperimenet")}
            >
              Start Example
            </button>
            <p>
              When you are ready, click the button below to start the experiment
            </p>
            <button
              onClick={() => {
                setVisiblePage("ExperimentPage");
              }}
            >
              Start Experiment
            </button>
          </CenteringDiv>
        </>
      )}
    </>
  );
};

export default InstructionPage;
