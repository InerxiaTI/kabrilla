import "./App.css";
import Layout from "./ui/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PodPage from "./pages/PodPage";
import SettingsPage from "./pages/SettingsPage";
// import { Command } from '@tauri-apps/plugin-shell';
// import { useEffect, useState } from "react";
// import { getCurrentWindow } from "@tauri-apps/api/window";
// import { confirm } from '@tauri-apps/plugin-dialog';
import { getCurrentWindow } from "@tauri-apps/api/window"
import { useEffect } from "react";

function App() {


  // const [message, setMessage] = useState<string>();


  // async function startServer() {

  //   //const unlisten = await setOnCloseRequested()
  
  //   const command = await Command.create("kabrilla-server", []);
  
  //   // Opcional: capturar logs
  //   command.stdout.on("data", (line) => {
  //     console.log("[server]", line);
  //   });
  
  //   command.stderr.on("data", (line) => {
  //     console.error("[server-error]", line);
  //   });
  
  //   await command.spawn();

  //       // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
  //       //unlisten();

  // }
  
  // Llamar al iniciar la app
  useEffect(() => {
    let unlisten: (() => void) | undefined;
  
    const setupCloseHandler = async () => {
      const window = getCurrentWindow();
      unlisten = await window.onCloseRequested(async (event) => {
        const confirmed = await confirm('Are you sure?');
        if (!confirmed) {
          event.preventDefault();
        }
      });
    };
  
    setupCloseHandler();
  
    return () => {
      if (unlisten) unlisten(); // Limpieza cuando el componente se desmonta
    };
  }, []);

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
