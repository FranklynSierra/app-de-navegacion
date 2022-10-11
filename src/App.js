
import './App.css';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import { Main } from './pages/Main';
import Register from './pages/form/register';
import Login from './pages/form/login';
import Navigation from './pages/navigation/navigation';
import PageNotFound from './pages/404/pageNotFound';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/authContext';
function App() {
  
  
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>

       <Route path='/'element={<Main/>}></Route>
       <Route path='/register'element={<Register/>}></Route>
       <Route path='/login'element={<Login/>}></Route>
      <Route element={<RequireAuth/>}>
       <Route path='/navigate'element={<Navigation/>}></Route>
      </Route>
      
       <Route path='/routes'element={<Navigation/>}></Route>

       <Route path='*'element={<PageNotFound/>}></Route>

      </Routes>
      </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
