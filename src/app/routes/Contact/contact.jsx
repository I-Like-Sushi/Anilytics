import './contact.css';
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import ShiroBako1 from "../../../assets/images/ShiroBako1.png";
import ReusableModal from "../../../components/ReusableModal.jsx";
import { useState } from "react";

function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Nav />
            <div className="contact_us">
                <div className="responsive-container-block bigContainer">
                    <div className="responsive-container-block Container">
                        <div className="responsive-cell-block wk-desk-5 wk-ipadp-4 wk-tab-12 wk-mobile-12">
                            <img className="mainImg" src={ShiroBako1} alt="Contact" />
                        </div>
                        <div id="email-container" className="responsive-cell-block wk-desk-7 wk-ipadp-8 wk-tab-12 wk-mobile-12">
                            <p className="text-blk heading">Get in touch</p>
                            <form className="formTable" id="izml" onSubmit={handleSubmit}>
                                <div className="firstRow">
                                    <div className="fullNameArea">
                                        <p className="cardHead">Full Name</p>
                                        <input className="fullName" id="fullName" name="fullName" type="text" required />
                                    </div>
                                    <div className="emailArea">
                                        <p className="cardHead">Email Address</p>
                                        <input className="email" id="email" name="email" type="email" required />
                                    </div>
                                </div>
                                <div className="messageArea">
                                    <p className="cardHead">Message</p>
                                    <textarea className="message" cols="30" id="message" name="message" rows="10" required></textarea>
                                </div>
                                <button type="submit" className="submit" id="w-c-s-bgc_p-1-dm-id-4">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ReusableModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Message Sent"
            >
                <p>Your message has been sent successfully! Thank you for reaching out.</p>
            </ReusableModal>
        </>
    );
}

export default Contact;
