import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import CenteringDiv from "../components/CenteringDiv";
import MyTimer from "../components/timer";

const MathQuestion = () => {
  const [num1, setNum1] = useState<number>(Math.floor(Math.random() * 13));
  const [num2, setNum2] = useState<number>(Math.floor(Math.random() * 13));
  const answerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(answerRef.current!.value) === num1 * num2) {
      setNum1(Math.floor(Math.random() * 13));
      setNum2(Math.floor(Math.random() * 13));
      answerRef.current!.value = "";
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <p>
            What is {num1} x {num2}?
          </p>
          <div style={{ display: "flex", gap: "1vw" }}>
            <input
              type="number"
              inputMode="numeric"
              ref={answerRef}
              onFocus={(e) => {
                setTimeout(() => {
                  e.target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }, 100); // slight delay helps on mobile
              }}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
    </div>
  );
};

/**
 * DistractorPage component for the distractor task in the experiment.
 */
type DistractorPageProps = {
  setVisiblePage: Dispatch<SetStateAction<string>>;
};

const DistractorPage: React.FC<DistractorPageProps> = ({ setVisiblePage }) => {
  const [distractorNav, setDistractorNav] = useState<string>("EndVeiwing");
  const distractorTime = 60 * 3; // 3 minutes

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
          <MyTimer
            timeS={distractorTime}
            onExpire={() => setVisiblePage("recall")}
            // onExpire={() => console.log("Timer expired")}
          ></MyTimer>
          <MathQuestion></MathQuestion>
        </CenteringDiv>
      )}
    </>
  );
};

export default DistractorPage;
