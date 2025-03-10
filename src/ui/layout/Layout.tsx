import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

interface LayoutProps {
    children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
    return (
      <div style={{ display: 'flex' , height: '100vh', width: '100vw', border: '0px solid yellow' }}>
        <Sidebar/>
        <main style={{flex: 1, display: 'flex' , height: '100vh'}}>{children}</main>
      </div>
    );
}
  
  export default Layout;