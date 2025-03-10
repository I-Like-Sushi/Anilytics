import './App.css'
import { Route, Routes } from 'react-router-dom';
import Contact from '../app/routes/Contact/contact';
import About from '../app/routes/About/about';
import Data from '../app/routes/Data/data';
import Home from '../app/routes/Home/home';
import LoginForm from "./routes/Log In/loginForm/LoginForm.jsx";
import NotFound from "./routes/NotFound/NotFound.jsx";
import Results from "./routes/Result/results.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/data" element={<Data />} />
            <Route path="/Loginform" element={<LoginForm />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;