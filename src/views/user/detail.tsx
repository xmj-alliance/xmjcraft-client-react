import React, { useState } from "react";
import { loader } from "graphql.macro";
import { useRoute } from "wouter";
import { useQuery } from "@apollo/client";

import UserDetail from "../../components/user/detail";
import UserEdit from "../../components/user/edit";
import "./detail.scss";
import User from "../../models/user";


const getSingleDefs = loader("../../services/userGraph/getSingle.graphql");

const UserDetailView = () => {

  const [isEditMode, setIsEditMode] = useState(false);

  const params = useRoute("/users/:dbname")[1];

  const onEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const onDeleteClick = () => {

  };

  // get user data
    // I will skip checking whether dbname is undefined.
    // If I write a condition here, the React hook will stop working. 
    // You can google "Rendered fewer hooks than expected" error.
  let dbname = params?.dbname;

  const { loading: isQueryLoading, error, data } = useQuery(
    getSingleDefs,
    {
      variables: {
        dbname: dbname
      }
    }
  );

  if (error) {
    console.error(error);
  }

  const user = data?.user as User;

  return (
    <section className="UserDetail">

      <header>

        <div className="viewControl">
          <button onClick={onEditClick}>Edit</button>
          <button className="danger" onClick={onDeleteClick}>Delete</button>
        </div>

      </header>

      <div className="info">
        {isQueryLoading?<h2>Loading...</h2>:null}
        {error?<h2>Error Loading Data</h2>:null}
      </div>

      <main>
        {
          user?
          <UserDetail user={user}/>
          : null
        }
        
        {
          isEditMode?
          <div className="editImaginedModalDialog">
            <h1>Imagined Modal Dialog</h1>
            <UserEdit user={user} />
          </div>
          : null
        
        }


      </main>


      
    </section>
  );
}

export default UserDetailView;