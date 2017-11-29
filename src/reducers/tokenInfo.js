import { INITIALIZE_TOKEN_INFO, UPDATE_TOKEN_INFO } from '../constants/ActionsTypes';

const initialState = {
  // ICO
  totalTokensICO: 0,
  soldTokensICO: 0,
  leftTokensICO: 0,
  totalETHICO: 0,
  investorsCountICO: 0,
  dateStartICO: 0,
  dateFinishICO: 0,

  // Main
  totalTokens: 0,
  soldTokens: 0,
  leftTokens: 0,
  totalETH: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_TOKEN_INFO:
      return state;
    case UPDATE_TOKEN_INFO:
      return {
        // ICO
        totalTokensICO: action.payload.totalTokensICO,
        soldTokensICO: action.payload.soldTokensICO,
        leftTokensICO: action.payload.leftTokensICO,
        totalETHICO: action.payload.totalETHICO,
        investorsCountICO: action.payload.investorsCountICO,
        dateStartICO: action.payload.dateStartICO,
        dateFinishICO: action.payload.dateFinishICO,

        /*// Main
        totalTokens: action.payload.totalTokens,
        soldTokens: action.payload.soldTokens,
        leftTokens: action.payload.leftTokens,
        totalETH: action.payload.totalETH*/
      };
    default:
      return state;
  }
};
