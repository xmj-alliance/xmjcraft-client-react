import React from "react";

import "./single.scss";
import "./detail.scss";
import User from "../../models/user";

interface UserDetailProps {
  user?: User
}

const UserDetail = ({user}: UserDetailProps) => {

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

    </div>
  );
  
}

export default UserDetail;