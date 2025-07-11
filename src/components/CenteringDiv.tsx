import styled from "styled-components";

const CenteringDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5vh;
  height: 100vh;
  width: 100%;
`;

const ScrollingCenteringDive = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5vh;
  margin: 5vh 0 5vh 0;
`;

export default CenteringDiv;
export { ScrollingCenteringDive };
