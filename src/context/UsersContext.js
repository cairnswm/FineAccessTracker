import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useApplications } from './ApplicationsContext';
import { combineUrlAndPath } from '../auth/utils/combineUrlAndPath';
import { REACT_APP_ACCESS_API } from "../../env";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const { currentUser } = useAuth();
  const { activeApplication } = useApplications();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`/api/api.php/application/${activeApplication}/users`));
        const usersData = await usersResponse.json();
        
        // Add the current user to the users list
        const currentUserData = {
          id: currentUser.id,
          application_id: activeApplication,
          user_id: currentUser.user_id,
          email: currentUser.email,
          role: 'owner',
          created_at: currentUser.created_at,
          modified_at: currentUser.modified_at
        };
        
        setUsers([currentUserData, ...usersData]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchInvites = async () => {
      try {
        const invitesResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${activeApplication}/invites`));
        const invitesData = await invitesResponse.json();
        setInvites(invitesData);
      } catch (error) {
        console.error('Error fetching invites:', error);
      }
    };

    if (activeApplication) {
      fetchUsers();
      fetchInvites();
    }
  }, [currentUser, activeApplication]);

  return (
    <UsersContext.Provider value={{ users, invites }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
