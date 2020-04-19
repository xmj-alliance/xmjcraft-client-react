import React, { useState } from "react";

import User from "../../models/user";
import "./single.scss";
import "./edit.scss";


interface UserEditProps {
  user: User
}

const UserEdit = ({user}: UserEditProps) => {

  const [localUser, setlocalUser] = useState(user);

  const [updateToken, setUpdateToken] = useState({});

  const onOkayClick = (e: any) => {
    e.preventDefault();
    console.log(updateToken);

  };
  
  const onCancelClick = (e: any) => {
    e.preventDefault();
    console.log(`Cancel clicked. In reality, this closes modal dialog.`);
  };

  const onUserNameChange = (e: any) => {
    setlocalUser({...localUser, name: e.target.value || ""})
    setUpdateToken({...updateToken, name: e.target.value || ""})
  }


  return (
    <div className="userSingle UserEdit">

      <main>
      {
        user.dbname?
        <form>
          <article>
            <h3>Enter new info for {localUser.dbname}</h3>
            <div className="textInputGroup">
              <label htmlFor="newUserName">New Name for user</label>
              <input
                id="newUserName"
                type="text"
                value={localUser.name}
                placeholder="Enter a new user name"
                maxLength={140}
                onChange={onUserNameChange}
              />
            </div>
          </article>
          <footer className="editControl">
            <button className="success" type="submit" onClick={onOkayClick}>Okay</button>
            <button className="danger" onClick={onCancelClick}>Cancel</button>
          </footer>
        </form>

        :
        <article>
          <h3>Error user not found</h3>
        </article>
      }
      </main>



    </div>
  );
}

export default UserEdit;