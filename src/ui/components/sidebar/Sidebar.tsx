// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { Namespace } from '../../../types/Namespace';
import { NamespaceController } from '../../../controllers/NamespaceController';
import { FileService } from '../../../services/FileService';
import { useNamespaceContext } from '../../context/namespace/NameSpaceContext';

function Sidebar() {
  const { namespacesState: {namespaces}, refreshNamespaces } = useNamespaceContext();

  const handleNamespaceClick = (namespace: Namespace) => {
    // Lógica para manejar el clic en un namespace
    console.log('Namespace clicked:', namespace);
  };

  const handleRefreshNs = () => {
    console.log(' ################### REFRESH');

    refreshNamespaces()
  }

  return (
    <aside style={{
      width: '256px', 
      display: 'flex',
      flexDirection: 'column',
      background: '#333', 
      color: 'white', 
      border: '1px solid red', 
      }}>
      <div
        style={{
          border: '1px solid green',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          padding: '10px'
        }}
      >
        <text>Namespaces</text>
        <button onClick={handleRefreshNs}>Refresh</button>
      </div>

      <div style={{
        border: '2px solid blue',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        overflowY: 'auto'

      }}>

        <ul>
          {namespaces.map((ns, index) => (
            <li
              key={index}
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => handleNamespaceClick(ns)}
            >
              {ns.nombre}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;