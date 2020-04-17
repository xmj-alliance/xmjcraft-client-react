import React from "react";
import Users from "../services/userGraph";

const HomeView = () => {
  return (
    <section className="Home">
      Welcome to xmjcraft-client-react!
      <div>
       hacks:
        {Users()}
      </div>
    </section>
  );
}

export default HomeView;