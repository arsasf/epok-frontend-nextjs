import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/Confirmation.module.css";

export default function Profile() {
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(false);
  const toggle = (event) => {
    event.preventDefault();
    setModal(!modal);
  };
  return (
    <Layout title="Confirmation">
      <Navbar />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Row>
            <Modal isOpen={modal} className={styles.modal}>
              <ModalHeader className={styles.modalHeader}>
                Enter PIN to Transfer
              </ModalHeader>
              <ModalBody className={styles.modalBody}>
                <h4 className={styles.textPin}>
                  Enter your 6 digits PIN for confirmation to continue
                  transferring money.
                </h4>
                <div>
                  <div className={styles.boxForm}>
                    <form
                      className={`card ${styles.form} `}
                      // onSubmit={handlePin}
                    >
                      <div className={styles.colPin}>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin1"
                            // value={inputPin.pin1}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin2"
                            // value={inputPin.pin2}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin3"
                            // value={inputPin.pin3}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin4"
                            // value={inputPin.pin4}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin5"
                            // value={inputPin.pin5}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin6"
                            // value={inputPin.pin6}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                      </div>
                      <div className={styles.boxContinue}>
                        <button
                          type="submit"
                          className={`${styles.buttonForm} btn `}
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </ModalBody>
            </Modal>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div className={styles.boxTitleSetting}>
                    <h4 className={styles.titleSetting}>Transfer To</h4>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.boxImage}>
                        <Image
                          src="/img/img-not-found.png"
                          width="56px"
                          height="56px"
                          className={styles.imgProfile}
                        />
                      </div>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Samuel Suhi</h4>
                        <h4 className={styles.textBox2Right4}>
                          +62 813-8492-9994
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.boxTitleSetting2}>
                    <h4 className={styles.titleSetting}>Details</h4>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Amount</h4>
                        <h4 className={styles.textBox2Right4}>Rp100.000</h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Balance Left</h4>
                        <h4 className={styles.textBox2Right4}>Rp20.000</h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Date & Time</h4>
                        <h4 className={styles.textBox2Right4}>
                          May 11, 2020 - 12.20
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Notes</h4>
                        <h4 className={styles.textBox2Right4}>
                          For buying some socks
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.boxTransferField}>
                    <div className={styles.boxButtonContinue}>
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn`}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </Layout>
  );
}
