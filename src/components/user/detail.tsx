import React from "react";
import { useRoute } from "wouter";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";

import "./single.scss";
import User from "../../models/user";

const getSingleDefs = loader("../../services/userGraph/getSingle.graphql");

const PlaceUser = (dbname?: string) => {

  // get user data
  const { loading, error, data } = useQuery(
    getSingleDefs,
    {
      variables: {
        dbname: dbname
      }
    }
  );
  
  if (loading) return (
    <h2>Loading...</h2>
  );

  if (error || data === undefined) {
    console.error(error);
    return (
      <h2>Error!!!</h2>
    );
  }

  const user = data.user as User;

  if (!user.dbname) {
    // when this user does not exist
    return (
      <article>
        <h2>Mr. Stranger</h2>
        <h3>Error-no-such-user</h3>
      </article>
    );
  }

  return (
    <article>
      <header>
        <button>Edit</button>
        <button className="danger">Delete</button>
      </header>
      <h2>{user.name}</h2>
      <h3>{user.dbname}</h3>
    </article>
  );
};

const UserDetail = () => {

  const params = useRoute("/users/:dbname")[1];
  
  let dbname = params?.dbname;

  return (
    <div className="UserDetail userSingle">
      {
        // I will skip checking whether dbname is undefined.
        // If I write a condition here, the React hook will stop working. 
        // You can google "Rendered fewer hooks than expected" error.
        PlaceUser(dbname)
      }
    </div>
  );
  
}

export default UserDetail;