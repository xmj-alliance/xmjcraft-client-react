import React from "react";
import { Link } from "wouter";

import { useUserList } from "../../services/userService";
import "./list.scss";

// const users: User[] = [
//   {
//     dbname: "user-ngBiter",
//     name: "Jian jiaojiao"
//   },
//   {
//     dbname: "user-cmxmm",
//     name: "Kitten super-adorable"
//   }
// ];


const UserList = () => {

  const { isQueryLoading, queryError, users } = useUserList();

  return (
    <div className="UserList">
      <main>
        <ul>
          {
            users?

            users.map(({name, dbname}) => (
              <li key={dbname}>
                <div className="userbox">
                  <Link href={`/users/${dbname}`} >
                    <h2>{name}</h2>
                    <p><small>{dbname}</small></p>
                  </Link>
                </div>
              </li>
            ))

            : null
          }
        </ul>
      </main>

      <footer>
        <div className="info">
          {isQueryLoading?<h2>Loading...</h2>:null}
          {queryError?<h2>Error loading data!</h2>:null}
        </div>
      </footer>
    </div>
  );
}

export default UserList;