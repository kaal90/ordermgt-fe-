import './App.css';
import { Route, Routes } from 'react-router-dom';
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Orders/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
  );
}

export default App;
