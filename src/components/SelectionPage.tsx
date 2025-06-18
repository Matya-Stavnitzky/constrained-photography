import styled from "styled-components";

const ButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  height: 20px;
  width: 200px;
  background-color: rgb(4, 68, 31);
  color: #fff;
  font-size: 1.1rem;
  font-family: "Bebas Neue", "Arial", "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  border: none;
  border-radius: 16px;
  margin: 12px 0;
`;

const SelectionPage = () => {
  const alternativeBackground = "pink";
  return (
    <>
      <ButtonHolder>
        <h1>Camera Options</h1>
        <Button
          onClick={() => (window.location.href = "/UnconstrainedCam")}
          style={{ backgroundColor: alternativeBackground }}
        >
          Unconstrained Camera
        </Button>
        <Button
          onClick={() => (window.location.href = "/ZoomedViewFinder")}
          style={{ backgroundColor: alternativeBackground }}
        >
          Zoomed View Finder
        </Button>
        <Button
          onClick={() => (window.location.href = "/PhotoDiary")}
          style={{ backgroundColor: alternativeBackground }}
        >
          Photo Diary
        </Button>
        <Button onClick={() => (window.location.href = "/RovingDot")}>
          Moving Dot
        </Button>
        <Button onClick={() => (window.location.href = "/RovingView")}>
          Roving View
        </Button>
        <Button
          onClick={() => (window.location.href = "/TinyViewfinder")}
          style={{ backgroundColor: alternativeBackground }}
        >
          Tiny View Finder
        </Button>
        <Button onClick={() => (window.location.href = "/BugViewFinder")}>
          Bug View Finder
        </Button>
        <Button onClick={() => (window.location.href = "/test")}>
          Test Camera
        </Button>
      </ButtonHolder>
    </>
  );
};
export default SelectionPage;
