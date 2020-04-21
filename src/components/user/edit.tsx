import React, { useState } from "react";
import { useRoute } from "wouter";

import { useUserUpdate, useUserDetail } from "../../services/userService";
import User from "../../models/user";
import "./single.scss";
import "./edit.scss";

const UserEdit = () => {

  const params = useRoute("/users/:dbname")[1];

  let dbname = params?.dbname;

  const { isQueryLoading, queryError, user } = useUserDetail(dbname);

  const [localUser, setlocalUser] = useState(user || {} as User);

  const [updateToken, setUpdateToken] = useState({});

  const [updateUser, { loading: isUpdateExecuting, error: updateError }] = useUserUpdate(localUser);

  const onOkayClick = async (e: any) => {
    e.preventDefault();
    // update this user
    await updateUser({
      variables: {
        dbname: localUser.dbname,
        token: updateToken
      }
    });
    if (updateError) {
      console.error(updateError);
    } else {
      console.log(`Update success. Ready to close modal dialog`);
    }
  };
  
  const onCancelClick = (e: any) => {
    e.preventDefault();
    console.log(`Cancel clicked. In reality, this closes modal dialog.`);
  };

  const onUserNameChange = (e: any) => {
    setlocalUser({...localUser, name: e.target.value || ""});
    setUpdateToken({...updateToken, name: e.target.value || ""});
  }


  return (
    <div className="userSingle UserEdit">

      <main>
      {
        localUser && localUser.dbname?

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

        : null
      }
      </main>

      <footer>
        <div className="info">
          {isQueryLoading?<h2>Loading...</h2>:null}
          {queryError?<h2>Error loading data!</h2>:null}
          {isUpdateExecuting?<h2>Updating...</h2>:null}
          {updateError?<h2>Failed to update.</h2>:null}
        </div>
      </footer>



    </div>
  );
}

export default UserEdit;