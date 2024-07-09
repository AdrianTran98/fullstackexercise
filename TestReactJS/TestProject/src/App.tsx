import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NewPatient from './pages/NewPatient';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/newPatient' Component={NewPatient}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
