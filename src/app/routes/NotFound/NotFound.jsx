import "./NotFound.css"
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";

function NotFound() {

    return (
        <>
        <Nav />
        <div className="notfound-container">
            <h1 className="notfound-heading">404</h1>
            <p className="notfound-message">
                Oops! Something went wrong.
            </p>
            <a href="/" className="notfound-home-link">
                Return Home
            </a>
        </div>
        <Footer />
        </>
    )
}

export default NotFound