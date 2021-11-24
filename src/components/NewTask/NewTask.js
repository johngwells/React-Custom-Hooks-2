import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  console.log(props)
  

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    console.log(createdTask);
    props.onAddTask(createdTask);
  }

  const httpData = useHttp()
  const { isLoading, error, sendRequest: sendTaskRequest } = httpData;

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://react-movies-3ebe6-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: { text: taskText }
    }, createTask.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
