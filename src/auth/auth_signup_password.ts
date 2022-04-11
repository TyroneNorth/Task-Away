import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const auth = getAuth();
const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('User signed up', user);
        $q.dialog({
          title: 'Success',
          message: 'Signed up successfully',
          color: 'positive',
        });
        router.push('/');
      })
      .catch((error) => {
        console.log('Error signing up', error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            $q.dialog({
              title: 'Email already in use',
              message: 'Email already in use. Please try again.',
              color: 'negative',
            });
            break;
          case 'auth/invalid-email':
            $q.dialog({
              title: 'Invalid email',
              message: 'Invalid email. Please try again.',
              color: 'negative',
            });
            break;
          case 'auth/operation-not-allowed':
            $q.dialog({
              title: 'Operation not allowed',
              message: 'Operation not allowed. Please try again.',
              color: 'negative',
            });
            break;
          case 'auth/weak-password':
            $q.dialog({
              title: 'Weak password',
              message: 'Weak password. Please try again.',
              color: 'negative',
            });
            break;
          default:
            $q.dialog({
              title: 'Error',
              message: 'Email or password was incorrect',
              color: 'negative',
            });
            break;
        }
      });
  }
  catch (error) {
    console.log('Error signing up', error);
    $q.dialog({
      title: 'Error',
      message: 'An error occurred. Please try again.',
      color: 'negative',
    });
  }
};

export default signUp;
