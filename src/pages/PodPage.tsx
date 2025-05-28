import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PodService } from '../services/PodService' // ajusta la ruta si es necesario

function PodPage() {
  const { namespace, podName } = useParams();
  const [logs, setLogs] = useState<string>('Cargando logs...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!namespace || !podName) return;

      const podService = new PodService();
      try {
        console.log(`Obteniendo logs para pod ${podName} en namespace ${namespace}`);
        const logData = await podService.getPodLogs(namespace, podName);
        setLogs(logData);
      } catch (err: any) {
        console.error('Error fetching logs:', err);
        setError(err.toString());
      }
    };

    fetchLogs();
  }, [namespace, podName]);

  return (
    <div className="container2">

      {/* <h1>Pod: {podName}</h1>
      <p>Namespace: {namespace}</p>
      <div style={{
        flexGrow: 1,                 // Ocupa el espacio restante
        overflowY: 'auto',
        overflowX: 'hidden',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        color: '#dcdcdc',
        boxSizing: 'border-box'
      }}>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          logs
        )}
      </div> */}
    </div>
  );
}

export default PodPage;
