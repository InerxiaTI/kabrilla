// pages/PodPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Namespace } from '../types/Namespace';
import { useNamespaceContext } from '../ui/context/namespace/NameSpaceContext';

function HomePage() {
//   const { namespace, podName } = useParams();
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
    <div className="container">
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
    <p>texto: {greetMsg}</p>
  </div>
  );
}

export default HomePage;