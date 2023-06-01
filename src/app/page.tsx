'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
  }

  type TaskList = Task[];

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleCheckbox(task: Task) {
    const newTask = {
      ...task,
      completed: !task.completed,
    };

    setTaskList(
      taskList.map((el) => {
        return task.id === el.id ? newTask : el;
      })
    );
  }

  function addTask() {
    setTaskList((prevTasksList) => [
      ...prevTasksList,
      {
        id: uuidv4(),
        title: input,
        completed: false,
        createdAt: new Date(),
      },
    ]);
    setInput('');
  }

  return (
    <>
      <input
        onChange={onChange}
        className="border-2 border-black"
        type="text"
        value={input}
      />
      <button onClick={addTask}>ADD ITEM</button>
      <ul id="to-do-list">
        {taskList.map((el, idx) => {
          return (
            <li key={idx}>
              <input
                type="checkbox"
                defaultChecked={el.completed ? true : false}
                onChange={() => handleCheckbox(el)}
              />{' '}
              {el.title}
            </li>
          );
        })}
      </ul>
      <button onClick={() => console.log(taskList)}>Log</button>
    </>
  );
}
