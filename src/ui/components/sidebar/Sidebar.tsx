import React, { useState, useEffect } from 'react';
import { Namespace } from '../../../types/Namespace';
import { useNamespaceContext } from '../../context/namespace/NameSpaceContext';
import podsData from '../../../data-mock/pod.json'; // mi mock de pods
import SidebarLink from './SidebarLink';
import { PodService } from '../../../services/PodService' // ajusta la ruta si es necesario

const podService = new PodService();


function Sidebar() {
  const { namespacesState: {namespaces}, refreshNamespaces } = useNamespaceContext();
  const [pods, setPods] = useState<{ [namespace: string]: string[] }>({});
  const [loadingPods, setLoadingPods] = useState<{ [namespace: string]: boolean }>({});
  const [expanded, setExpanded] = useState<{ [namespace: string]: boolean }>({});

  


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
    const fetchPods = async () => {
      const newPods: { [namespace: string]: string[] } = {};
      const newLoading: { [namespace: string]: boolean } = {};
  
      for (const ns of namespaces) {
        newLoading[ns.nombre] = true;
        try {
          const podList = await podService.listPods(ns.nombre); // ya es string[]
          newPods[ns.nombre] = podList;
        } catch (err) {
          console.error(`Error fetching pods for namespace ${ns.nombre}:`, err);
          newPods[ns.nombre] = [];
        } finally {
          newLoading[ns.nombre] = false;
        }
      }
  
      setPods(newPods);
      setLoadingPods(newLoading);
    };
  
    fetchPods();
  }, [namespaces]);
  
  
  return (
    <aside style={{
      width: '256px', 
      display: 'flex',
      flexDirection: 'column',
      //background: '#333', 
      background: '#252628',
      color: 'white', 
      border: '1px solid white', 
      }}>
      
      <div>
        <SidebarLink route='/' title='Home' />
      </div>
        
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
                      <SidebarLink route={`/pod/${ns.nombre}/${pod}`} title={pod} /> 
                    ))}
                  </ul>
                )}

              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <SidebarLink route='/settings' title='Settings TEMP' />
      </div>
    </aside>
  );
}

export default Sidebar;