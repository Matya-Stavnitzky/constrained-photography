import type React from "react";
import CenteringDiv from "../components/CenteringDiv";
import MyTimer from "../components/timer";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

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

  const handleExpire = async () => {
    const recallText = (document.getElementById("recallText") as HTMLInputElement).value;
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
    
    setVisiblePage("end");
  };

  return (
    <>
      <CenteringDiv>
        <h1>Recall Task</h1>
        <MyTimer timeS={30} onExpire={() => handleExpire()} />
        <p>
          Please write the names of as many items as you can remember. If you
          cannot remember the name of an item you can describe the item.
        </p>
        <textarea
          style={{
            outlineColor: "black",
            width: "90%",
            boxSizing: "border-box",
            resize: "vertical"
          }}
          rows={15}
          placeholder="Type your answers here..."
          id="recallText"
        ></textarea>
      </CenteringDiv>
    </>
  );
};

export default RecallPage;