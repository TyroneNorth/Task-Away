import supabase from 'src/boot/supabase';
import { Notify } from 'quasar';

async function login(email: string, password: string) {
  const { user, session, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  });

  if (error) {
    Notify.create({
      message: error.message,
      color: 'negative',
    });
  } else {
    Notify.create({
      message: 'Successfully logged in!',
      color: 'positive',
    });
    console.log('User logged in successfully');
    console.log(user);
    console.log(session);
  }
}

export { login };
