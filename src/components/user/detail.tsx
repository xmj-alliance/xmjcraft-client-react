import React from "react";
import { useRoute } from "wouter";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";

import "./single.scss";
import User from "../../models/user";

const getSingleDefs = loader("../../services/userGraph/getSingle.graphql");

const PlaceUser = (dbname: string) => {

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

  return (
    <article>
      <h2>{user.name || "Mr. Stranger"}</h2>
      <h3>{user.dbname || "Error-no-such-user"}</h3>
    </article>
  );
};

const UserDetail = () => {

  // eslint-disable-next-line
  const [_, params] = useRoute("/users/:id");
  
  // params.id is the name that gets the value, no matter what the string after ":" is.
  let dbname: string = params.id;

  if (!dbname) {
    console.log(`params.id is ${dbname}`);
    
    return (
      <div className="UserDetail userSingle">
        <h2 className="error">We are having trouble loading this user.</h2>
      </div>
    )
  }

  return (
    <div className="UserDetail userSingle">
      {
        PlaceUser(dbname)
      }
    </div>
  );
}

export default UserDetail;