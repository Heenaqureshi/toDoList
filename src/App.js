import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TodoApp from './component/TodoApp';
import { Edit } from './component/Edit';
import { Pagenotfound } from './component/Pagenotfound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodoApp/>}/>
          <Route path='edit/:id' element={<Edit/>}/>
          <Route path='*' element={<Pagenotfound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
