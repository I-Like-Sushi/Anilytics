import './App.css'
import { Route, Routes } from 'react-router-dom';
import Contact from '../app/routes/Contact/contact';
import About from '../app/routes/About/about';
import Data from '../app/routes/Data/data';
import Home from '../app/routes/Home/home';
import NotFound from "./routes/NotFound/NotFound.jsx";
import Details from "./routes/Result/details.jsx";
import LogIn from "./routes/Log In/logIn.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/data" element={<Data />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;