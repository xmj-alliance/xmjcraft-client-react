import React from "react";

import { Link } from "wouter";

import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="Navbar">
      <header className="navbar">
        <ul>
          <li><Link href="/index">xmjcraft</Link></li>
        </ul>
      </header>
      <main className="navbar">
        <ul>
          <li><Link href="/users">Users</Link></li>
        </ul>
      </main>
      <div className="flexSpacer"></div>
      <footer className="navbar">
        <a
          href="https://github.com/xmj-alliance/xmjcraft-client-react"
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
      </footer>
    </div>
  );
}

export default Navbar;