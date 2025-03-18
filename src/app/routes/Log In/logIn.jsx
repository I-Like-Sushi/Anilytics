import "./logIn.css"
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";

function logIn() {

    return(
        <>
            <Nav />
            <body>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Login Here</h3>

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username"/>

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password"/>

                <button>Log In</button>
            </form>
            </body>
            <Footer />
        </>
    )
}

export default logIn;