import {CREATE_USER, EDIT_USER, DELETE_USER, FETCH_USERS} from './typeAction';

export const createUser = payload => {
  return {
    type: CREATE_USER,
    payload,
  };
};

export const editUser = payload => {
  return {
    type: EDIT_USER,
    payload,
  };
};

export const deleteUser = payload => {
  return {
    type: DELETE_USER,
    payload,
  };
};

export const fetchUsers = payload => {
  return {
    type: FETCH_USERS,
    payload,
  };
};
