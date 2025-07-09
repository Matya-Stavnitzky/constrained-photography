import {
  DocumentReference,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import CenteringDiv from "../components/CenteringDiv";
import React, {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

//MAKE SURE TO LOG THE DEMOGRAPHICS IN FIREBASE
//PASS THE DOCREF TO THIS PAGE
type DemographicsPageProps = {
  setVisiblePage: Dispatch<SetStateAction<string>>;
  docRef: Promise<DocumentReference<DocumentData, DocumentData> | null>; // Reference to the document in Firestore
};

const DemographicsPage: React.FC<DemographicsPageProps> = ({
  setVisiblePage,
  docRef,
}) => {
  const divStyle: React.CSSProperties = {
    marginTop: "1vh",
    marginLeft: "5vw",
    marginRight: "5vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "90%",
  };

  const age = useRef<string>(null);
  const [gender, setGender] = useState<string>("");
  const [otherGender, setOtherGender] = useState<string>("");
  const [photoFrequency, setPhotoFrequency] = useState<string>("");
  const [otherPhotoFrequency, setOtherPhotoFrequency] = useState<string>("");
  const [showError, setShowError] = useState<string>("");

  const logInfo = async (docRef: DocumentReference<DocumentData>) => {
    if (gender === "other" && otherGender.trim() !== "") {
      await updateDoc(docRef, { gender: otherGender });
    } else {
      await updateDoc(docRef, { gender: gender });
    }

    if (photoFrequency === "other" && otherPhotoFrequency.trim() !== "") {
      await updateDoc(docRef, { photoFrequency: otherPhotoFrequency });
    } else {
      await updateDoc(docRef, { photoFrequency: photoFrequency });
    }
    await updateDoc(docRef, { age: age.current });
  };

  const [resolvedDocRef, setResolvedDocRef] =
    useState<DocumentReference<DocumentData> | null>(null);

  useEffect(() => {
    const fetchDocRef = async () => {
      const ref = await docRef;
      setResolvedDocRef(ref);
    };
    fetchDocRef();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <CenteringDiv>
        <h1>Pre-Questionaire</h1>

        <div style={divStyle}>
          <label>
            How old are you?
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              style={{ marginLeft: "8px", marginRight: "8px" }}
              onChange={(e) => (age.current = e.target.value)}
            />
          </label>
        </div>

        <div style={divStyle}>
          <label>What is your gender?</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="woman"
                checked={gender === "woman"}
                onChange={() => setGender("woman")}
              />{" "}
              Woman
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="man"
                checked={gender === "man"}
                onChange={() => setGender("man")}
              />{" "}
              Man
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="non-binary"
                checked={gender === "non-binary"}
                onChange={() => setGender("non-binary")}
              />{" "}
              Non-binary
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="prefer-not-to-disclose"
                checked={gender === "prefer-not-to-disclose"}
                onChange={() => setGender("prefer-not-to-disclose")}
              />{" "}
              Prefer not to disclose
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={() => setGender("other")}
              />{" "}
              Other
              <input
                type="text"
                name="gender-other"
                placeholder="Please specify"
                style={{ marginLeft: "5px" }}
                disabled={gender !== "other"}
                value={gender === "other" ? otherGender : ""}
                onChange={(e) => setOtherGender(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div style={divStyle}>
          <label>How frequently do you use your phone to take photos?</label>
          <div>
            <label>
              <input
                type="radio"
                name="photo-frequency"
                checked={photoFrequency === "daily"}
                onChange={() => setPhotoFrequency("daily")}
              />{" "}
              Daily
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="photo-frequency"
                checked={photoFrequency === "weekly"}
                onChange={() => setPhotoFrequency("weekly")}
              />{" "}
              Weekly
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="photo-frequency"
                checked={photoFrequency === "monthly"}
                onChange={() => setPhotoFrequency("monthly")}
              />{" "}
              Monthly
            </label>
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                name="photo-frequency"
                checked={photoFrequency === "other"}
                onChange={() => setPhotoFrequency("other")}
              />{" "}
              Other
              <input
                type="text"
                name="photo-frequency-other"
                placeholder="Please specify"
                style={{
                  marginLeft: "5px",
                  flex: 1,
                  transition: "scroll 0.3s",
                }}
                disabled={photoFrequency !== "other"}
                value={photoFrequency === "other" ? otherPhotoFrequency : ""}
                onFocus={(e) => {
                  // Scroll the input into view when focused (especially on mobile)
                  setTimeout(() => {
                    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 300); // Delay to allow keyboard to open
                }}
                onChange={(e) => setOtherPhotoFrequency(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div style={{ color: "red", marginLeft: "5vw", marginRight: "5vw" }}>
          {showError}
        </div>

        <button
          onClick={() => {
            if (
              gender === "" ||
              photoFrequency === "" ||
              age.current === null ||
              age.current === ""
            ) {
              setShowError("Please fill out all fields.");
              return;
            }

            if (gender === "other" && otherGender.trim() === "") {
              setShowError(
                "You have selected 'Other' for your gender. Please specify."
              );
              return;
            }

            if (
              photoFrequency === "other" &&
              otherPhotoFrequency.trim() === ""
            ) {
              setShowError(
                "You have selected 'Other' for your photo frequency. Please specify."
              );
              return;
            }
            if (resolvedDocRef) {
              logInfo(resolvedDocRef);
            }
            setVisiblePage("InstructionPage");
          }}
        >
          Submit
        </button>
      </CenteringDiv>
    </>
  );
};

export default DemographicsPage;
