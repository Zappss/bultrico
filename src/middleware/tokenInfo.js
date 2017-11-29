// Token 
import {
  getTotalToken,
  getSoldToken,
  getLeftToken
} from '../utils/token';

// ICO
import {
  getTotalETH,
  getICODate,
  getFinishICODate
   } from '../utils/contract';
import { getInvestorsCountICO } from '../utils/contract/getInvestorsCountICO';



export async function getTokenInfo() {

  // ICO
  const totalTokensICO = await getTotalToken();
  const soldTokensICO = await getSoldToken();
  const leftTokensICO = await getLeftToken();
  const totalETHICO = await getTotalETH();
  const investorsCountICO = await getInvestorsCountICO();
  
  const dateStartICO = await getICODate();
  const dateFinishICO = await getFinishICODate();

 return ({
    totalTokensICO,
    soldTokensICO,
    leftTokensICO,
    totalETHICO,
    dateStartICO: new Date(dateStartICO * 1000).toUTCString(),
    dateFinishICO: new Date(dateFinishICO * 1000).toUTCString(),
    investorsCountICO
 });
}
