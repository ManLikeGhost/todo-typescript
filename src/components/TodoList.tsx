import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  completedTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo._id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo._id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;






// import React from 'react';
// import './stylex.css';
// import { Todo } from '../model';
// import SingleTodo from './SingleTodo';
// import { Droppable } from 'react-beautiful-dnd';

// interface Props {
// 	todos: Todo[];
// 	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// 	completedTodos: Todo[];
// 	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// }

// const TodoList: React.FC<Props> = ({
// 	todos,
// 	setTodos,
// 	completedTodos,
// 	setCompletedTodos,
// }) => {
// 	return (
// 		// <div className='todos'>
// 		// 	{todos.map((el) => (
// 		// 		<SingleTodo todo={el} key={el._id} todos={todos} setTodos={setTodos} />
// 		// 	))}
// 		// </div>

// 		<div className='container'>
// 			<Droppable droppableId='TodosList'>
// 				{(provided) => {
// 					<div
// 					innerRef={provided.innerRef}
// 					{...provided.droppableProps}
// 						className='todos'
						
// 					>
// 						<span className='todos__heading'>Active Tasks</span>
// 						{todos.map((todo) => (
// 							<SingleTodo
// 								todo={todo}
// 								key={todo._id}
// 								todos={todos}
// 								setTodos={setTodos}
// 							/>
// 						))}
// 						{provided.placeholder}
// 					</div>;
// 				}}
// 			</Droppable>
// 				<div className='todos remove'>
// 					<span className='todos__heading'>Completed Tasks</span>
// 					{todos.map((todo) => (
// 						<SingleTodo
// 							todo={todo}
// 							key={todo._id}
// 							todos={todos}
// 							setTodos={setTodos}
// 						/>
// 					))}
// 				</div>
// 		</div>
// 	);
// };

// export default TodoList;
