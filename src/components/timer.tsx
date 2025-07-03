import { useTimer } from "react-timer-hook";
import styled from "styled-components";

const Text = styled.h2`
    color: ${(props) => props.color || "#353535"};
    display: inline;
`

type TimerProps = {
  timeS: number;
  onExpire: () => void;
  color?: string;
};

const MyTimer: React.FC<TimerProps> = ({ timeS, onExpire, color }) => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeS);

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
    autoStart: true,
  });

  const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Text color={color}>{formatTime(minutes)}:{formatTime(seconds)}</Text>
      {/* <div>
        <span>{formatTime(minutes)}</span>
        <h2 style={{ color: fontColor, display:"inline" }}>:</h2>
        <span>{formatTime(seconds)}</span>
      </div> */}
    </div>
  );
};

export default MyTimer;
