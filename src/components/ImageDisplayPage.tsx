import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
//import { useLocation } from "react-router";
import styled from "styled-components";

const Img = styled.img`
  height: 100%;
  top: 50%;
`;

const ImgBar = styled.img<{ $middle?: boolean }>`
  width: 12.5%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
  image-orientation: from-image;
  margin: ${props => props.$middle ? "1%" : "0"};
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 15%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5%;
  padding: 0.5% 0% 0.5% 0%;

  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SpaceHolder = styled.div`
  min-width: 50%;
  width: 50%;
  height: 100%;
`;

interface ImageDisplayPageProps {
  takenPhotos: { current: string[] };
  setShowImages: Dispatch<SetStateAction<boolean>>;
  
}

const ImageDisplayPage = ({
  takenPhotos,
  setShowImages,
}: ImageDisplayPageProps) => {
  const otherImages = takenPhotos?.current; //photos from the CameraPage

  const [pictureIdx, setPictureIdx] = useState(0); // index of the currently displayed picture
  const barRef = useRef<HTMLDivElement>(null); // to access and change the picture display bar

  const scrollUpdateWasRequested = useRef(false); // to check if scroll is from user

  // Scroll the bar to center the clicked image
  const scrollToCenter = (index: number) => {
    const bar = barRef.current;
    if (!bar) return;

    const imgNodes = Array.from(bar.querySelectorAll("img"));
    const img = imgNodes[index];
    if (!img) return;
    const barRect = bar.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const imgCenter = img.offsetLeft + imgRect.width / 2;
    const barCenter = barRect.width / 2;

    scrollUpdateWasRequested.current = true;
    bar.scrollTo({
      left: imgCenter - barCenter,
      behavior: "smooth",
    });
    // Reset scrollUpdateWasRequested after scrolling is finished
    setTimeout(() => {
      scrollUpdateWasRequested.current = false;
    }, 250); // 500ms should be enough for smooth scroll to finish
  };

  // Scroll event handler to update the main image based on the centered thumbnail
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScrollHandler = () => {
      if (!scrollUpdateWasRequested.current) {
        const barRect = bar.getBoundingClientRect();
        const center = bar.scrollLeft + barRect.width / 2;

        const imgNodes = Array.from(bar.querySelectorAll("img"));
        let minDist = Infinity;
        let closestIdx = 0;
        imgNodes.forEach((img, idx) => {
          const imgRect = img.getBoundingClientRect();
          const imgCenter = img.offsetLeft + imgRect.width / 2;
          const dist = Math.abs(imgCenter - center);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });
        setPictureIdx(closestIdx);
      }
    };

    bar.addEventListener("scroll", onScrollHandler);
    return () => bar.removeEventListener("scroll", onScrollHandler);
  }, [otherImages.length]);

  //Main return statement
  return (
    <>
      <Img
        src={otherImages[pictureIdx]}
        alt="Captured"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onClick={() => {
          //history.back();
          setShowImages(false);
        }}
      />

      {otherImages.length > 1 && (
        <BottomBar ref={barRef}>
          <SpaceHolder>
            {" "}
            <h1></h1>
          </SpaceHolder>
          <h2></h2>
          {otherImages.map((item: string, index: number) => (
            <ImgBar
              //TO do add some sort of ref here & then modify the one in center using that ref later?
              key={item}
              src={item}
              alt="Other captured"
              onClick={() => {
                setPictureIdx(index);
                scrollToCenter(index);
              }}
            />
          ))}
          <SpaceHolder></SpaceHolder>
        </BottomBar>
      )}
    </>
  );
};

export default ImageDisplayPage;
