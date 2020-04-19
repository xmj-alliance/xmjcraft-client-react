import React from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import { Link } from "wouter";

import User from "../../models/user";

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

const getListDefs = loader("../../services/userGraph/getList.graphql");


// const PlaceUsers = () => {

//   const { loading, error, data } = useQuery(getListDefs);

//   if (loading) return (
//     <li><p>Loading...</p></li>
//   );

//   if (error || data === undefined){
//     console.error(error);
//     return (
//       <li><p>Error!!!</p></li>
//     );
//   }

  // return (data.users as User[]).map(({name, dbname}) => (
  //     <li key={dbname}>
  //       <div className="userbox">
  //         <Link href={`/users/${dbname}`} >
  //           <h2>{name}</h2>
  //           <p><small>{dbname}</small></p>
  //         </Link>
  //       </div>
  //     </li>
  //   )
  // );
// };

const UserList = () => {

  const { loading: isQueryLoading, error: queryError, data } = useQuery(getListDefs);

  return (
    <div className="UserList">
      <main>
        <ul>
          {
            data && data.users?

            (data.users as User[]).map(({name, dbname}) => (
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