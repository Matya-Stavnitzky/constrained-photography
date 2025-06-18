import "../styles/movingDot.css";

type RovingDotProps = {
  transparent?: boolean;
  circleDim: string;
};

const RovingDot = ({ transparent = false, circleDim }: RovingDotProps) => {
  let classname;
  if (transparent) {
    classname = "reveal";
  } else {
    classname = "cover";
  }

  return (
    <div>
      <div
        className="x"
        style={
          {
            "--x-speed": "1s",
            "--width": circleDim,
          } as React.CSSProperties
        }
      >
        <div
          className={`x y dot ${classname}`}
          style={
            {
              "--y-speed": "1.4s",
              "--width": circleDim,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

export default RovingDot;
