
import React from 'react';
import './Layout.css'

const Layout = ({ children }: { children: any }) => (
  <div className="layout">
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
    {children}
  </div>
)

export default Layout;