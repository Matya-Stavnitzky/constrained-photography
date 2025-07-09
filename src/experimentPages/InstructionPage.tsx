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
              picture. At the end of the experiment you will be asked to
              remember the names of the items you saw.
            </p>
            <p>
              When you are ready, click the button below to start an example
              item
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
