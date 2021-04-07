import { Reducer, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import history from '../../services/history';

export const NAVIGATE = "NAVIGATE";

export interface ApplicationState {
  route: string;
}

const initialState: ApplicationState = {
  route: ''
}

export type ActionTypes = 
| { type: typeof NAVIGATE;
    payload: {
      route: string;
    }
  }

const applicationReducer: Reducer<ApplicationState, ActionTypes> = (state = initialState, action: ActionTypes) => {
  switch(action.type) {
    case "NAVIGATE":
      return {
        route: action.payload.route
      }
    default: 
      return state;
  }
}

export const Creators = {
  setRoute: (route: string): ActionTypes => ({ 
    type: NAVIGATE, 
    payload: { route } 
  }),

  navigate: (route: string): ThunkAction<void, ApplicationState, unknown, Action<string>> => (dispatch) => {
    history.push(route);
    dispatch(Creators.setRoute(route));
  },
}

export default applicationReducer;