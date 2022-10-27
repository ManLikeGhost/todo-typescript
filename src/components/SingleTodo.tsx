import React, { useRef, useState, useEffect } from 'react';
import { Todo } from '../model';
import { MdDone, MdEdit, MdDelete } from 'react-icons/md';
import './stylex.css';
// import TodoList from './TodoList';
// MdEdit
// MdDelete
// MdDone

type Props = {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
	const [edit, setEdit] = useState<boolean>(false);

	const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null)

	const handleEditButton = () => {
		if (!edit && !todo.isCompleted) {
			setEdit(!edit);
		}
	};

	const handleIsCompleted = (_id: number) => {
		setTodos(
			todos.map((todo) =>
				todo._id === _id ? { ...todo, isCompleted: !todo.isCompleted } : todo
			)
		);
	};

	const handleDelete = (_id: number) => {
		setTodos(todos.filter((todo) => todo._id !== _id));
  };
  
  const handleEdit = (e: React.FormEvent, _id:number) => {
    e.preventDefault()
    setTodos(todos.map((todo) =>
      todo._id === _id ? {...todo, todo:editTodo}:todo
    ))

    setEdit(false)
  }



  useEffect(() => {
   inputRef.current?.focus()
  }, [edit])
  
  
	return (
		<form className='todos__single' onSubmit={(e)=>handleEdit(e, todo._id)}>
			{edit ? (
        <input ref={inputRef} value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} className='todos__single--text' />
			) : todo.isCompleted ? (
				<s className='todos__single--text'>{todo.todo}</s>
			) : (
				<span className='todos__single--text'>{todo.todo}</span>
			)}

			<div>
				<span className='icon' onClick={() => handleEditButton()}>
					<MdEdit />
				</span>
				<span className='icon' onClick={() => handleDelete(todo._id)}>
					<MdDelete />
				</span>
				<span className='icon' onClick={() => handleIsCompleted(todo._id)}>
					<MdDone />
				</span>
			</div>
		</form>
	);
};

export default SingleTodo;
