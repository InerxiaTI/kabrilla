import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PodService } from '../services/PodService';
import PageContainer from '../ui/components/PageContainer';

function PodPage() {
  const { namespace, podName } = useParams();
  //const [logs, setLogs] = useState<string>('Cargando logs...');
  const [error, setError] = useState<string | null>(null);

  const [logs, setLogs] = useState<string[]>(["Cargando logs..."]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startStreaming = () => {
    const state = ["Cargando logs..."]
    setLogs(state)
    if (eventSource) return; // ya está activo
  
    const es = new EventSource(`http://localhost:26913/kabrilla-server/api/v1/kubernetes/logs/stream?namespace=${namespace}&podName=${podName}`);
  
    es.onmessage = (event) => {
      //setLogs([])
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };
  
    es.onerror = (err) => {
      console.error('Log stream error:', err);
      es.close();
      setEventSource(null);
      setIsStreaming(false);
    };
  
    setEventSource(es);
    setIsStreaming(true);
  };

  const stopStreaming = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  useEffect(() => {
    // Cuando cambie el pod o namespace, cerramos el stream si existe
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setIsStreaming(false);
    }
  
    // Limpiar logs al cambiar de pod
    setLogs(["Cargando logs..."]);
  }, [namespace, podName]);
  


  return (
    <PageContainer>
      <h1>Pod: {podName}</h1>
      <p>Namespace: {namespace}</p>
      <div style={{ flex: 1, overflowY: 'auto', border: '1px solid blue', marginBottom: '10px' }}>
      
        <div style={{ height: '200px', marginBottom: '20px', border: '1px solid red'}}>
          otras cosas
        </div>
        <div style={{ height: '200px', marginBottom: '20px', border: '1px solid red'}}>
          otras cosas
        </div>
      </div>

      <div>
      <button onClick={startStreaming} disabled={isStreaming}>Iniciar logs</button>
      <button onClick={stopStreaming} disabled={!isStreaming}>Detener logs</button>
    </div>

      <div
        style={{
          height: '400px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#1e1e1e',
          color: '#dcdcdc',
          borderRadius: '8px',
          border: '1px solid #444',
          padding: '15px',
          boxSizing: 'border-box',
          fontFamily: 'monospace' // opcional para estilo tipo terminal

        }}
      >
        {error ? <p style={{ color: 'red' }}>Error: {error}</p> : logs.map((line, index) => (<div key={index}>{line}</div>))}
      </div>
    </PageContainer>
  );
}

export default PodPage;
