import { Route, Routes } from 'react-router-dom';
import Contact from '../app/routes/Contact/contact';
import About from '../app/routes/About/about';
import Home from '../app/routes/Home/home';
import NotFound from './routes/NotFound/NotFound.jsx';
import Details from './routes/Result/details.jsx';
import LogIn from './routes/Log In/logIn.jsx';
import ProfilePage from './routes/ProfilePage/ProfilePage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import CreateNewAccount from "./routes/Log In/CreateNewAccount/CreateNewAccount.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* path=/Anilytics/ has only been created for Github pages.*/}
            <Route path="/Anilytics" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/CreateNewAccount" element={<CreateNewAccount />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />

            <Route
                path="/ProfilePage"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
