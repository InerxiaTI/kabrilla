import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Sidebar from "./ui/components/sidebar/Sidebar";
import { Namespace } from "./types/Namespace";
import { FileService } from "./services/FileService";
import { NamespaceController } from "./controllers/NamespaceController";
import { useNamespaceContext } from "./ui/context/namespace/NameSpaceContext";

function App() {
  const { addNamespace } = useNamespaceContext();

  
  const [greetMsg, setGreetMsg] = useState("");
  
  const [name, setName] = useState("");

  async function handleClickAddNameSpace() {
    const newNamespace: Namespace = {
      nombre: name,
      pods: []
    }
    setGreetMsg(newNamespace?.nombre)
    addNamespace(newNamespace)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main className="container">
        <h1>Welcome to kabrilla</h1>

        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            handleClickAddNameSpace();
          }}
        >
          <input
            id="Namespace"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a namespace"
          />
          <button type="submit">Add</button>
        </form>
        <p>{greetMsg}</p>
      </main>
    </div> 
  );
}

export default App;
