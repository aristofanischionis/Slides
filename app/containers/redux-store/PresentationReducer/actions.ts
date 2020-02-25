import {
  SET_THEME,
  SET_TITLE,
  SET_DESCRIPTION,
  IMAGE_UPLOAD_REQUEST,
  SET_ASSETS_PATH,
  SET_USER,
  SAVE_REQUEST,
  LOAD_REQUEST,
  LOAD_STATE,
  IS_READY,
} from './constants';

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  theme,
}) as const;

export const setTitle = (title: string) => ({
  type: SET_TITLE,
  title,
}) as const;

export const setDescription = (description: string) => ({
  type: SET_DESCRIPTION,
  description,
}) as const;

export const uploadImageRequest = (request: boolean) => ({
  type: IMAGE_UPLOAD_REQUEST,
  request,
}) as const;

export const setAssetsPath = (path: string) => ({
  type: SET_ASSETS_PATH,
  path,
}) as const;

export const setUsername = (user: string) => ({
  type: SET_USER,
  user,
}) as const;

export const setSaveRequest = (request: boolean) => ({
  type: SAVE_REQUEST,
  request,
}) as const;

export const setLoadRequest = (request: boolean) => ({
  type: LOAD_REQUEST,
  request,
}) as const;

export const loadState = (state: any) => ({ // check if this object or string?
  type: LOAD_STATE,
  state,
}) as const;

export const setIsReady = (ready: boolean) => ({
  type: IS_READY,
  ready,
}) as const;

export type Action = ReturnType<
 typeof setTheme | typeof setTitle | typeof setDescription |
 typeof uploadImageRequest | typeof setAssetsPath | typeof setUsername |
 typeof setSaveRequest | typeof setLoadRequest | typeof loadState |
 typeof setIsReady
>