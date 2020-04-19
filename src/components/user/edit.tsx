import React, { useState } from "react";

import User from "../../models/user";
import "./single.scss";
import "./edit.scss";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import CUDMessage from "../../models/cudMessage";

interface UserEditProps {
  user: User
}

const updateSingleDefs = loader("../../services/userGraph/updateSingle.graphql");
const getSingleDefs = loader("../../services/userGraph/getSingle.graphql");

const UserEdit = ({user}: UserEditProps) => {

  const [localUser, setlocalUser] = useState(user);

  const [updateToken, setUpdateToken] = useState({});

  const [updateUser, { loading: isUpdateExecuting, error: updateError }] = useMutation(
    updateSingleDefs,
    {
      update: (cache, response) => {
        const message = response.data.updateUser as CUDMessage;
        
        if (!message.ok) {
          return;
        }

        // update local cache

        cache.writeQuery({
          query: getSingleDefs,
          data: { user: localUser},
        });

      }
    }
  );

  const onOkayClick = (e: any) => {
    e.preventDefault();
    console.log(updateToken);
    // update this user
    updateUser({
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
    setlocalUser({...localUser, name: e.target.value || ""})
    setUpdateToken({...updateToken, name: e.target.value || ""})
  }


  return (
    <div className="userSingle UserEdit">

      <main>
      {
        localUser.dbname?
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
          <h3>Error: user not found</h3>
        </article>
      }
      </main>

      <footer>
        <div className="info">
          {isUpdateExecuting?<h2>Updating...</h2>:null}
          {updateError?<h2>Failed to update.</h2>:null}
        </div>
      </footer>



    </div>
  );
}

export default UserEdit;