import React from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import CenteringDiv from "../components/CenteringDiv";
import PromptPage from "./PromptPage";

interface CenteredPageProps {
  setVisiblePage: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}

const InstructionPage: React.FC<CenteredPageProps> = ({
  children,
  setVisiblePage,
}) => {
  const [visiblePage, InstructionPageNavigation] =
    React.useState<string>("InstructionPage");

  return (
    <>
      {visiblePage === "InstructionPage" && (
        <>
          <CenteringDiv>
            {children}
            <button onClick={() => InstructionPageNavigation("ExamplePrompt")}>
              Start Example
            </button>
          </CenteringDiv>
        </>
      )}

      {visiblePage === "ExamplePrompt" && (
        <>
          <p>This is an example prompt</p>
          <PromptPage itemNumber={0}></PromptPage>
        </>
      )}

      {visiblePage === "ExampleViewItemPage" && (
        <>
          <h1>View Item Page</h1>
          <button onClick={() => setVisiblePage("ExperimentPage")}>
            Back to Experiment
          </button>
        </>
      )}

      {visiblePage === "ExampleCameraPage" && (
        <>
          <h1>View Item Page</h1>
          <button onClick={() => setVisiblePage("ExperimentPage")}>
            Back to Experiment
          </button>
        </>
      )}
    </>
  );
};

export default InstructionPage;
