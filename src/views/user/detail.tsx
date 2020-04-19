import React, { useState } from "react";

import UserDetail from "../../components/user/detail";
import UserEdit from "../../components/user/edit";
import "./detail.scss";
import { useRoute, useLocation } from "wouter";
import { loader } from "graphql.macro";
import { useMutation, useQuery } from "@apollo/client";
import CUDMessage from "../../models/cudMessage";
import User from "../../models/user";

const deleteSingleDefs = loader("../../services/userGraph/deleteSingle.graphql");
const getSingleDefs = loader("../../services/userGraph/getSingle.graphql");
const getListDefs = loader("../../services/userGraph/getList.graphql");

const UserDetailView = () => {

  const [isEditMode, setIsEditMode] = useState(false);
  const params = useRoute("/users/:dbname")[1];
  const [_, setLocation] = useLocation();

  let dbname = params?.dbname;

  const [deleteUser, { loading: isDeleteExecuting, error: deleteError }] = useMutation(
    deleteSingleDefs,
    {
      update: (cache, response) => {
        const message = response.data.deleteUser as CUDMessage;
        
        if (!message.ok) {
          return;
        }
        
        if (!dbname) {
          return;
        }

        // update getSingle cache (we have a problem here. not in fact evicted)

        cache.evict(dbname)
        cache.gc();

        // cache.writeQuery({
        //   query: getSingleDefs,
        //   variables: {
        //     dbname: dbname
        //   },
        //   data: {user: null},
        // });

        // update getList cache

        const cacheResponse = cache.readQuery<{users: User[]}>({ query: getListDefs });

        if (!cacheResponse) {
          return;
        }

        const newData = {
          users: cacheResponse.users.filter((u) => u.dbname !== dbname)
        }

        cache.writeQuery({
          query: getListDefs,
          data: newData,
        });

      }
    }
  );

  const onEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const onDeleteClick = async () => {

    await deleteUser({
      variables: {
        dbname: dbname
      }
    });

    if (deleteError) {
      console.error(deleteError);
      
    } else {
      console.log(`Delete success`);
      setLocation("/users");
    }

  };

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

  return (
    <section className="UserDetail">

      <header>

        {
          data && data.user && data.user.dbname?

          <div className="viewControl">
            <button onClick={onEditClick}>Edit</button>
            <button className="danger" onClick={onDeleteClick}>Delete</button>
          </div>

          : null
        }

      </header>

      <main>

        {
          data && data.user?
          <UserDetail />
          : null
        }
       
        {
          isEditMode?
          <div className="editImaginedModalDialog">
            <h1>Imagined Modal Dialog</h1>
            <UserEdit />
          </div>
          : null
        }


      </main>

      <footer>
        <div className="info">
          {isQueryLoading?<h2>Loading...</h2>:null}
          {queryError?<h2>Error loading data!</h2>:null}
          {isDeleteExecuting?<h2>Deleting...</h2>:null}
          {deleteError?<h2>Failed to delete.</h2>:null}
        </div>
      </footer>
      
    </section>
  );
}

export default UserDetailView;