import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { PostServices, Post, Comments } from "../../Services/PostServices";
import Form from "react-bootstrap/Form";
import { User } from "../../Services/UserService";
import Button from "react-bootstrap/Button";
import { ToastContainer, Toast, Spinner } from "react-bootstrap";
import { Auth } from "../../Core/Services/AuthService";


type ReportPopupProps = {
    Id: string | number;   //postId or AccoutId
    type: string;  // post or account
    view: boolean;
    unlock?: boolean;
    handleShowPopup: any;
}

function ReportPopup(Props: ReportPopupProps) {
    const { Id, type, view, unlock, handleShowPopup } = Props;
    const [show, setShow] = useState(view);
    const handleClosePopup = () => {
        setShow(false);
        handleShowPopup(false);
    };
    const postServices = new PostServices();
    const [showMessage, setShowMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState<string | null>(null);
    const userData: User = Auth.getUser();

    useEffect(() => {
        setShow(view);
    }, [view])


    const getInitialValues = () => {
        return {
            description: "",
        };
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        const payload: any = {
            userId: userData.id,
            description: values.description,
        };
    
        if (type === "Post") {
            payload.postId = Id;
            if (unlock === true) {
                payload.type = type;
                await postServices
                    .unblockReq(payload)
                    .then((res) => {
                        setShowMessage(res.message);
                        handleClosePopup();
                    })
                    .catch((e) => {
                        setShowError(e.message);
                        handleClosePopup();
                    });
            }
            else {
                await postServices
                    .reportPost(payload)
                    .then((res) => {
                        setShowMessage(res.message);
                        handleClosePopup();
                    })
                    .catch((e) => {
                        setShowError(e.message);
                        handleClosePopup();
                    });
            }
        }
        else if (type === "Account") {
            payload.accountId = Id;
            if (unlock === true) {
                payload.type = type;
                await postServices
                    .unblockReq(payload)
                    .then((res) => {
                        setShowMessage(res.message);
                        handleClosePopup();
                    })
                    .catch((e) => {
                        setShowError(e.message);
                        handleClosePopup();
                    });
            }
            else {
                await postServices
                    .reportAccount(payload)
                    .then((res) => {
                        setShowMessage(res.message);
                        handleClosePopup();
                    })
                    .catch((e) => {
                        setShowError(e.message);
                        handleClosePopup();
                    });
            }
        }


    };

    const formlik = {
        validationSchema: yup.object().shape({
            description: yup.string().required("Please enter Event Name"),
        }),
        initialValues: getInitialValues(),
        onSubmit: onSubmit,
    };

    return (
        <div>
            <ToastContainer className="p-3" position="top-center">
                <Toast
                    onClose={() => setShowMessage(null)}
                    bg="success"
                    show={!!showMessage}
                    delay={3000}
                    autohide
                >
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Successful</strong>
                    </Toast.Header>
                    <Toast.Body>{showMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position="top-center">
                <Toast
                    onClose={() => setShowError(null)}
                    bg="danger"
                    show={!!showError}
                    delay={3000}
                    autohide
                >
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{showError}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal show={show} onHide={handleClosePopup}>
                <Modal.Header closeButton>
                    {unlock ? <Modal.Title>{type} Unblock Request</Modal.Title> : <Modal.Title>{type} Report</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Formik {...formlik}>
                        {({
                            handleSubmit,
                            handleChange,
                            touched,
                            values,
                            isSubmitting,
                            errors,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        autoFocus
                                        value={userData.Email}
                                        disabled={true}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Report Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        type="description"
                                        placeholder="Your description"
                                        onChange={handleChange}
                                        value={values.description}
                                        isValid={touched.description && !errors.description}
                                        autoComplete="off"
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    className="mr-1 save-btn"
                                    variant="success"
                                    type="submit"
                                >
                                    {" "}
                                    Submit
                                    {isSubmitting ? (
                                        <Spinner className="spinner" animation="border" size="sm" />
                                    ) : null}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ReportPopup
