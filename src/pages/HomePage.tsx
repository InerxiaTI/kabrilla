import { useState } from "react";
import { Namespace } from "../types/Namespace";
import { useNamespaceContext } from "../ui/context/namespace/NameSpaceContext";
import PageContainer from "../ui/components/PageContainer";

function HomePage() {
  const [name, setName] = useState("");
  const [greetMsg, setGreetMsg] = useState("");

  const { addNamespace } = useNamespaceContext();

  async function handleClickAddNameSpace() {
    const newNamespace: Namespace = { nombre: name, pods: [] };
    setGreetMsg(newNamespace?.nombre);
    addNamespace(newNamespace);
  }

  return (
    <PageContainer>
      <h1>Welcome to kabrilla</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleClickAddNameSpace(); }}>
        <input
          id="Namespace"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a namespace"
        />
        <button type="submit">Add</button>
      </form>
      <p>texto: {greetMsg}</p>
    </PageContainer>
  );
}

export default HomePage
