import React from "react";

import UserList from "../../components/user/list";
import UserCreate from "../../components/user/create";

import "./list.scss";


const UserListView = () => {

  return (
    <section className="UserList">
      <h1>List of Xiaomajias</h1>
      <div className="users">
        <UserList />
        <UserCreate />

      </div>

    </section>
  );
}

export default UserListView;