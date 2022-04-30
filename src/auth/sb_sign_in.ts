import supabase from 'src/boot/supabase';
import { Notify } from 'quasar';

async function login(email: string, password: string) {
  const { user, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  });

  if (error) {
    Notify.create({
      message: error.message,
      color: 'negative',
      timeout: 5000,
    });
  } else {
    Notify.create({
      message: 'Successfully logged in!',
      color: 'positive',
      timeout: 2000,
    });
  }
  return user;
}

export { login };
