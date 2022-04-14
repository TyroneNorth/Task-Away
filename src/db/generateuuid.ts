// Generates uuid for profiles table
// Language: typescript

import { v4 as uuidv4 } from 'uuid';

export const assignUUID = async () => {
  uuidv4();
}
