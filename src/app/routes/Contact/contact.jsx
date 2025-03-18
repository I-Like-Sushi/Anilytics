import './contact.css'
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import ShiroBako1 from "../../../assets/images/ShiroBako1.png";

function Contact() {
    const handleMailTo = (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const emailInput = document.getElementById("email").value;
        const messageInput = document.getElementById("message").value;

        const toEmail = "Anilytics@outlook.com";

        const subject = "Contact Form Submission";
        const body = `Full Name: ${fullName}\nEmail: ${emailInput}\nMessage: ${messageInput}`;

        window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <>
            <Nav/>
            <div className="contact_us">
                <div className="responsive-container-block bigContainer">
                    <div className="responsive-container-block Container">
                        <div className="responsive-cell-block wk-desk-5 wk-ipadp-4 wk-tab-12 wk-mobile-12">
                            <img className="mainImg" src={ShiroBako1} alt="Contact"/>
                        </div>
                        <h2 id="not-working">The form box is coming soon! <br/>In the mean time please contact me on
                            <a className="bsky" href="https://bsky.app/profile/anilytics.bsky.social"
                               target="_blank"> Bluesky</a>, visit my <a className="github"
                                                                        href="https://github.com/I-Like-Sushi"
                                                                        target="_blank">Github</a> page, or contact me directly by emailing to: anilytics@outlook.com.</h2>
                        <div id="email-container"
                             className="responsive-cell-block wk-desk-7 wk-ipadp-8 wk-tab-12 wk-mobile-12">
                            <p className="text-blk heading">Get in touch</p>
                            <form className="formTable" id="izml">
                                <div className="firstRow">
                                    <div className="fullNameArea">
                                        <p className="cardHead">Full Name</p>
                                        <input
                                            className="fullName"
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="emailArea">
                                        <p className="cardHead">Email Address</p>
                                        <input
                                            className="email"
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="messageArea">
                                    <p className="cardHead">Message</p>
                                    <textarea
                                        className="message"
                                        cols="30"
                                        id="message"
                                        name="message"
                                        rows="10"
                                        required
                                    ></textarea>
                                </div>
                                <a
                                    className="submit"
                                    href="#"
                                    id="w-c-s-bgc_p-1-dm-id-4"
                                    onClick={handleMailTo}
                                >
                                    Send Message
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Contact;
