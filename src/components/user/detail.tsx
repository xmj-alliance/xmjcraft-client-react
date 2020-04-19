import React from "react";
import { useRoute } from "wouter";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";

import "./single.scss";
import "./detail.scss";
import User from "../../models/user";

// const getSingleDefs = loader("../../services/userGraph/getSingle.graphql");

interface UserDetailProps {
  user?: User
}

// const PlaceUser = (dbname?: string) => {

//   // get user data
//   // const { loading, error, data } = useQuery(
//   //   getSingleDefs,
//   //   {
//   //     variables: {
//   //       dbname: dbname
//   //     }
//   //   }
//   // );
  
//   // if (loading) return (
//   //   <h2>Loading...</h2>
//   // );

//   // if (error || data === undefined) {
//   //   console.error(error);
//   //   return (
//   //     <h2>Error!!!</h2>
//   //   );
//   // }

//   // const user = data.user as User;

//   // if (!user.dbname) {
//   //   // when this user does not exist
//   //   return (
//   //     <article>
//   //       <h2>Mr. Stranger</h2>
//   //       <h3>Error-no-such-user</h3>
//   //     </article>
//   //   );
//   // }

//   // return (
//   //   <article>
//   //     <h2>{user.name}</h2>
//   //     <h3>{user.dbname}</h3>
//   //   </article>
//   // );
// };

const UserDetail = ({user}: UserDetailProps) => {

  // const params = useRoute("/users/:dbname")[1];
  
  // let dbname = params?.dbname;

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