import {CREATE_USER, EDIT_USER, DELETE_USER, FETCH_USERS} from '../../actions';

const userReducer = (state = [], {type, payload}) => {
  switch (type) {
    case CREATE_USER:
      return state.concat(payload);

    case DELETE_USER:
      return state.filter(item => item.id !== payload);

    case EDIT_USER:
      return state;

    default:
      return state;
  }
};

export default userReducer;
