import supabase from 'src/boot/supabase';


async function register(email: string, password: string, full_name: string) {
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  },
    {
      data: {
        full_name: full_name,

      },
    }
  )
  console.log(user);
  console.log(session);
  if (error) {
    console.log('Error registering user ', + error);
  }

}

export { register };
