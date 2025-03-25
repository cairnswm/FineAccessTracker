import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from './ApplicationsContext';
import { useTenant } from "../../auth/hooks/useTenant";
import { combineUrlAndPath } from "../../auth/utils/combineUrlAndPath";
import { REACT_APP_ACCESS_API } from "../../env";

const UsersContext = createContext(null);

export const useApplicationUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [applicationUsers, setApplicationUsers] = useState([]);
  const [applicationInvites, setApplicationInvites] = useState([]);
  const { user, token } = useAuth();
  const { tenant } = useTenant();
  const { activeApplicationId } = useApplications();

  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${activeApplicationId}/users`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'App_id': tenant
        }
      });
      const usersData = await usersResponse.json();
      
      // Add the current user to the users list
      const currentUserData = {
        id: user.id,
        application_id: activeApplicationId,
        user_id: user.id,
        email: user.email,
        role: 'owner',
        firstname: user.firstname,
        lastname: user.lastname,
        created_at: user.created_at,
        modified_at: user.modified_at
      };
      
      setApplicationUsers([currentUserData, ...usersData]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchInvites = async () => {
    try {
      const invitesResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${activeApplicationId}/invites`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'App_id': tenant
        }
      });
      const invitesData = await invitesResponse.json();
      setApplicationInvites(invitesData);
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  };

  useEffect(() => {
    if (activeApplicationId) {
      fetchInvites();
      fetchUsers();
    }
  }, [activeApplicationId]);

  // Application users operations
  const addApplicationUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: applicationUsers.length > 0 ? Math.max(...applicationUsers.map(user => user.id)) + 1 : 1,
      status: "active",
      joinedAt: new Date().toISOString().split('T')[0]
    };
    setApplicationUsers([...applicationUsers, userWithId]);
    return userWithId;
  };

  const updateApplicationUser = (id, updatedData) => {
    setApplicationUsers(applicationUsers.map(user => 
      user.id === id ? { ...user, ...updatedData } : user
    ));
  };

  const removeApplicationUser = (id) => {
    setApplicationUsers(applicationUsers.filter(user => user.id !== id));
  };

  // Invites operations
  const getUserInvites = (email) => {
    return applicationInvites.filter(invite => invite.email === email && invite.status === "pending");
  };

  const getApplicationInvites = (applicationId) => {
    return applicationInvites.filter(invite => 
      invite.applicationId === parseInt(applicationId) && invite.status === "pending"
    );
  };

  const addInvite = (newInvite) => {
    const inviteWithId = {
      ...newInvite,
      id: applicationInvites.length > 0 ? Math.max(...invites.map(invite => invite.id)) + 1 : 1,
      status: "pending",
      invitedAt: new Date().toISOString().split('T')[0]
    };
    setApplicationInvites([...applicationInvites, inviteWithId]);
    return inviteWithId;
  };

  const updateInvite = (id, updatedData) => {
    setInvites(invites.map(invite => 
      invite.id === id ? { ...invite, ...updatedData } : invite
    ));
  };

  const deleteInvite = (id) => {
    setInvites(applicationInvites.filter(invite => invite.id !== id));
  };

  const acceptInvite = (id, userData) => {
    const invite = applicationInvites.find(invite => invite.id === id);
    
    if (invite) {
      // Add user to application
      addApplicationUser({
        applicationId: invite.applicationId,
        userId: userData.userId,
        email: invite.email,
        name: userData.name,
        role: invite.role
      });
      
      // Update invite status
      updateInvite(id, { status: "accepted" });
    }
  };

  const rejectInvite = (id) => {
    updateInvite(id, { status: "rejected" });
  };

  return (
    <UsersContext.Provider 
      value={{ 
        applicationUsers,
        addApplicationUser,
        updateApplicationUser,
        removeApplicationUser,
        getUserInvites,
        applicationInvites,
        addInvite,
        updateInvite,
        deleteInvite,
        acceptInvite,
        rejectInvite
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

