// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { Namespace } from '../../../types/Namespace';
import { NamespaceController } from '../../../controllers/NamespaceController';
import { FileService } from '../../../services/FileService';
import { useNamespaceContext } from '../../context/namespace/NameSpaceContext';

function Sidebar() {
  const { namespacesState: {namespaces} } = useNamespaceContext();

  //const [namespaces, setNamespaces] = useState<Namespace[]>([]);

  /*useEffect(() => {
    async function cargarNamespaces() {
      console.log("============ 1");
      
      const data = await namespaceController.getNamespaces();
      console.log("=== data: "+data);
      
      //setNamespaces(data);
    }
    cargarNamespaces();
  }, []);*/

  const handleNamespaceClick = (namespace: Namespace) => {
    // Lógica para manejar el clic en un namespace
    console.log('Namespace clicked:', namespace);
  };

  return (
    <aside style={{ width: '200px', background: '#333', color: 'white', padding: '20px' }}>
      <ul>
        {namespaces.map((ns) => (
          <li
            key={ns.nombre}
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={() => handleNamespaceClick(ns)}
          >
            {ns.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;