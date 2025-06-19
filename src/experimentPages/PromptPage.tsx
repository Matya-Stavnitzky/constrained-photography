import CenteringDiv from "../components/CenteringDiv";

type PromptPageProps = {
  itemNumber: number;
  setItemNumber: Dispatch<SetStateAction<number>>;
};

const PromptPage: React.FC<PromptPageProps> = ({ itemNumber }) => {
  return (
    <CenteringDiv>
      <h1>Go to item number {itemNumber}</h1>
      <button onClick={() => console.log("Next item")}>
        I have arrived at the item
      </button>
    </CenteringDiv>
  );
};
export default PromptPage;
