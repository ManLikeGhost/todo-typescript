import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, _id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo._id === _id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (_id: number) => {
    setTodos(todos.filter((todo) => todo._id !== _id));
  };

  const handleDone = (_id: number) => {
    setTodos(
      todos.map((todo) =>
        todo._id === _id ? { ...todo, isDone: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo._id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isCompleted ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isCompleted) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo._id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo._id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;








// import React, { useRef, useState, useEffect } from 'react';
// import { Todo } from '../model';
// import { MdDone, MdEdit, MdDelete } from 'react-icons/md';
// import './stylex.css';
// // import TodoList from './TodoList';
// // MdEdit
// // MdDelete
// // MdDone
// import { Draggable } from 'react-beautiful-dnd';

// type Props = {
// 	index: number;
// 	todo: Todo;
// 	todos: Todo[];
// 	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// };

// const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
// 	const [edit, setEdit] = useState<boolean>(false);

// 	const [editTodo, setEditTodo] = useState<string>(todo.todo);

// 	const inputRef = useRef<HTMLInputElement>(null);

// 	const handleEditButton = () => {
// 		if (!edit && !todo.isCompleted) {
// 			setEdit(!edit);
// 		}
// 	};

// 	const handleIsCompleted = (_id: number) => {
// 		setTodos(
// 			todos.map((todo) =>
// 				todo._id === _id ? { ...todo, isCompleted: !todo.isCompleted } : todo
// 			)
// 		);
// 	};

// 	const handleDelete = (_id: number) => {
// 		setTodos(todos.filter((todo) => todo._id !== _id));
// 	};

// 	const handleEdit = (e: React.FormEvent, _id: number) => {
// 		e.preventDefault();
// 		setTodos(
// 			todos.map((todo) =>
// 				todo._id === _id ? { ...todo, todo: editTodo } : todo
// 			)
// 		);

// 		setEdit(false);
// 	};

// 	useEffect(() => {
// 		inputRef.current?.focus();
// 	}, [edit]);

// 	return (
// 		<Draggable draggableId={todo._id.toString()} index={index}>
// 			{(provided) => (
// 				<form
// 					className='todos__single'
// 					onSubmit={(e) => handleEdit(e, todo._id)}
// 					{...provided.draggableProps}
// 					{...provided.dragHandleProps}
// 					ref={provided.innerRef}
// 				>
// 					{edit ? (
// 						<input
// 							ref={inputRef}
// 							value={editTodo}
// 							onChange={(e) => setEditTodo(e.target.value)}
// 							className='todos__single--text'
// 						/>
// 					) : todo.isCompleted ? (
// 						<s className='todos__single--text'>{todo.todo}</s>
// 					) : (
// 						<span className='todos__single--text'>{todo.todo}</span>
// 					)}

// 					<div>
// 						<span className='icon' onClick={() => handleEditButton()}>
// 							<MdEdit />
// 						</span>
// 						<span className='icon' onClick={() => handleDelete(todo._id)}>
// 							<MdDelete />
// 						</span>
// 						<span className='icon' onClick={() => handleIsCompleted(todo._id)}>
// 							<MdDone />
// 						</span>
// 					</div>
// 				</form>
// 			)}
// 		</Draggable>
// 	);
// };

// export default SingleTodo;
