import { Reclaim } from '@reclaimprotocol/reclaim-sdk';

export const hashEmployeeData = async (employeeData) => {
  const reclaim = new Reclaim();
  const hashedData = await reclaim.hash(JSON.stringify(employeeData));
  return hashedData;
};