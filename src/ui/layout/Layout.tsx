import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
      <div style={{ display: 'flex' , height: '100vh', width: '100vw', border: '0px solid yellow' }}>
        <Sidebar/>
        <main style={{flex: 1, display: 'flex' , height: '100vh', border: '0px solid red'}}>{children}</main>
      </div>
    );
}
  
  export default Layout;