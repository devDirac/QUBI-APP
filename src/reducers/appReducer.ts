import { combineReducers } from "redux";
import { RESET_STATE, SET_USER } from "../actions/auth";
import { SET_IDIOMA } from "../actions/idiomas";
import { SET_NOTIFICACIONES } from "../actions/notificaciones";



const appReducer = (state: any = { app: { user: {}, employees: { data: [], detail: {} }, upload: [] } }, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...{ user: (action?.value || {}) } };
    case SET_IDIOMA:
      return { ...state, ...{ idioma: action?.value || 'mx' } };
    case SET_NOTIFICACIONES:
      return { ...state, ...{ notificaciones: action?.value || null } };
    case RESET_STATE:
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
