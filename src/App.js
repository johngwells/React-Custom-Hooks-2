import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  // Another way is to put transformedTask into useEffect / Remove useCallback here / and call useHttp() with no arguments. In the custom hook the argument for data is put into the sendRequest and no dependencies will be needed anymore
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();
  useEffect(() => {
    const transformedTask = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      console.log(loadedTasks);
      setTasks(loadedTasks);
    };

    fetchTasks({
      url: "https://react-movies-3ebe6-default-rtdb.firebaseio.com/tasks.json"
    }, transformedTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
