import supabase from 'src/boot/supabase';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const logOffProps = reactive({
  $router: useRouter(),
  $q: useQuasar(),
});


const logOff = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    logOffProps.$q.notify({
      color: 'negative',
      message: error.message,
    });
  }
};

export { logOff, logOffProps };
