import type React from "react";
import CenteringDiv from "../components/CenteringDiv";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import KeyboardAwareScrollContainer from "../components/KeyboardAwareScrollContainer";

type RecallPageProps = {
  setVisiblePage: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string; // Optional prop for session ID
  participantId: string; // Optional prop for participant ID
};

const RecallPage: React.FC<RecallPageProps> = ({
  setVisiblePage,
  sessionId,
  participantId,
}) => {

  const handleSubmit = async () => {
    const recallText = (
      document.getElementById("recallText") as HTMLInputElement
    ).value;
    const q = query(
      collection(db, "ItemOrder"),
      where("sessionId", "==", sessionId),
      where("userId", "==", participantId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { recall: recallText });
    }

    setVisiblePage("PostSurvey");
  };

  return (
    <>
      <KeyboardAwareScrollContainer>
        <CenteringDiv>
          <h1>Recall Task</h1>
          <p>
            Please write the names of as many items as you can remember. If you
            cannot remember the name of an item you can describe the item.
          </p>
          <textarea
            style={{
              outlineColor: "black",
              width: "90%",
              boxSizing: "border-box",
              resize: "vertical",
            }}
            rows={15}
            placeholder="Type your answers here..."
            id="recallText"
          ></textarea>

          <button
            type="submit"
            style={{
              fontSize: 16,
              marginTop: 24,
              minWidth: 120,
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </CenteringDiv>
      </KeyboardAwareScrollContainer>
    </>
  );
};

export default RecallPage;
