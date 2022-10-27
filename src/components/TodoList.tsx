import React from 'react';
import './stylex.css';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
	return (
		<div className='todos'>
			{todos.map((el) => (
				<SingleTodo todo={el} key={el._id} todos={todos} setTodos={setTodos} />
			))}
		</div>
	);
};

export default TodoList;
