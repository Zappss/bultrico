import { combineReducers } from 'redux';

import transactions from './transactions';
import contractInfo from './contractInfo';
import tokenInfo from './tokenInfo';

const rootReducer = combineReducers({
  transactions,
  contractInfo,
  tokenInfo
});

export default rootReducer;
