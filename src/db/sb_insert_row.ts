import supabase from 'src/boot/supabase';

async function insertRow(title: string) {
  try {
    const { data, error } = await supabase.from('tasks').insert([
      {
        title: title,
        user_id: supabase.auth.user()?.id,
      },
    ]);

    if (error) {
      alert(error.message);
      console.error('There was an error inserting', error);
      return null;
    }
    // handle for when no tasks are returned
    if (data === null) {
      return error;
    }
    // store response to tasks
  } catch (err) {
    console.error('Error inserting data to db', err);
  }
}

export default insertRow;
