import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { MalJikanContextProvider } from './MalJikanContext.jsx';
import { ExtraAnimeContextProvider } from './ExtraAnimeContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MalJikanContextProvider>
            <ExtraAnimeContextProvider/>
                <Router>
                    <App />
                </Router>
        </MalJikanContextProvider>
    </StrictMode>
);
