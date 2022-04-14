import supabase from 'src/boot/supabase';
//import { v4 as uuidv4 } from 'uuid';

async function createUserData() {
  const { error } = await supabase
    .from('profiles')
    .insert({
      email: typeof String,

    },

    );
  if (error) {
    console.log('Error creating user data ', + error);
  }


}

export { createUserData };

