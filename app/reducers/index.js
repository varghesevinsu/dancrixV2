// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import AppListReducer from './appListReducer';
import ConfigurationReducer from './configurationReducer';
import CurrentDocumentReducer from './currentDocumentReducer';
import PagelistReducer from './pageListReducer';
import MenulistReducer from './menuListReducer';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    app: AppListReducer,
    pages: PagelistReducer,
    menu: MenulistReducer,
    currentDocument: CurrentDocumentReducer,
    currentConfiguration: ConfigurationReducer
  });
}
