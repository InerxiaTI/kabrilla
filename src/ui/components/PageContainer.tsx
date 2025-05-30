// components/PageContainer.tsx
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function PageContainer({ children, style }: PageContainerProps) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...style, // permite personalización adicional
      }}
    >
      {children}
    </div>
  );
}
