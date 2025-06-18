import styled from "styled-components";

const SquareContainer = styled.div`
  height: 70%;
  aspect-ratio: 1/1;
  position: relative;
`;
const Ring = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  ratio: 1/1;
  border-radius: 100%;
  border: 0.5em solid #ffffff; //TO DO: right now this looks strange on different sized screens or when horisontal
  opacity: 0.8;

  ${SquareContainer}:active & {
    opacity: 1;
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 15%;
  left: 15%;
  bottom: 15%;
  right: 15%;
  border-radius: 100%;
  background-color: #ffffff;
  opacity: 1;
  ratio: 1/1;

  ${SquareContainer}:active & {
    opacity: 0.5;
  }
`;

type TakePhotoButtonProps = {
  onClick: () => void;
};

const TakePhotoButton: React.FC<TakePhotoButtonProps> = ({
  onClick: OnClickFunction,
}) => {
  return (
    <>
      <SquareContainer
        onClick={() => {
          OnClickFunction();
        }}
      >
        <Ring></Ring>
        <Circle></Circle>
      </SquareContainer>
    </>
  );
};

export default TakePhotoButton;
