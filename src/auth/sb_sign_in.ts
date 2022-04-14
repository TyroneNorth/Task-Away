import supabase from 'src/boot/supabase';


async function login(email: string, password: string) {
  const { user, session, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  })

  if (error) {
    console.log('Error logging in ', + error);
  }
  else {
    console.log('User logged in successfully');
    console.log(user);
    console.log(session);

  }


}


export { login };
