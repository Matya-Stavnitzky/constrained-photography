import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import CenteringDiv from "../components/CenteringDiv";
import MyTimer from "../components/timer";

const MathQuestion = () => {
  const [num1, setNum1] = useState<number>(Math.floor(Math.random() * 13));
  const [num2, setNum2] = useState<number>(Math.floor(Math.random() * 13));
  const answerRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <p>
        What is {num1} x {num2}?
      </p>
      <input type="number" ref={answerRef}/>
      <button
        onClick={() => {
        if(answerRef.current!.value !== "") {
          setNum1(Math.floor(Math.random() * 13));
          setNum2(Math.floor(Math.random() * 13));
            answerRef.current!.value = "";
        }
        }}
      >
        Submit
      </button>
    </>
  );
};

type DistractorPageProps = {
  setVisiblePage: Dispatch<SetStateAction<string>>;
};

const DistractorPage: React.FC<DistractorPageProps> = ({ setVisiblePage }) => {
  const [distractorNav, setDistractorNav] = useState<string>("EndVeiwing");

// //   the amount of time to do this task
//   useEffect(() => {
//     if (distractorNav === "distractorTask") {
//       sleep(10).then(() => {
//         setVisiblePage("recall");
//       });
//     }
//   }, [distractorNav, setVisiblePage]);

  return (
    <>
      {distractorNav === "EndVeiwing" && (
        <CenteringDiv>
          <h1>All Items Seen</h1>
          <p>
            You have completed the veiwing portion of the experiment. Please
            return to the experimenter. Once the experimenter tells you to,
            click the button below to start the next task.
          </p>
          <button onClick={() => setDistractorNav("distractorTask")}>
            Start Next Task
          </button>
        </CenteringDiv>
      )}

      {distractorNav === "distractorTask" && (
        <CenteringDiv>
          <h1>Please answer as many questions as you can</h1>
          <MyTimer timeS={30} onExpire={() => setVisiblePage("recall")}></MyTimer>
          <MathQuestion></MathQuestion>
        </CenteringDiv>
      )}
    </>
  );
};

export default DistractorPage;
