import { useState } from "react";
import { Namespace } from "../types/Namespace";
import { useNamespaceContext } from "../ui/context/namespace/NameSpaceContext";

function SettingsPage() {
//   const { namespace, podName } = useParams();
  const { addNamespace } = useNamespaceContext();

  
  const [greetMsg, setGreetMsg] = useState("");
  
  const [name, setName] = useState("");

  async function handleClickAddKubectlPath() {
    const newNamespace: Namespace = {
      nombre: name,
      pods: []
    }
    setGreetMsg(newNamespace?.nombre)
    addNamespace(newNamespace)
  }


  return (
    <div className="container">
    <div>
        <h1>Settings</h1>
    </div>

    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        handleClickAddKubectlPath();
      }}
    >
      <input
        id="Namespace"
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Enter kubectl path"
      />
      <button type="submit">Add</button>
    </form>
    <p>kubectl: {greetMsg}</p>
  </div>
  );
}

export default SettingsPage;