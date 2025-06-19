import React from "react";
import InstructionPage from "./experimentPages/InstructionPage";
import PromptPage from "./experimentPages/PromptPage";
import CenteringDiv from "./components/CenteringDiv";
import {database} from "./config/firebase";

const Experiment = () => {
  const maxItems = 30; // Maximum number of items in the experiment
  const [visiblePage, setVisiblePage] = React.useState("SetUpPage");
  const [itemNumber, setItemNumber] = React.useState(0);
  const [observe, setObserve] = React.useState(false);

  const getItemOrder = async () => {
    const itemOrderRef = database.collection("itemOrder");
    itemOrderRef.get().then((querySnapshot) => {
      const itemOrder = [];
      querySnapshot.forEach((doc) => {
        itemOrder.push(doc.data());
      });
      // Do something with the item order
    });
  };

  return (
    <>
      {visiblePage === "SetUpPage" && (
        <CenteringDiv>
          <h1>Experiment Setup</h1>
          <div>
            <label htmlFor="session">Session Id: </label>
            <input type="text" id="session" name="session"></input>
          </div>

          <div>
            <label htmlFor="participant">Participant Number: </label>
            <input type="text" id="participant" name="session"></input>
          </div>

          <div>
            <label htmlFor="logging"> Log Photos</label>
            <input type="checkbox" id="logging" name="logging"></input>
          </div>

          <button
            onClick={() => {
              setVisiblePage("InstructionPage");
            }}
          >
            Start Experiment
          </button>
        </CenteringDiv>
      )}

      {visiblePage === "InstructionPage" && (
        <InstructionPage setVisiblePage={setVisiblePage}>
          <h1>Instructions</h1>
          <p>
            In this experiment you will be prompted to walk around an art
            gallery and look at items. The phone will vibrate and a prompt will
            appear on the screen when you should move to the next item. At each
            item you will be asked to either observe it or take a picture of it.
            At the end of the experiment you will be asked to remember what you
            saw (the names of the items you saw?).
          </p>
          <p>You can opt out of the study at any point (ethics info here)</p>
          <p>
            When you are ready, click the button below to start an example item
          </p>
        </InstructionPage>
      )}

      {visiblePage === "ExperimentPage" && (
        <>
          <h1>Experiment Page</h1>
          <button onClick={() => setVisiblePage("SetUpPage")}>
            Back to Setup
          </button>
        </>
      )}
    </>
  );
};
export default Experiment;
