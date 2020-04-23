import React, { useState, FormEvent } from "react";

import { useUserAddition } from "../../services/userService";
import "./create.scss";

const UserCreate = () => {

  const [newUser, setNewUser] = useState({
    dbname: "",
    name: ""
  });

  const [addUser, { loading: isAddExecuting, error: addError }] = useUserAddition(newUser);

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

  const onCancelButtonClicked = (e: any) => {
    e.preventDefault();
    console.log(`Cancelled. Will also close modal dialog in reality.`);
  }


  return (
    <div className="userCreate">

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
          <button type="submit" className="success">OK</button>
          <button className="danger" onClick={onCancelButtonClicked}>Cancel</button>
        </footer>
      </form>

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