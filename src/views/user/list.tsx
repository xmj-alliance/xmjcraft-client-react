import React from "react";

import UserList from "../../components/user/list";

import "./list.scss";

const UserListView = () => {
  return (
    <section className="UserList">
      <h1>List of Xiaomajias</h1>
      <div className="users">
        <UserList />
        <div className="create">
          <button>
            <h2>(+) Create</h2>
          </button>
        </div>
      </div>

    </section>
  );
}

export default UserListView;