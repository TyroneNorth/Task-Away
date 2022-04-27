import supabase from 'src/boot/supabase';
import { Notify } from 'quasar';

async function register(email: string, password: string) {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email: email,
      password: password,
    },
    {
      /*data: {
        full_name: full_name,

      },*/
    }
  );
  Notify.create({
    message: 'Successfully registered!',
    color: 'positive',
  });
  console.log(user);
  console.log(session);
  if (error) {
    Notify.create({
      message: error.message,
      color: 'negative',
    });
    console.log('Error registering user ', +error);
  }
}

export { register };
