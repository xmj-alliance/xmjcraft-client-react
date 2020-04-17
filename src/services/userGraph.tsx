import React from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";

const reqDefs = loader("./user.graphql");

const Users = () => {

  const { loading, error, data } = useQuery(reqDefs);

  if (loading) return <p>Loading...</p>;
  if (error || data === undefined) return <p>Error :(</p>;

  return (data.users as any[]).map(({ dbname, name }) => (
    <div key={dbname}>
      <p>
        {dbname}: {name}
      </p>
    </div>
  ));

};

export default Users;