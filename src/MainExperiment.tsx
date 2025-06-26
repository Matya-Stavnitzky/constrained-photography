import React, { useEffect, useRef } from "react";
import InstructionPage from "./experimentPages/InstructionPage";
import CenteringDiv, { ScrollingCenteringDive } from "./components/CenteringDiv";
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
  const defaultStage = "InstructionPage";

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
  const maxItems = 6; // Maximum number of items in the experiment
  const [visiblePage, setVisiblePage] = React.useState("SetUpPage");
  const [ItemVeiwingIdx, setVeiwingIdx] = React.useState(0);

  const sessionId = useRef<string>("");
  const userId = useRef<string>("");
  const logging = useRef<boolean>(false);

  let itemOrder = useRef<number[]>([]);
  let itemPhotography = useRef<boolean[]>([]);

  //Update the visible page in the db when it is changed
  useEffect(() => {
    const updateStage = async () => {
      console.log("Updating stage to:", visiblePage);
      if (sessionId.current && userId.current) {
        const q = query(
          collection(db, "ItemOrder"),
          where("sessionId", "==", sessionId.current),
          where("userId", "==", userId.current)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, { stage: visiblePage });
        }
      }
    };
    updateStage();
  }, [visiblePage]);

  //Update the ItemViewingIdx in the db when it is changed
  useEffect(() => {
    const updateStage = async () => {
      if (sessionId.current && userId.current) {
        const q = query(
          collection(db, "ItemOrder"),
          where("sessionId", "==", sessionId.current),
          where("userId", "==", userId.current)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, { expIdx: ItemVeiwingIdx });
        }
      }
    };
    updateStage();
  }, [ItemVeiwingIdx]);

  return (
    // <FullscreenButton>
    <>
      {visiblePage === "SetUpPage" && (
        <>
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

                const { numbers, bools, stage, expIdx } = await generateOrder(
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
        </>
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

      {visiblePage === "end" && (
        <ScrollingCenteringDive>
          <h1>Experiment Complete</h1>
          <p>
            Thank you for participating in our study. This experiment examines
            how taking photos in different ways impacts different cognitive
            aspects.{" "}
          </p>
          <p>
            This study has been reviewed and received ethics clearance through a
            University of Waterloo Research Ethics Board (REB# 47599). If you
            have questions for the Board, contact the Office of Research Ethics,
            toll-free at 1-833-643-2379 (Canada and USA), 1- 519-888-4440, or
            reb@uwaterloo.ca. For all other questions contact a member of the
            research team listed below.
          </p>

          <p>Please remember that the data set
            without identifiers may be shared publicly. Your identity will be
            confidential. Once all the data are collected and analyzed for this
            project, we plan on sharing this information with the research
            community through seminars, conferences, presentations, and journal
            articles. If you are interested in receiving more information
            regarding the results of this study, or would like a summary of the
            results, please contact the researchers, and when the study is
            completed, we will send you the information. In the meantime, if you
            have any questions about the study, please do not hesitate to
            contact a member of the research team listed below. 
            </p>

            <p>
            Sincerely, <br></br>
            Nikhita Joshi, PhD Student, nvjoshi@uwaterloo.ca <br></br>
            Matya Stavnitzky, Undergraduate Research Fellow, mstavnit@uwaterloo.ca <br></br>
            Dr. Daniel Vogel, Professor, 519-888-4567 ext. 33561, dvogel@uwaterloo.ca
            School of Computer Science, University of Waterloo
            </p>
            
        </ScrollingCenteringDive>
      )}
    </>
    // </FullscreenButton>
  );
};
export default Experiment;
