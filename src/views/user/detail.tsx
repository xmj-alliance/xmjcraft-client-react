import React, { useState } from "react";
import { useRoute, useLocation } from "wouter";

import { useUserDetail, useUserDeletion } from "../../services/userService";
import UserDetail from "../../components/user/detail";
import UserEdit from "../../components/user/edit";
import "./detail.scss";


const UserDetailView = () => {

  const [isEditMode, setIsEditMode] = useState(false);
  const params = useRoute("/users/:dbname")[1];
  const setLocation = useLocation()[1];

  let dbname = params?.dbname;

  const [deleteUser, { loading: isDeleteExecuting, error: deleteError }] = useUserDeletion(dbname);

  const onEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const onDeleteClick = async () => {

    await deleteUser({
      variables: {
        dbname: dbname
      }
    });

    if (deleteError) {
      console.error(deleteError);
      
    } else {
      console.log(`Delete success`);
      setLocation("/users");
    }

  };

  const { isQueryLoading, queryError, user } = useUserDetail(dbname);

  return (
    <section className="UserDetail">

      <header>

        {
          user && user.dbname?

          <div className="viewControl">
            <button onClick={onEditClick}>Edit</button>
            <button className="danger" onClick={onDeleteClick}>Delete</button>
          </div>

          : null
        }

      </header>

      <main>

        {
          user?
          <UserDetail />
          : null
        }
       
        {
          isEditMode?
          <div className="editImaginedModalDialog">
            <h1>Imagined Modal Dialog</h1>
            <UserEdit />
          </div>
          : null
        }


      </main>

      <footer>
        <div className="info">
          {isQueryLoading?<h2>Loading...</h2>:null}
          {queryError?<h2>Error loading data!</h2>:null}
          {isDeleteExecuting?<h2>Deleting...</h2>:null}
          {deleteError?<h2>Failed to delete.</h2>:null}
        </div>
      </footer>
      
    </section>
  );
}

export default UserDetailView;