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

// import React, { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";

// // Fetch all todos from API
// const fetchTodos = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//   if (!response.ok) {
//     throw new Error('Failed to fetch todos');
//   }
//   return response.json();
// };

// // Add a new todo to the API
// const addTodo = async (newTodo) => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newTodo),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to add new todo');
//   }
//   const data = await response.json();
//   return { ...newTodo, id: data.id || Date.now() }; // Ensure ID is consistent
// };

// // Delete a todo from the API
// const deleteTodo = async (id) => {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     throw new Error('Failed to delete todo');
//   }
//   return id; // Return the id of the deleted todo
// };

// const Todos = () => {
//   const queryClient = useQueryClient();
//   const [newTodoTitle, setNewTodoTitle] = useState('');
//   const [localTodos, setLocalTodos] = useState([]); // Track locally added todos
//   const [deletedTodos, setDeletedTodos] = useState([]); // Track deleted todos

//   // Fetch todos from API
//   const { data: todos = [], isLoading, isError, error } = useQuery("todos", fetchTodos);

//   // Mutation for adding new todos
//   const addMutation = useMutation(addTodo, {
//     onMutate: async (newTodo) => {
//       setLocalTodos((prev) => [{ ...newTodo, id: Date.now() }, ...prev]);
//     },
//     onError: (err, newTodo) => {
//       setLocalTodos((prev) => prev.filter((todo) => todo.title !== newTodo.title));
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries("todos");
//     },
//   });

//   // Mutation for deleting todos
//   const deleteMutation = useMutation(deleteTodo, {
//     onMutate: async (id) => {
//       setDeletedTodos((prev) => [...prev, id]); // Add deleted ID to local state
//     },
//     onError: (err, id, context) => {
//       setDeletedTodos((prev) => prev.filter((deletedId) => deletedId !== id));
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries("todos"); // Refetch todos to ensure consistency
//     },
//   });

//   // Handle form submission
//   const handleAddTodo = (e) => {
//     e.preventDefault();
//     if (!newTodoTitle.trim()) return alert("Todo title cannot be empty");
//     addMutation.mutate({ title: newTodoTitle, completed: false });
//     setNewTodoTitle('');
//   };

//   // Handle delete todo
//   const handleDeleteTodo = (id) => {
//     if (window.confirm('Are you sure you want to delete this todo?')) {
//       deleteMutation.mutate(id);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   // Combine local todos with API todos, excluding deleted ones
//   const combinedTodos = [...localTodos, ...todos].filter(
//     (todo, index, self) =>
//       !deletedTodos.includes(todo.id) && // Exclude deleted todos
//       self.findIndex((t) => t.id === todo.id) === index // Remove duplicates
//   );

//   return (
//     <div>
//       <h1>Todo List</h1>

//       {/* Form to Add a New Todo */}
//       <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           value={newTodoTitle}
//           onChange={(e) => setNewTodoTitle(e.target.value)}
//           placeholder="Enter a new todo..."
//           style={{ padding: '10px', width: '80%' }}
//         />
//         <button
//           type="submit"
//           disabled={addMutation.isLoading}
//           style={{ marginLeft: '10px', padding: '10px 20px' }}
//         >
//           {addMutation.isLoading ? 'Adding...' : 'Add Todo'}
//         </button>
//       </form>

//       {/* Display Table for Todos */}
//       <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {combinedTodos.map((todo) => (
//             <tr key={todo.id}>
//               <td>{todo.id}</td>
//               <td>{todo.title}</td>
//               <td>{todo.completed ? '✅ Completed' : '❌ Incomplete'}</td>
//               <td>
//                 <button
//                   onClick={() => handleDeleteTodo(todo.id)}
//                   disabled={deleteMutation.isLoading}
//                   style={{ padding: '5px 10px', color: 'red' }}
//                 >
//                   {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Todos;


import React, { useState, useEffect } from "react";

// Fetch all todos from API
const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

// Add a new todo to the API
const addTodo = async (newTodo) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Failed to add new todo");
  }
  const data = await response.json();
  return { ...newTodo, id: data.id || Date.now() };
};

// Update a todo in the API
const updateTodo = async (updatedTodo) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return updatedTodo;
};

// Delete a todo from the API
const deleteTodo = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  return id;
};

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Handle adding a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return alert("Todo title cannot be empty");

    const newTodo = { title: newTodoTitle, completed: false };
    try {
      setIsLoading(true);
      const addedTodo = await addTodo(newTodo);
      setTodos((prev) => [addedTodo, ...prev]);
      setNewTodoTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating a todo
  const handleUpdateTodo = async (id, updatedFields) => {
    try {
      const updatedTodo = { id, ...updatedFields };
      const updated = await updateTodo(updatedTodo);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(id);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Todo List</h1>

      {/* Form to Add a New Todo */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Enter a new todo..."
          style={{ padding: "10px", width: "80%" }}
        />
        <button
          type="submit"
          style={{ marginLeft: "10px", padding: "10px 20px" }}
        >
          Add Todo
        </button>
      </form>

      {/* Display Table for Todos */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                <input
                  type="text"
                  defaultValue={todo.title}
                  onBlur={(e) =>
                    handleUpdateTodo(todo.id, { title: e.target.value })
                  }
                  style={{ width: "80%" }}
                />
              </td>
              <td>
                <select
                  defaultValue={todo.completed}
                  onChange={(e) =>
                    handleUpdateTodo(todo.id, {
                      completed: e.target.value === "true",
                    })
                  }
                >
                  <option value="false">Incomplete</option>
                  <option value="true">Completed</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{ padding: "5px 10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;

