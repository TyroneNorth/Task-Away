import supabase from 'src/boot/supabase';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const registerProps = reactive({
  email: '',
  password: '',
  $router: useRouter(),
  $q: useQuasar(),
  supabase: supabase,

});

const register = async () => {
  const { error } = await supabase.auth.signUp({
    email: registerProps.email,
    password: registerProps.password,
  })
  if (error) {
    registerProps.$q.notify({
      color: 'negative',
      message: error.message,
    });
  }
}

export { register, registerProps };
