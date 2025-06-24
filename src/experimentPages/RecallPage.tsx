import type React from "react";
import { useEffect } from "react";
import sleep from "../components/sleep";
import CenteringDiv from "../components/CenteringDiv";

type RecallPageProps = {
  setVisiblePage: React.Dispatch<React.SetStateAction<string>>;
};

const RecallPage: React.FC<RecallPageProps> = ({ setVisiblePage }) => {
  //   the amount of time to do this task
  useEffect(() => {
    sleep(10).then(() => {
      setVisiblePage("end");
    });
  }, [setVisiblePage]);

  return (
    <>
      <CenteringDiv>
        <h1>Recall Task</h1>
        <p>Please write the names of as many items as you can remember. If you cannot remember the name of an item you can describe the item.</p>
        <textarea
          rows={20}
          cols={50}
          placeholder="Type your answers here..."
        ></textarea>
      </CenteringDiv>
    </>
  );
};

export default RecallPage;
