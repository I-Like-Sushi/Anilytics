import "./HeaderHome.css"
import Searchbar from "./searchbar/Searchbar.jsx";



function HeaderHome() {



    return (
        <header className="header">
            <section className="inner-container">
                <h1>Humanize analytics</h1>
                <h4>Search for your favourite Anime and compare the results from different sources!</h4>
                <Searchbar />
            </section>
        </header>

    )
}

export default HeaderHome;