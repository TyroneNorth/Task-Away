import supabase from 'src/boot/supabase';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const logInProps = reactive({
  email: '',
  password: '',
  $router: useRouter(),
  $q: useQuasar(),
});

const logIn = async () => {
  const { error } = await supabase.auth.signIn({
    email: logInProps.email,
    password: logInProps.password,
  })
  if (error) {
    logInProps.$q.notify({
      color: 'negative',
      message: error.message,
    });
  }
};

export { logIn, logInProps };
