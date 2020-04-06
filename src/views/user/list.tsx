import React from "react";

import UserList from "../../components/user/list";

import "./list.scss";

const UserListView = () => {
  return (
    <section className="UserList">
      <h1>List of Xiaomajias</h1>
      <UserList />
    </section>
  );
}

export default UserListView;