import { initialState, presentationState } from './definitions';
import produce from "immer";
import {
  SET_THEME,
  SET_TITLE,
  SET_DESCRIPTION,
  IMAGE_UPLOAD_REQUEST,
  SET_ASSETS_PATH,
  SET_USER,
  SAVE_REQUEST,
  LOAD_REQUEST,
  IS_READY,
  LOAD_STATE,
} from './constants';
import { Action } from './actions';

const PresentationReducer = (state: presentationState=initialState, action: Action): presentationState =>
  produce(state, (draft: presentationState) => {
    // eslint-disable-next-line no-console
    switch (action.type) {
      case SET_THEME:
        // now that the theme is set, push first and last slide in the deck if the theming requires it
        draft.theme = action.theme;
        break;
      case SET_TITLE:
        draft.title = action.title;
        break;
      case SET_DESCRIPTION:
        draft.description = action.description;
        break;
      case IMAGE_UPLOAD_REQUEST:
        draft.imgUploadRequest = action.request;
        break;
      case SAVE_REQUEST:
        draft.saveRequest = action.request;
        break;
      case LOAD_REQUEST:
        draft.loadRequest = action.request;
        break;
      case SET_ASSETS_PATH:
        draft.assetsPath = action.path;
        break;
      case LOAD_STATE: {
        // get the json from the action
        // set the state using:
        const newState:presentationState = {
          ...action.state.presentation,
        };
        console.log("FIx the load state")
        // Object.keys(newState).map(s => {
        //   draft[s] = newState[s];
        // });
        draft.saveRequest = false;
        break;
      }
      case SET_USER:
        draft.username = action.user;
        break;
      case IS_READY:
        draft.isReady = action.ready;
        break;
    }
  });

  export default PresentationReducer;