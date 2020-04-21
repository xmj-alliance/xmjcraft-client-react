import React from "react";

const HomeView = () => {
  return (
    <section className="Home">
      Welcome to xmjcraft-client-react!
      <div>
        It is currently {new Date().toLocaleString()}
      </div>
    </section>
  );
}

export default HomeView;