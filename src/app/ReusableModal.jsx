import Modal from "react-modal";

const ReusableModal = ({
                           isOpen,
                           onClose,
                           title = "Modal Title",
                           children,
                           customStyles,
                       }) => {
    // Default styles can be overridden by passing a customStyles prop.
    const defaultStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            width: "80%",
            maxWidth: "500px",
        },
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
    };

    const modalStyles = customStyles || defaultStyles;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title}
            style={modalStyles}
        >
            <div className="modal-header">
                <h2>{title}</h2>
            </div>
            <div className="modal-content">{children}</div>
            <div className="modal-footer" style={{ marginTop: "20px", textAlign: "right" }}>
                <button onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
};

export default ReusableModal;
