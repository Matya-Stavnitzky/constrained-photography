import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ZoomedViewFinder from "./components/ZoomedViewFinder";
import PhotoDiary from "./components/PhotoDiary";
// import DiaryDisplayPage from "./components/DiaryDisplayPage";
import RovingDots from "./components/RovingDotPhoto";
import RovingVeiw from "./components/RovingView";
import Test from "./components/test";
import TinyViewFinder from "./components/TinyViewFinder";
import BugViewFinder from "./components/BugViewFinder";
import "./styles/global.css";
import Experiment from "./MainExperiment";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<PhotoDiary/>} /> The default page  */}
        <Route path="/" element={<Experiment/>} />  {/* TO SET BACK TO DEFAULT BEFORE DEPLOYMENT */}
        <Route path="/ZoomedViewFinder" element={<ZoomedViewFinder logging={false} />} />
        <Route path="/PhotoDiary" element={<PhotoDiary />} />
        {/* <Route path="/DiaryDisplayPage" element={<DiaryDisplayPage />} /> */}
        <Route path="/RovingDot" element={<RovingDots />} />
        <Route path="/RovingView" element={<RovingVeiw />} />
        <Route path="/TinyViewfinder" element={<TinyViewFinder />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/BugViewFinder" element={<BugViewFinder />} />
        {/* Catch-all route to redirect to home page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
