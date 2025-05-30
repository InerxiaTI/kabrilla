import React, { useState, useEffect } from 'react';
import { Namespace } from '../../../types/Namespace';
import { useNamespaceContext } from '../../context/namespace/NameSpaceContext';
import podsData from '../../../data-mock/pod.json'; // mi mock de pods
import SidebarLink from './SidebarLink';
import { PodService } from '../../../services/PodService' // ajusta la ruta si es necesario
import { PodResponseDto } from '../../../types/kubernetes';

const podService = new PodService();


function Sidebar() {
  const { namespacesState: {namespaces}, refreshNamespaces } = useNamespaceContext();
  const [pods, setPods] = useState<{ [namespace: string]: PodResponseDto[] }>({});
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
      for (const ns of namespaces) {
        // Mostrar "Cargando pods..." de una vez
        setLoadingPods(prev => ({ ...prev, [ns.nombre]: true }));
  
        try {
          const podList: PodResponseDto[] = await podService.listPods(ns.nombre);
          setPods(prev => ({ ...prev, [ns.nombre]: podList }));
        } catch (err) {
          console.error(`Error fetching pods for namespace ${ns.nombre}:`, err);
          setPods(prev => ({ ...prev, [ns.nombre]: [] }));
        } finally {
          // Ocultar "Cargando pods..."
          setLoadingPods(prev => ({ ...prev, [ns.nombre]: false }));
        }
      }
    };
  
    fetchPods();
  }, [namespaces]);
  
  
  return (
    <aside style={{
      width: '350px',
      display: 'flex',
      flexDirection: 'column',
      background: '#252628',
      color: 'white',
      border: '0px solid white',
      height: '100vh', // que ocupe todo el alto
      boxSizing: 'border-box',
    }}>
    
      {/* Parte superior: home + título */}
      <div>
        <SidebarLink route='/' title='Home' />
      </div>
    
      <div style={{
        border: '0px solid green',
        borderBottom: '1px solid #444',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
      }}>
        <span style={{ fontWeight: 'bold' }}>Namespaces</span>
        <button onClick={handleRefreshNs}>Refresh</button>
      </div>
    
    
      {/* Contenido scrollable */}
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: '10px',
        border: '0px solid blue'
      }}>
        <nav>
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: 0,
            margin: 0,
            listStyle: 'none'
          }}>
            {namespaces.map((ns, index) => (
              <li key={index} style={{ border: '0px solid red' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => handleNamespaceClick2(ns)}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <span>{ns.nombre}</span>
                    <span>{expanded[ns.nombre] ? '▼' : '▶'}</span>
                  </div>
                  {loadingPods[ns.nombre] && <span style={{ fontSize: '0.9em', color: '#aaa' }}>Cargando pods...</span>}
                  </div>
                {expanded[ns.nombre] && pods[ns.nombre] && (
                  <ul style={{ paddingLeft: '15px' }}>
                    {pods[ns.nombre].map((pod, podIndex) => (
                      <SidebarLink key={podIndex} route={`/pod/${ns.nombre}/${pod.name}/${pod.containers[0].name}`} title={`${pod.name} - ${pod.status}`} />
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    
      {/* Parte inferior fija */}
      <div style={{ borderTop: '1px solid #444', padding: '10px' }}>
        <SidebarLink route='/settings' title='Settings' />
      </div>
    
    </aside>
    
  );
}

export default Sidebar;