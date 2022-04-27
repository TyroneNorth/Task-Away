import supabase from 'src/boot/supabase';
import { Tasks } from 'src/components/models';

async function updateRowContent(task: Tasks) {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ title: task.title, content: task.content })
      .eq('title', task.title);

    if (error) {
      alert(error.message);
      console.error('There was an error updating', error);
      return null;
    }
    // handle for when no tasks are returned
    else if (data === null) {
      return null;
    } else {
      return data;
    }
    // store response to tasks
  } catch (err) {
    console.error('Error updating data to db', err);
  }
}

export default updateRowContent;
