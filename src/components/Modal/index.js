import React from 'react'
import { Modal, ModalHeader, ModalTitle } from 'react-bootstrap'
const Model = (props) => {

    const { active, toggleModal,children,size="lg" } = props
    return (
        <Modal
            size={size}
            show={active}
            onHide={toggleModal}
        > <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
}

export default Model