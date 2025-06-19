
type ItemProcedureProps = {
    maxItemNumber: number;
    itemNumber: number;
    takePhotos: boolean;
    setVisiblePage: React.Dispatch<React.SetStateAction<string>>;
}

const ItemProcedure: React.FC<ItemProcedureProps> = ({ maxItemNumber, itemNumber, takePhotos, setVisiblePage }) => {
    
    if (itemNumber >= maxItemNumber) {
        const nextPage = ""; //DO DO Determine what the next page is
    } else {
        const nextPage = `item${itemNumber + 1}Page`;
    }

    return (
        <>
            {
        </>
    );
};