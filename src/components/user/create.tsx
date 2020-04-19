import React, { useState, FormEvent } from "react";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";

import CUDMessage from "../../models/cudMessage";
import User from "../../models/user";
import "./create.scss";

const addDefs = loader("../../services/userGraph/addSingle.graphql");
const getListDefs = loader("../../services/userGraph/getList.graphql");

const UserCreate = () => {

  const [newUser, setNewUser] = useState({
    dbname: "",
    name: ""
  });

  const [isAddDialogShown, setIsAddDialogShown] = useState(false);

  const [addUser, { loading: isAddExecuting, error: addError }] = useMutation(
    addDefs,
    {
      update: (cache, response) => {
        const message = response.data.addUser as CUDMessage;
        
        if (!message.ok) {
          return;
        }

        // update local cache

        const cacheResponse = cache.readQuery<{users: User[]}>({ query: getListDefs });

        if (!cacheResponse) {
          return;
        }

        cache.writeQuery({
          query: getListDefs,
          data: { users: cacheResponse.users.concat(newUser)},
        });

      }
    }

  );

  const onCreateClick = () => {
    setIsAddDialogShown(!isAddDialogShown);
  }

  const onNewUserDBNameChange = (e: any) => {
    setNewUser({...newUser, dbname: e.target.value || ""});
  }

  const onNewUserNameChange = (e: any) => {
    setNewUser({...newUser, name: e.target.value || ""});
  }

  const onNewUserSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // create new user
    await addUser({variables: {
      newUser: newUser
    }});

    if (addError) {
      console.error(addError);
    } else {
      console.log(`add success`);
      setNewUser({dbname: "", name: ""});
    }

  }


  return (
    <div className="userCreate">
      <button onClick={onCreateClick}>
        <h2>(+) Create</h2>
      </button>
      {
        isAddDialogShown ?

          (<div className="newUser">
            <form onSubmit={onNewUserSubmit}>
              <div className="textInputGroup">
                <label htmlFor="newUserDBName">dbname</label>
                <input type="text" id="newUserDBName" value={newUser.dbname} onChange={onNewUserDBNameChange} />
              </div>
              <div className="textInputGroup">
                <label htmlFor="newUserName">Name</label>
                <input type="text" id="newUserName" value={newUser.name} onChange={onNewUserNameChange} />
              </div>
              <footer>
                <button type="submit">OK</button>
              </footer>
            </form>

          </div>)
          :
          null
      }

      <footer>
        <div className="info">
          {isAddExecuting?<h2>Adding...</h2>:null}
          {addError?<h2>Failed to add.</h2>:null}
        </div>
      </footer>

    </div>
  );
}

export default UserCreate;