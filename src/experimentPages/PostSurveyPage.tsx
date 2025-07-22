import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  DocumentReference,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import KeyboardAwareScrollContainer from "../components/KeyboardAwareScrollContainer";
import CenteringDiv from "../components/CenteringDiv";

type PostSurveyPageProps = {
  setVisiblePage: Dispatch<SetStateAction<string>>;
  docRef: Promise<DocumentReference<DocumentData, DocumentData> | null>;
};

// const frequencyOptions = [
//   "Multiple times a day",
//   "Once a day",
//   "A few times a week",
//   "Once a week",
//   "Less than once a week",
// ];

const PostSurveyPage: React.FC<PostSurveyPageProps> = ({
  setVisiblePage,
  docRef,
}) => {
  const [enjoyment, setEnjoyment] = useState<number>(5);
  const [attachment, setAttachment] = useState<number>(5);
//   const [favouritePart, setFavouritePart] = useState<string>("");
//   const [frequency, setFrequency] = useState<string>("");
//   const [attachmentReason, setAttachmentReason] = useState<string>("");
  const [showError, setShowError] = useState<string>("");

  // Logging function
  const logInfo = async (docRef: DocumentReference<DocumentData>) => {
    await updateDoc(docRef, {
      enjoyment:enjoyment,
      attatchment:attachment,
    //   favouritePart,
    //   frequency,
    //   attachmentReason,
    });
  };

  // Resolve docRef on mount
  const [resolvedDocRef, setResolvedDocRef] =
    useState<DocumentReference<DocumentData> | null>(null);
  useEffect(() => {
    const fetchDocRef = async () => {
      const ref = await docRef;
      setResolvedDocRef(ref);
    };
    fetchDocRef();
  }, [docRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!favouritePart || !frequency || !attachmentReason) {
    //   setShowError("Please answer all required questions.");
    //   return;
    // }
    if (resolvedDocRef) {
      await logInfo(resolvedDocRef);
      setVisiblePage("end");
    } else {
      setShowError("Could not save your responses. Please try again.");
    }
  };

  const divStyle: React.CSSProperties = {
    marginTop: "4vh",
    marginLeft: "5vw",
    marginRight: "5vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "90%",
  };

  return (
    <KeyboardAwareScrollContainer>
      <CenteringDiv>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <h1>Post-Survey</h1>
          </div>

          <div style={divStyle}>
            <label>
              <strong>
                How much did you enjoy the photography
                technique?
              </strong>
              <br />
              <input
                type="range"
                min={1}
                max={10}
                step={0.01}
                value={enjoyment}
                onChange={(e) => setEnjoyment(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "black", // For most modern browsers
                }}
                className="black-slider"
              />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: 12 }}>
                <span>Not at all</span>
                <span>Entirely</span>
              </div>
            </label>
          </div>

          <div style={divStyle}>
            <label>
              <strong>
                How attached did you feel to your photos?
              </strong>
              <br />
              <input
                type="range"
                min={1}
                max={10}
                step={0.01}
                value={attachment}
                onChange={(e) => setAttachment(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "black",
                }}
                className="black-slider"
              />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: 12 }}>
                <span>Not attached</span>
                <span>Very attatched</span>
              </div>
            </label>
          </div>

          {/* <div style={divStyle}>
            <label>
              <strong>
                Why did you feel this level of attachment to your photos?
              </strong>
              <br />
              <textarea
                value={attachmentReason}
                onChange={(e) => setAttachmentReason(e.target.value)}
                rows={3}
                style={{ width: "100%" }}
                required
              />
            </label>
          </div>

          <div style={divStyle}>
            <label>
              <strong>
                What was your favourite part of the photography technique?
              </strong>
              <br />
              <textarea
                value={favouritePart}
                onChange={(e) => setFavouritePart(e.target.value)}
                rows={3}
                style={{ width: "100%" }}
                required
              />
            </label>
          </div>

          <div style={divStyle}>
            <label>
              <strong>How often did you take photos?</strong>
              <br />
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
                style={{ width: "100%" }}
              >
                <option value="" disabled>
                  Select one
                </option>
                {frequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div> */}

          {showError && (
            <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>{showError}</div>
          )}

          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <button
              type="submit"
            //   disabled={!favouritePart || !frequency || !attachmentReason}
              style={{
                fontSize: 16,
                marginTop: 24,
                minWidth: 120,
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </CenteringDiv>
    </KeyboardAwareScrollContainer>
  );
};

export default PostSurveyPage;
