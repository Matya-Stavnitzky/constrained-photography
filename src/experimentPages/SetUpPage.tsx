import type { Dispatch, SetStateAction } from "react";
import CenteringDiv from "../components/CenteringDiv";

interface SetupPageProps {
  setVisiblePage: Dispatch<SetStateAction<string>>;
}

const SetUpPage: React.FC<SetupPageProps> = ({ setVisiblePage }) => {
  const signIn = async () => {
    const sessionId = (document.getElementById("session") as HTMLInputElement)
      .value;
    const participantNumber = (
      document.getElementById("participant") as HTMLInputElement
    ).value;
    const logging = (document.getElementById("logging") as HTMLInputElement)
      .checked;

   
  };

  return (
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
          signIn();
          setVisiblePage("InstructionPage");
        }}
      >
        Start Experiment
      </button>
    </CenteringDiv>
  );
};

export default SetUpPage;
