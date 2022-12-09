import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginForm from './components/Login';
import Menu from './components/Menu';
// import Footer from './components/Footer';
import Routers from './Routers/Routers';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const token = sessionStorage.getItem('myToken')
  const conFirmToken = sessionStorage.getItem('conFirmToken')

  return (
    <div>
      {token && token === conFirmToken ? <div>
      <Header /> 
     <Menu />
     <Routers />
     <Footer/>
      </div> : <div>
      <LoginForm/>
    </div>}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
