import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// app routes
import Header from './components/Header';
import Home from   './components/Home';
import News from   './components/News';
import Footer from './components/Footer';
import Rent from './components/Rent';
import RentPage from './components/RentPage';

// user
import Login        from './components/user/Login';
import Registration from './components/user/Registration';
import User         from './components/user/User';

// bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user" element={<User />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/RentPage/:id" element={<RentPage />} />
          <Route path="/rent/RentPage/:id" element={<RentPage />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
