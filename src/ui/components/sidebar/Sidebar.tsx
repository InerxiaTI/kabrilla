// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { Namespace } from '../../../types/Namespace';
import { NamespaceController } from '../../../controllers/NamespaceController';
import { FileService } from '../../../services/FileService';
import { useNamespaceContext } from '../../context/namespace/NameSpaceContext';
import podsData from '../../../data-mock/pod.json'; // mi mock de pods
import { Link, useLocation } from 'react-router-dom';


function Sidebar() {
  const { namespacesState: {namespaces}, refreshNamespaces } = useNamespaceContext();
  const [pods, setPods] = useState<{ [namespace: string]: string[] }>({});
  const [loadingPods, setLoadingPods] = useState<{ [namespace: string]: boolean }>({});
  const [expanded, setExpanded] = useState<{ [namespace: string]: boolean }>({});
  const location = useLocation();
  console.log("current path "+location.pathname);
  


  const handleNamespaceClick = (namespace: Namespace) => {
    // Lógica para manejar el clic en un namespace
    console.log('Namespace clicked:', namespace);
  };

  const handleNamespaceClick2 = (namespace: Namespace) => {
    console.log('Namespace clicked:', namespace);

    setExpanded(prev => ({ ...prev, [namespace.nombre]: !prev[namespace.nombre] }));
  };

  const handleRefreshNs = () => {
    console.log(' ################### REFRESH');

    refreshNamespaces()
  }

  useEffect(() => {
    setPods({})
    console.log("data pods: "+JSON.stringify(podsData));
    
    // Cargar los pods en segundo plano
    namespaces.forEach(ns => {
      setLoadingPods(prev => ({ ...prev, [ns.nombre]: true }));
      setTimeout(() => { // Simula la carga demorada
        const namespacePods = podsData[ns.nombre] || []; 
        setPods(prev => ({ ...prev, [ns.nombre]: namespacePods }));
        setLoadingPods(prev => ({ ...prev, [ns.nombre]: false }));
      }, 1500); // Simula un retraso de 1 segundo
    });
  }, [namespaces]);

  return (
    <aside style={{
      width: '256px', 
      display: 'flex',
      flexDirection: 'column',
      //background: '#333', 
      background: '#252628',
      color: 'white', 
      border: '0px solid red', 
      }}>
      
      <div className={(location.pathname == '/'? 'active': '')}>
        <Link to={'/'}>Go to HOME</Link>
      </div>
        
      <div
        style={{
          border: '0px solid green',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          padding: '10px'
        }}
      >
        <text style={{fontWeight: 'bold'}}>Namespaces</text>
        <button onClick={handleRefreshNs}>Refresh</button>
      </div>

      <span style={{borderBottom: '1px solid #333455'}}></span>

      <div style={{
        border: '0px solid blue',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',

      }}>
       
        <nav style={{border: '0px solid green'}}>
          <ul style={{
            display: 'flex', 
            flexDirection: 'column',
            gap: 10
          }}>
            {namespaces.map((ns, index) => (
              <li
                key={index}
                style={{border: '0px solid red' }}
              >
                <div style={{display: 'flex', flexDirection: 'column'}} onClick={() => handleNamespaceClick2(ns)}>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '0px solid red'}}>
                    <span>{ns.nombre}</span>
                    <span style={{ marginRight: '0px' }}>
                      {expanded[ns.nombre] ? '▼' : '▶'} {/* Icono de flecha */}
                    </span>
                  </div>
                  {loadingPods[ns.nombre] && <span>Cargando pods...</span>}
                </div>

                {expanded[ns.nombre] && pods[ns.nombre] && (
                  <ul>
                    {pods[ns.nombre].map((pod, podIndex) => (
                      <li key={podIndex} className={(location.pathname == `/pod/${ns.nombre}/${pod}`? 'active': '')}>
                        <Link to={`/pod/${ns.nombre}/${pod}`}>
                          {pod}
                        </Link>
                      </li>
                      
                    ))}
                  </ul>
                )}

              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;