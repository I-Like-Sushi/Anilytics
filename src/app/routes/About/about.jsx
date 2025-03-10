import './about.css'
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import ChansawMan from "../../../assets/images/ChainsawMan.png"
import BocchiTheRock_3 from "../../../assets/images/BocchiTheRock!3.png"
import CallOfTheNight from "../../../assets/images/CallOfTheNight.png"
import MaoMao_1 from "../../../assets/images/MaoMao-1.png"
import Dandadan from "../../../assets/images/Dandadan.png"
import SpiceAndWolf_1 from"../../../assets/images/SpiceAndWolf_1.png"

function About() {

    return (
        <>
            <Nav/>
            <div className="responsive-container-block bigContainer">
                <div className="responsive-container-block Container">
                    <div className="responsive-container-block leftSide">
                        <p className="text-blk heading">
                            Test1
                        </p>
                        <p className="text-blk subHeading">
                            Test2
                            {
                                // Humanize Statistics //
                            }
                        </p>
                    </div>
                    <div className="responsive-container-block rightSide">
                        {/*<img className="number1img"*/}
                        {/*     src= {ChansawMan} />*/}
                        {/*<img className="number2img"*/}
                        {/*     src={BocchiTheRock_3}/>*/}
                        {/*<img className="number3img"*/}
                        {/*     src={CallOfTheNight}/>*/}
                        {/*<img className="number4img"*/}
                        {/*     src={MaoMao_1}/>*/}
                        {/*<img className="number6img"*/}
                        {/*     src={Dandadan}/>*/}
                        {/*<img className="number5img"*/}
                        {/*     src={SpiceAndWolf_1}/>*/}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About
