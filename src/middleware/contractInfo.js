import { getAddressICO } from '../utils/contract/getAddressICO';
import { getOwnerContract } from '../utils/contract/getOwnerContract';
import { getOwnerToken } from '../utils/contract/getOwnerToken';
import { getAddressToken } from '../utils/contract/getAddressToken';

export async function getICOInfo() {
  const addressICO = await getAddressICO();
  const addressToken = await getAddressToken();
  const addressOwnerICO = await getOwnerContract();
  const addressOwnerToken = await getOwnerToken();

  const info = {
    addressICO,
    addressToken,
    addressOwnerICO,
    addressOwnerToken
  };
  return info;
}
