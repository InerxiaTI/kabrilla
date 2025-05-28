import React, { useState } from 'react';

function KubernetesDashboard() {
  const [region, setRegion] = useState('');
  const [clusterName, setClusterName] = useState('');
  const [namespace, setNamespace] = useState('default');
  const [pods, setPods] = useState([]);
  const [logs, setLogs] = useState('');
  const [selectedPod, setSelectedPod] = useState('');
  const [loadingPods, setLoadingPods] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [error, setError] = useState('');

  // const handleGetPods = async () => {
  //   setLoadingPods(true);
  //   setError('');
  //   setPods([]);
  //   try {
  //     //const podList = await getPods( region, clusterName, namespace );
  //     const podList = await invoke('getPods', { region, clusterName, namespace });

  //     setPods(podList.items);
  //   } catch (err) {
  //     setError(err.toString());
  //   } finally {
  //     setLoadingPods(false);
  //   }
  // }; 

//   const handleGetPodLogs = async (podName: any) => {
//     setLoadingLogs(true);
//     setError('');
//     setLogs('');
//     setSelectedPod(podName);
//     try {
//       const podLogs = await getPodLogs(region, clusterName, namespace, podName);
        //const podLogs = await invoke('getPodLogs', { region, clusterName, namespace, podName });

//       setLogs(podLogs);
//     } catch (err) {
//       setError(err.toString());
//     } finally {
//       setLoadingLogs(false);
//     }
//   };
const handleGetPods = async() => {
  console.log("Hola");
  
}

  return (
    <div>
      <h2>Dashboard de Kubernetes</h2>
      <div>
        <label>Región de AWS:</label>
        <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
      </div>
      <div>
        <label>Nombre del Clúster EKS:</label>
        <input type="text" value={clusterName} onChange={(e) => setClusterName(e.target.value)} />
      </div>
      <div>
        <label>Namespace:</label>
        <input type="text" value={namespace} onChange={(e) => setNamespace(e.target.value)} />
      </div>
      <button onClick={handleGetPods} disabled={loadingPods}>
        {loadingPods ? 'Cargando Pods...' : 'Obtener Pods'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      
      {logs && selectedPod && (
        <div>
          <h3>Logs del Pod: {selectedPod}</h3>
          <pre>{logs}</pre>
        </div>
      )}
    </div>
  );
}

export default KubernetesDashboard;