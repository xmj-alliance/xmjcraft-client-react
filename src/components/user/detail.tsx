import React from "react";
import { loader } from "graphql.macro";
import { useRoute } from "wouter";
import { useQuery } from "@apollo/client";

import User from "../../models/user";
import "./single.scss";
import "./detail.scss";

const getSingleDefs = loader("../../services/userGraph/getSingle.graphql");

const UserDetail = () => {

  const params = useRoute("/users/:dbname")[1];

  // get user data
    // I will skip checking whether dbname is undefined.
    // If I write a condition here, the React hook will stop working. 
    // You can google "Rendered fewer hooks than expected" error.
  let dbname = params?.dbname;

  const { loading: isQueryLoading, error: queryError, data } = useQuery(
    getSingleDefs,
    {
      variables: {
        dbname: dbname
      }
    }
  );

  if (queryError) {
    console.error(queryError);
  }

  const user = data?.user as User;

  return (
    <div className="UserDetail userSingle">

      {
        user&&user.dbname?
        <article>
          <h2>{user.name}</h2>
          <h3>{user.dbname}</h3>
        </article>
        :
        <article>
          <h2>Mr. Stranger</h2>
          <h3>Error-no-such-user</h3>
        </article>
      }

      <div className="info">
        {isQueryLoading?<h2>Loading...</h2>:null}
        {queryError?<h2>Error Loading Data</h2>:null}
      </div>

    </div>
  );
  
}

export default UserDetail;