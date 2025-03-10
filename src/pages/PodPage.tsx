// pages/PodPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

function PodPage() {
  const { namespace, podName } = useParams();

  return (
    <div>
      <h1>Pod: {podName}</h1>
      <p>Namespace: {namespace}</p>
      {/* Aquí puedes mostrar la información del pod */}
    </div>
  );
}

export default PodPage;