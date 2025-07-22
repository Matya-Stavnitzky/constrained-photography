import React, { useEffect, useRef } from "react";
import InstructionPage from "./experimentPages/InstructionPage";
import CenteringDiv from "./components/CenteringDiv";
import { db } from "./config/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import ExperimentPage from "./experimentPages/ExperimentPage";
import DistractorPage from "./experimentPages/DistractorPage";
import RecallPage from "./experimentPages/RecallPage";
import FullscreenButton from "./components/buttons/FullScreenButton";
import EndPage from "./experimentPages/EndPage";
import DemographicsPage from "./experimentPages/DemographicsPage";
import KeyboardAwareScrollContainer from "./components/KeyboardAwareScrollContainer";
import PostSurveyPage from "./experimentPages/PostSurveyPage";

const getBools = (maxItems: number) => {
  //Make randomized array of booleans, where 1/2 are true
  const bools = Array(maxItems).fill(false);
  for (let i = 0; i < Math.floor(maxItems / 2); i++) {
    bools[i] = true;
  }
  // Shuffle the booleans array
  for (let i = bools.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bools[i], bools[j]] = [bools[j], bools[i]];
  }
  return bools;
};

/**
 * Function to generate the random order of items + if they should be photographed
 * @param sessionID the session ID for the experiment
 * @param userId the user ID for the participant
 * @param maxItems the maximum number of items in the experiment
 * @returns an object containing 2 arrays, one with the randomized order of items and the other indicating if each item should be photographed
 */
const generateOrder = async (
  sessionID: string,
  userId: string,
  logging: boolean,
  maxItems: number
) => {
  const defaultStage = "DemographicsPage"; // Default stage to start with

  // Check if the session and user is already in the database
  const sessionIDquery = query(
    collection(db, "ItemOrder"),
    where("sessionId", "==", sessionID),
    orderBy("userId", "desc")
  ); //check if sessionId already exists
  const querySnapshot = await getDocs(sessionIDquery);
  console.log("Query snapshot:", querySnapshot);

  //If the session Id exists
  if (!querySnapshot.empty) {
    console.log("Session ID exists:", sessionID);

    //Check if this is a pre-exisiting Id in the session
    const userIdquery = query(
      collection(db, "ItemOrder"),
      where("sessionId", "==", sessionID),
      where("userId", "==", userId)
    );
    const IdquerySnapshot = await getDocs(userIdquery);
    if (!IdquerySnapshot.empty) {
      console.log("User ID exists:", userId);
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      console.log("stage:", data.stage);
      return {
        numbers: data.Order,
        bools: data.Photography,
        stage: data.stage,
        expIdx: data.expIdx,
      }; // Return existing order if found
    }

    // If session ID exists but user ID does not, create a new entry with the same order but shifted indexes by 1/3
    const prevNumbers = querySnapshot.docs[0].data().Order;
    const shift = Math.floor(maxItems / 3);
    const numbers = prevNumbers.map(
      (_: number, idx: number) => prevNumbers[(idx + shift) % maxItems]
    );
    const bools = querySnapshot.docs[0].data().Photography;
    const expIdx = 0;

    const dbRef = collection(db, "ItemOrder");
    await addDoc(dbRef, {
      sessionId: sessionID,
      userId: userId,
      logging: logging,
      Order: numbers,
      Photography: bools,
      stage: defaultStage,
      expIdx: expIdx,
    });
    return {
      numbers,
      bools,
      defaultStage,
      expIdx,
    };
  }

  //Make randomized order of numbers
  const numbers = Array.from({ length: maxItems }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  //get randomized array of booleans, where 1/2 are true
  const bools = getBools(maxItems);

  //Right now just store in one place in DB
  const dbRef = collection(db, "ItemOrder");
  await addDoc(dbRef, {
    sessionId: sessionID,
    userId: userId,
    logging: logging,
    Order: numbers,
    Photography: bools,
    stage: defaultStage,
    expIdx: 0,
  });
  console.log("Order saved to database:", { numbers });
  return { numbers, bools, stage: defaultStage, expIdx: 0 };
};

/**
 * THE MAIN EXPERIMENT COMPONENT
 * @returns
 */
const Experiment = () => {
  const maxItems = 30; // Maximum number of items in the experiment
  const [visiblePage, setVisiblePage] = React.useState("SetUpPage");
  const [ItemVeiwingIdx, setVeiwingIdx] = React.useState(0);

  const sessionId = useRef<string>("");
  const userId = useRef<string>("");
  const logging = useRef<boolean>(false);

  let itemOrder = useRef<number[]>([]);
  let itemPhotography = useRef<boolean[]>([]);

  const divStyle: React.CSSProperties = {
    marginTop: "3vh",
    marginLeft: "20vw",
    marginRight: "5vw",
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    gap: "10px",
  };

  const getDocRef = async () => {
    if (sessionId.current && userId.current) {
      const q = query(
        collection(db, "ItemOrder"),
        where("sessionId", "==", sessionId.current),
        where("userId", "==", userId.current)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
      }
    }
    return null;
  };

  //Update the visible page in the db when it is changed
  useEffect(() => {
    const updateStage = async () => {
      const docRef = await getDocRef();
      if (docRef) {
        await updateDoc(docRef, { stage: visiblePage });
      }
    };
    updateStage();
  }, [visiblePage]);

  //Update the ItemViewingIdx in the db when it is changed
  useEffect(() => {
    const updateStage = async () => {
      const docRef = await getDocRef();
      if (docRef) {
        await updateDoc(docRef, { expIdx: ItemVeiwingIdx });
      }
    };
    updateStage();
  }, [ItemVeiwingIdx]);

  return (
    <FullscreenButton>
      <>
        {visiblePage === "SetUpPage" && (
          <>
            <KeyboardAwareScrollContainer>
              <CenteringDiv>
                <h1>Experiment Setup</h1>

                <div style={divStyle}>
                  <label htmlFor="session">Session Id: </label>
                  <input type="text" id="session" name="session"></input>
                </div>

                <div style={divStyle}>
                  <label htmlFor="participant">Participant Number: </label>
                  <input type="text" id="participant" name="session"></input>
                </div>

                <div style={divStyle}>
                  <label htmlFor="logging"> Log Photos</label>
                  <input type="checkbox" id="logging" name="logging"></input>
                </div>

                <button
                  onClick={async () => {
                    sessionId.current = (
                      document.getElementById("session") as HTMLInputElement
                    ).value;
                    userId.current = (
                      document.getElementById("participant") as HTMLInputElement
                    ).value;
                    logging.current = (
                      document.getElementById("logging") as HTMLInputElement
                    ).checked;

                    const { numbers, bools, stage, expIdx } =
                      await generateOrder(
                        sessionId.current,
                        userId.current,
                        logging.current,
                        maxItems
                      );

                    itemOrder.current = numbers;
                    itemPhotography.current = bools;
                    setVeiwingIdx(expIdx);
                    console.log("Page retreived from db:", stage);
                    setVisiblePage(stage);
                  }}
                >
                  Start Experiment
                </button>
              </CenteringDiv>
            </KeyboardAwareScrollContainer>
          </>
        )}

        {visiblePage === "DemographicsPage" && (
          <DemographicsPage
            setVisiblePage={setVisiblePage}
            docRef={getDocRef()}
          ></DemographicsPage>
        )}

        {visiblePage === "InstructionPage" && (
          <InstructionPage setVisiblePage={setVisiblePage}></InstructionPage>
        )}

        {visiblePage === "ExperimentPage" && (
          <>
            <ExperimentPage
              logging={logging.current}
              itemOrder={itemOrder.current}
              itemPhotography={itemPhotography.current}
              nextPage={setVisiblePage}
              participantId={userId.current}
              sessionId={sessionId.current}
              setVeiwingIdx={setVeiwingIdx}
              itemVeiwingIdx={ItemVeiwingIdx}
            ></ExperimentPage>
          </>
        )}

        {visiblePage === "distractor" && (
          <>
            <DistractorPage setVisiblePage={setVisiblePage}></DistractorPage>
          </>
        )}

        {visiblePage === "recall" && (
          <RecallPage
            setVisiblePage={setVisiblePage}
            sessionId={sessionId.current}
            participantId={userId.current}
          ></RecallPage>
        )}

        {visiblePage === "PostSurvey" && (
          <>
            <PostSurveyPage
              setVisiblePage={setVisiblePage}
              docRef={getDocRef()}
            ></PostSurveyPage>
          </>
        )}

        {visiblePage === "end" && <EndPage></EndPage>}
      </>
    </FullscreenButton>
  );
};
export default Experiment;
