import './about.css'
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import ShiroBako5 from "../../../assets/images/ShiroBako5.webp"
import SpiceAndWolf1 from "../../../assets/images/SpiceAndWolf1.jpeg"
import MaoMao1webp from "../../../assets/images/MaoMao1webp.webp"

function About() {

    return (
        <>
            <Nav/>
            <div className="responsive-container-block bigContainer">
                <div className="responsive-container-block Container">
                    <div className="responsive-container-block leftSide">
                        <p className="text-blk heading">
                            What is Anilytics?
                        </p>
                        <p className="text-blk subHeading">
                            Anilytics is an application that tracks data from multiple sources that contain user reviews and ratings and puts them all into one page.
                            This way if you ever have the feeling that one source might be biased, you than can compare that source with the other sources and this way you don&#39;t have to
                            feel forced to blindly trust one source.
                            {
                                // Humanize Statistics //
                            }
                        </p>
                        <p className="text-blk heading">
                            Why was Anilytics created?
                        </p>
                        <p className="text-blk subHeading">
                            Anilytics originally was created by a student (that&#39;s me) as an final assigment for their Front-end studies. I was assigned by my University of Applied Sciences to create an application in ReactJS/Vite.
                            I has originally almost been a fan of Japanese Animation, But was surprised at how decentralized to collect information the industry and fanbase actually is.
                            The movie and tv industry for example have the <a className="IMDB-link" href="https://www.imdb.com/" target="_blank">International Movie DataBase</a> or IMDB for short .
                            This has both its Strengths and weaknesses. On one hand, almost every piece of information about a movie or tv show can be found on one website. But on the other hand, it can create 
                            an incredibly biased judgement.
                            
                            That&#39;s why at Anilytics I don&#39;t want one source, which might be easily manipulated, into clouding your judgement. That is unless the official source tells us so.
                        </p>
                        <p className="text-blk heading">
                            How does Anilytics work?
                        </p>
                        <p className="text-blk subHeading">
                            Simply search for the Anime that particularly catches your interest, then click on the title that matches your search. Once you do so, you will be directed to its page.
                        </p>
                        <p className="text-blk heading">
                            What&#39;s next for Anilytics?
                        </p>
                        <p className="text-blk subHeading">
                            But once I have finished my assignment, I shall continue creating and adding more. I want to extend search requests.
                            I want to create a Data page in which financials of Animation studios are reported.
                            But before I will do any of that, I want to first get more sources and adding an option to also search for manga&#39;s.
                        </p>
                        <p className="thank-you">
                            Final message.
                        </p>
                        <p className="text-blk subHeading">
                            I thank everyone using this website/application. I&#39;ve never been one good with words, but I&#39;m incredibly grateful for it. If you even have the slightest suggestion for me,
                            please feel free to contact me by sending me your feedback and/or ideas. You can contact me by sending me a message in the contact page. Or if you prefer, you can also check below for direct links to my Github.
                            I would love to hear from you!
                        </p>
                    </div>
                    <div className="responsive-container-block rightSide">
                        <img className="number1img"
                             src={ShiroBako5} alt="Image of Shirobako"/>
                        <img className="number2img"
                             src={SpiceAndWolf1} alt="Image of Spice and Wolf"/>
                        <img className="number3img"
                             src={MaoMao1webp} alt="Image of Fate/Zero"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About
