// import React from "react";
// import { fetchTodos, addTodo } from "@/pages/api";
// import { useMutation, useQuery, useQueryClient } from "react-query";

// const Todos = () => {
//   // Access the client
//   const queryClient = useQueryClient();

//   // Queries
//   const query = useQuery("todos", fetchTodos);

//   // Mutations
//   const mutation = useMutation(addTodo, {
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries("todos");
//     },
//   });

//   return (
//     <div>
//       <ul>
//         {query.data.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>

//       <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now(),
//             title: "Do Laundry",
//           });
//         }}
//       >
//         Add Todo
//       </button>
//     </div>
//   );
// };

// export default Todos;
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Fetch API data
const fetchTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

// Add new todo
const addTodo = async (newTodo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error('Failed to add new todo');
  }
  return response.json();
};

const Todos = () => {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState(''); // State to store new todo input

  // Queries
  const { data: todos, isLoading, isError, error } = useQuery("todos", fetchTodos);

  // Mutations
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos"); // Refetch todos after successful addition
      setNewTodoTitle(''); // Clear the input field
    },
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Handle form submission
  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!newTodoTitle.trim()) return alert("Todo title cannot be empty"); // Validation
    mutation.mutate({
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    });
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Form to Add a New Todo */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newTodoTitle} 
          onChange={(e) => setNewTodoTitle(e.target.value)} 
          placeholder="Enter a new todo..." 
          style={{ padding: '10px', width: '70%' }} 
        />
        <button 
          type="submit" 
          disabled={mutation.isLoading} 
          style={{ marginLeft: '10px', padding: '10px 20px' }}
        >
          {mutation.isLoading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {/* Display Table for Todos */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? '✅ Completed' : '❌ Incomplete'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;
