import {BrowserRouter as Router, Routes as RoutesReact, Route, Link } from 'react-router-dom';
import Home from './pages';
import SignIn from './pages/signin';
import SignUp from './pages/signup';


export default function Routes() {
  return (
    <Router>
      <RoutesReact>
        <Route path='/' element={<Home />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='*' element={<h1>Not Found</h1>}/>
        {/* <Route path='user/:name' element={<User />} >
          <Route path='edit' element={<h1>Editar perfil</h1>}/>
          <Route path='Order' element={<h1>Meus Pedidos</h1>}/>
        </Route> */}
      </RoutesReact>
    </Router>
  )
}