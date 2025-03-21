import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Sidebar from "./ui/components/sidebar/Sidebar";
import { Namespace } from "./types/Namespace";
import { FileService } from "./services/FileService";
import { NamespaceController } from "./controllers/NamespaceController";
import { useNamespaceContext } from "./ui/context/namespace/NameSpaceContext";
import Layout from "./ui/layout/Layout";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PodPage from "./pages/PodPage";

function App() {


  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pod/:namespace/:podName" element={<PodPage />} />
          </Routes>
        
        </Layout>
    </BrowserRouter>
  );
}

export default App;
