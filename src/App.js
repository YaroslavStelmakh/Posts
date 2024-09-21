import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoutes";
import { AuthProvider } from './context/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer position="top-center" autoClose={3000} />
    </QueryClientProvider>
  );
}

export default App;
