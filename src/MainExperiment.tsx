import React, { useRef } from "react";
import InstructionPage from "./experimentPages/InstructionPage";
import CenteringDiv from "./components/CenteringDiv";
import { db } from "./config/firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import ExperimentPage from "./experimentPages/ExperimentPage";
import DistractorPage from "./experimentPages/DistractorPage";
import RecallPage from "./experimentPages/RecallPage";

/**
 * Function to generate the random order of items + if they should be photographed
 * @param sessionID the session ID for the experiment
 * @param userId the user ID for the participant
 * @param maxItems the maximum number of items in the experiment
 * @returns an object containing 2 arrays, one with the randomized order of items and the other indicating if each item should be photographed
 */
const generateOrder = async (sessionID:string, userId:string, logging:boolean, maxItems:number) => {

  // Check if the session and user is already in the database  
  const q = query(collection(db, "ItemOrder"), where("sessionId", "==", sessionID), where("userId", "==", userId));  //check if sessionId already exists
  const querySnapshot = await getDocs(q);
  console.log("Query snapshot:", querySnapshot);
  if (!querySnapshot.empty) { //If there is already an order for this sessionId and userId
    const doc = querySnapshot.docs[0]; 
    const data = doc.data();
    console.log("Order from database:", data.Order);
    return { numbers: data.Order, bools:data.Photography}; // Return existing order if found
  }
  //TODO: use same order with a different starting point if there is more than one participant in the same session

  //Make randomized order of numbers
  const numbers = Array.from({ length: maxItems }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  
  //Make randomized array of booleans, where 1/2 are true
  const bools = Array(numbers.length).fill(false);
  for (let i = 0; i < Math.floor(numbers.length / 2); i++) {
    bools[i] = true;
  }
  // Shuffle the booleans array
  for (let i = bools.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bools[i], bools[j]] = [bools[j], bools[i]];
  }

  //Right now just store in one place in DB
  const dbRef = collection(db, "ItemOrder")
  //TODO: CHECK IF ALREADY EXISTS by sessionID and then update for different participants
  await addDoc(dbRef, {
    sessionId: sessionID,
    userId: userId,
    logging: logging,
    Order: numbers,
    Photography: bools
  }
  ); 
  console.log("Order saved to database:", { numbers});
  return { numbers, bools };
}

//TODO: 
const Experiment = () => {
  const maxItems = 30; // Maximum number of items in the experiment
  const [visiblePage, setVisiblePage] = React.useState("SetUpPage");;
  
  const sessionId = useRef<string>("");
  const userId = useRef<string>("");
  const logging = useRef<boolean>(false);
  
  let itemOrder = useRef<number[]>([]);
  let itemPhotography = useRef<boolean[]>([]);


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
            onClick={async() => {
              sessionId.current = (document.getElementById("session") as HTMLInputElement).value;
              userId.current = (document.getElementById("participant") as HTMLInputElement).value;
              logging.current = (document.getElementById("logging") as HTMLInputElement).checked;
              const {numbers, bools}= await generateOrder(sessionId.current, userId.current, logging.current, maxItems);
              itemOrder.current = numbers;
              itemPhotography.current = bools;
              setVisiblePage("InstructionPage");
            }}
          >
            Start Experiment
          </button>
        </CenteringDiv>
      )}

      {visiblePage === "InstructionPage" && (
        <InstructionPage setVisiblePage={setVisiblePage}>
        </InstructionPage>
      )}

      {visiblePage === "ExperimentPage" && (
        <>
          <ExperimentPage logging={logging.current} itemOrder={itemOrder.current} itemPhotography={itemPhotography.current} nextPage={setVisiblePage}></ExperimentPage>
        </>
      )}

      {visiblePage === "distractor" && (

        <>
          <DistractorPage setVisiblePage={setVisiblePage}></DistractorPage>
        </>
      )}

      {visiblePage === "recall" && (
        <RecallPage setVisiblePage={setVisiblePage}></RecallPage>
      )}

      {visiblePage === "end" && (
        <CenteringDiv>
          <h1>Experiment Complete</h1>
          <p>Thank you for participating in the experiment!</p>
        </CenteringDiv>
      )}
    </>
  );
};
export default Experiment;