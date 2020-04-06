import React from "react";
import { useRoute } from "wouter";

const UserDetail = () => {
  // eslint-disable-next-line
  const [_, params] = useRoute("/users/:id");
  
  let dbname = "Mr. Stranger";
  
  if (params && params.id) {
    // params.id is the name that gets the value, no matter what the string after ":" is.
    dbname = params.id;
  }
  return (
    <div className="UserDetail">
      <p>Details for {dbname}</p>
    </div>
  );
}

export default UserDetail;