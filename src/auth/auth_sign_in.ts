import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const auth = getAuth()
const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('User signed in', user);
        router.push('/');
      })
      .catch((error) => {
        console.log('Error signing in', error);
        switch (error.code) {
          case 'auth/user-not-found':
            $q.dialog({
              title: 'User not found',
              message: 'User not found. Please register.',
              color: 'negative',
            });
            break;
          case 'auth/wrong-password':
            $q.dialog({
              title: 'Wrong password',
              message: 'Wrong password. Please try again.',
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
    console.log('Error signing in', error);
    $q.dialog({
      title: 'Error',
      message: 'An error occurred. Please try again.',
      color: 'negative',
    });
  }
};

const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider).then(() => {
      console.log('User signed in');
      router.push('/');
    });
  }
  catch (error) {
    console.log('Error signing in', error);
    $q.dialog({
      title: 'Error',
      message: 'An error occurred. Please try again.',
      color: 'negative',
    });
  }
};

export { login, loginGoogle };
