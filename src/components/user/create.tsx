import React, { useState, FormEvent } from "react";

import { useUserAddition } from "../../services/userService";
import "./create.scss";



const UserCreate = () => {

  const [newUser, setNewUser] = useState({
    dbname: "",
    name: ""
  });

  const [isAddDialogShown, setIsAddDialogShown] = useState(false);

  const [addUser, { loading: isAddExecuting, error: addError }] = useUserAddition(newUser);

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