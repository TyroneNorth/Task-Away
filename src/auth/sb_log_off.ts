import supabase from 'src/boot/supabase';
import { Notify } from 'quasar';

const logOff = async () => {
  const { error } = await supabase.auth.signOut();
  Notify.create({
    message: 'Successfully logged out!',
    color: 'positive',
  });
  console.log('User logged out successfully');
  if (error) {
    Notify.create({
      message: error.message,
      color: 'negative',
    });
    console.log(error);
  }
};

export { logOff };
