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
              In this experiment, you will walk through an art gallery and view
              various items. Your phone will vibrate and display a prompt when
              it is time to move to the next item.
            </p>
            <p>
              At each item, you will be instructed to either observe it
              carefully or take a photo. If you're prompted to take a photo, the
              camera will open automatically. You may take as many photos as
              you'd like, but you must take at least one.
            </p>
            <p>
              At the end of the gallery walkthrough, you will complete a memory
              test based on the items you encountered.
            </p>
            <p>
              When you are ready, click the button below to start an example.
            </p>
            <button
              onClick={() => InstructionPageNavigation("exampleExperiment")}
            >
              Start Example
            </button>
          </CenteringDiv>
        </>
      )}

      {visiblePage === "exampleExperiment" && (
        <>
          <p
            style={{
              position: "absolute",
              textAlign: "center",
            }}
          >
            This is an example of what you will do in the experiment.
          </p>
          <ExperimentPage
            logging={false}
            itemOrder={[0, 0.5]}
            itemPhotography={[false, true]}
            nextPage={InstructionPageNavigation}
            exitTo="InstructionsAgain"
          ></ExperimentPage>
        </>
      )}

      {visiblePage === "InstructionsAgain" && (
        <>
          <CenteringDiv>
            <h1>Instructions</h1>
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
