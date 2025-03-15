import './App.css'
import { Route, Routes } from 'react-router-dom';
import Contact from '../app/routes/Contact/contact';
import About from '../app/routes/About/about';
import Data from '../app/routes/Data/data';
import Home from '../app/routes/Home/home';
import LoginForm from "./routes/Log In/loginForm/LoginForm.jsx";
import NotFound from "./routes/NotFound/NotFound.jsx";
import Results2 from "./routes/Result/results2.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/data" element={<Data />} />
            <Route path="/Loginform" element={<LoginForm />} />
            <Route path="/results2/:id" element={<Results2 />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;