import { configureStore } from '@reduxjs/toolkit'

import ChannelReducer from '../features/channel/channelSlice.js';
import AuthReducer from '../features/auth/authSlice.js';
import UiReducer from '../features/ui/uiSlice.js';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    ui: UiReducer,
    channel: ChannelReducer,
  },
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});