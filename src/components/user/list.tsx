import React from "react";

import { Link } from "wouter";

import "./list.scss";

interface User {
  dbname: string,
  name: string
}

const users: User[] = [
  {
    dbname: "user-ngBiter",
    name: "Jian jiaojiao"
  },
  {
    dbname: "user-cmxmm",
    name: "Kitten super-adorable"
  }
];

const placeUsers = () => {
  return users.map((user) => (
      <li key={user.dbname}>
        <div className="userbox">
          <Link href={`/users/${user.dbname}`} >
            <h2>{user.name}</h2>
            <p><small>{user.dbname}</small></p>
          </Link>
        </div>
      </li>
    )
  );
};

const UserList = () => {
  return (
    <div className="UserList">
      <ul>
        { placeUsers() }
      </ul>
    </div>
  );
}

export default UserList;