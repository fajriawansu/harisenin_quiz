import React from "react";

function Main({ children }) {
  return (
    <div
      style={{
        marginLeft: 220,
        display: "flex",
      }}
    >
      {children}
    </div>
  );
}

function Left({ children }) {
  return <div style={{ width: "70%", padding: 12 }}>{children}</div>;
}

function Right({ children }) {
  return <div style={{ width: "30%", padding: 12 }}>{children}</div>;
}

function TitlePage({ children }) {
  return (
    <div className="titlepage">
      {children}
    </div>
  );
}

function Breaker() {
  return (
    <div style={{height: 1, width: "100%", backgroundColor: "gray"}} />
  )
}

const Layout = {
  Main,
  Left,
  Right,
  TitlePage,
  Breaker
};

export default Layout;
