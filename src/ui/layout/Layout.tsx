import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          width: '100vw',
          minWidth: '1200px',
          minHeight: '720px',
          overflow: 'hidden', // Elimina scrolls no deseados
        }}
      >
        <div
          style={{
            width: '350px',
            height: '100%',
            backgroundColor: '#252628',
            // overflowY: 'auto',
          }}
        >
          <Sidebar />
        </div>
        <main 
          style={{
            flexGrow: 1,
            height: '100%',
            overflow: 'auto',
            backgroundColor: '#1e1e1e',
            color: 'white',
          }}
        >{children}</main>
      </div>
    );
}
  
  export default Layout;