import './data.css'
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import DoItYourself1 from "../../../assets/images/DoItYourself!!1.webp"


function Data() {

    // Dit komt allemaal later. De code van deze pagina wordt niet geschreven voor de Frontend eindopdracht //

    return (
        <>
            <Nav />
            <div className="inner-container-Construction">
                <div className="outer-container-Construction">
                    <img src={DoItYourself1} alt=""/>
                    <h2 id="under-construction">This page is under construction</h2>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Data
