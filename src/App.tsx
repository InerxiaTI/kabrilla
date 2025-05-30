import "./App.css";
import Layout from "./ui/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PodPage from "./pages/PodPage";
import SettingsPage from "./pages/SettingsPage";

function App() {


  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pod/:namespace/:podName/:container" element={<PodPage />} />
            <Route path="/settings" element={<SettingsPage />} />


          </Routes>
        
        </Layout>
    </BrowserRouter>
  );
}

export default App;
