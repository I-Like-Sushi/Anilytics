import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { MalJikanContextProvider } from '../context/MalJikanContext.jsx';
import { ExtraAnimeContextProvider } from '../context/ExtraAnimeContext.jsx';
import { AuthProvider } from '../context/AuthContext.jsx'; // Import AuthProvider
import Modal from 'react-modal'; // Import react-modal

Modal.setAppElement("#root");

createRoot(document.getElementById('root')).render(
    <MalJikanContextProvider>
        <ExtraAnimeContextProvider>
            <AuthProvider>
                <Router>
                    <App />
                </Router>
            </AuthProvider>
        </ExtraAnimeContextProvider>
    </MalJikanContextProvider>
);
