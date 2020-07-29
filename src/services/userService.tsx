import { loader } from "graphql.macro";
import { useQuery, useMutation } from "@apollo/client";
import User from "../models/user";
import CUDMessage from "../models/cudMessage";

const GET_USERS = loader("./userGraph/getList.graphql");
const GET_USER = loader("./userGraph/getSingle.graphql");
const ADD_USER = loader("./userGraph/addSingle.graphql");
const UPDATE_USER = loader("./userGraph/updateSingle.graphql");
const DELETE_USER = loader("./userGraph/deleteSingle.graphql");

export const useUserList = () => {

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{users: User[]}>(GET_USERS);

  if (queryError) {
    console.error(queryError);
  }

  const users = (data? data.users: undefined);

  return {
    isQueryLoading,
    queryError,
    users
  }

}

export const useUserDetail = (dbname?: string) => {

  const { loading: isQueryLoading, error: queryError, data  } = useQuery<{user: User}>(
    GET_USER,
    {
      variables: {
        dbname: dbname
      }
    }
  );

  if (queryError) {
    console.error(queryError);
  }

  const user = (data? data.user: undefined);

  return {
    isQueryLoading,
    queryError,
    user
  }

}

export const useUserAddition = (newUser: User) => {

  return useMutation(
    ADD_USER,
    {
      update: (cache, response) => {
        const message = response.data.addUser as CUDMessage;
        
        if (!message.ok) {
          return;
        }

        // update local cache

        const cacheResponse = cache.readQuery<{users: User[]}>({ query: GET_USERS });

        if (!cacheResponse) {
          return;
        }

        cache.writeQuery({
          query: GET_USERS,
          data: { users: cacheResponse.users.concat(newUser)},
        });

      }
    }

  );

}

export const useUserUpdate = (updatedUser?: User) => {

  return useMutation(
    UPDATE_USER,
    {
      update: (cache, response) => {
        const message = response.data.updateUser as CUDMessage;
        
        if (!message.ok) {
          return;
        }

        if (!updatedUser) {
          return;
        }
  
        // update getSingle cache
  
        cache.writeQuery({
          query: GET_USER,
          variables: {
            dbname: updatedUser.dbname
          },
          data: { user: updatedUser },
        });
  
        // update getList cache
  
        let cacheResponse: {users: User[]} | null = null;
  
        try {
          cacheResponse = cache.readQuery({ query: GET_USERS });
        } catch (error) {
          console.log(error);
        }
  
        if (!cacheResponse) {
          return;
        }
  
        let userInCacheIndex = cacheResponse.users.findIndex(u => u.dbname === updatedUser.dbname);
  
        if (userInCacheIndex < 0) {
          return;
        }
  
        const newUsers = cacheResponse.users.slice();

        newUsers[userInCacheIndex] = updatedUser;
        
        const newData = {
          users: newUsers
        }
  
        cache.writeQuery({
          query: GET_USERS,
          data: newData,
        });
  
      }
    }
  );

} 



export const useUserDeletion = (dbname?: string) => {
  return useMutation(
    DELETE_USER,
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

        // cache.evict(dbname)
        cache.gc();

        // cache.writeQuery({
        //   query: getSingleDefs,
        //   variables: {
        //     dbname: dbname
        //   },
        //   data: {user: null},
        // });

        // update getList cache
        let cacheResponse: {users: User[]} | null = null;

        try {
          cacheResponse = cache.readQuery({ query: GET_USERS });
        } catch (error) {
          console.log(error);
        }

        if (!cacheResponse) {
          return;
        }

        const newData = {
          users: cacheResponse.users.filter((u) => u.dbname !== dbname)
        }

        cache.writeQuery({
          query: GET_USERS,
          data: newData,
        });

      }
    }
  );

  
}