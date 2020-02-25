/*
 * PresentationConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SET_THEME = 'Slides/Presentation/SET_THEME';
export const SET_TITLE = 'Slides/Presentation/SET_TITLE';
export const SET_DESCRIPTION = 'Slides/Presentation/SET_DESCRIPTION';
export const IMAGE_UPLOAD_REQUEST = 'Slides/Presentation/IMAGE_UPLOAD_REQUEST';
export const SET_ASSETS_PATH = 'Slides/Presentation/SET_ASSETS_PATH';
export const SET_USER = 'Slides/Presentation/SET_USER';
export const SAVE_REQUEST = 'Slides/Presentation/SAVE_REQUEST';
export const LOAD_REQUEST = 'Slides/Presentation/LOAD_REQUEST';
export const IS_READY = 'Slides/Presentation/IS_READY';
export const LOAD_STATE = 'Slides/Presentation/LOAD_STATE';