import "./results.css"
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import {useState} from "react";
import {useParams} from "react-router-dom";

function Results() {

    const { id } = useParams();

    return (
        <>
            <Nav />
            <div className="Results-outer-container">
                <div className="Results-inner-container">
                    <h2>test {id}</h2>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Results;