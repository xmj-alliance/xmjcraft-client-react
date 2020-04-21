import React from "react";
import { useRoute } from "wouter";

import { useUserDetail } from "../../services/userService";
import "./single.scss";
import "./detail.scss";

const UserDetail = () => {

  const params = useRoute("/users/:dbname")[1];

  let dbname = params?.dbname;

  const { isQueryLoading, queryError, user } = useUserDetail(dbname);

  return (
    <div className="UserDetail userSingle">

      {
        user && user.dbname?
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