// "use client";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";
// import Todos from "../../components/todo"

// // Create a client
// const queryClient = new QueryClient();

// const App = ()=> {
//   return (
//     // Provide the client to your App
//     <QueryClientProvider client={queryClient}>
//       <Todos />
//     </QueryClientProvider>
//   );
// }

// export default App
"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Todos from "../../components/todo"

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
