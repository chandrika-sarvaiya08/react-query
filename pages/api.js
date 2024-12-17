// // api.js

// export const fetchTodos = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   };
  
//   export const addTodo = async (newTodo) => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTodo),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add new todo');
//     }
//     return response.json();
//   };
  