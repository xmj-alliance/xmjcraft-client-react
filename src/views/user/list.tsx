import React, { useState } from "react";

import UserList from "../../components/user/list";
import UserCreate from "../../components/user/create";

import "./list.scss";

const UserListView = () => {

  const [isAddDialogShown, setIsAddDialogShown] = useState(false);

  const onCreateClick = () => {
    setIsAddDialogShown(!isAddDialogShown);
  }

  return (
    <section className="UserList">
      <h1>List of Xiaomajias</h1>
      <div className="users">
        <UserList />
        <div className="create">
          <button onClick={onCreateClick}>
            <h2>(+) Create</h2>
          </button>
        </div>

        {
          isAddDialogShown ?
          <div className="createImaginedModalDialog">
            <h2>Imagined Modal Dialog</h2>
            <UserCreate />
          </div>
          
          : null
        }

        

      </div>

    </section>
  );
}

export default UserListView;