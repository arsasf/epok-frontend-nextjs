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
import { authPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import cookies from "next-cookies";
import { images } from "../../../next.config";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const allCookies = cookies(context);
  console.log(allCookies);
  const result = await axiosApiIntances
    .get(`/user/${data.user}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      data: result,
      userLogin: data,
      transfer: allCookies,
      receiver: allCookies.receiverId,
    },
  };
}

export default function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useState(props.data);
  const [modal, setModal] = useState(false);
  const [receiver, setReceiver] = useState(props.receiver);
  const [msg, setMsg] = useState(false);
  const toggle = (event) => {
    event.preventDefault();
    setModal(!modal);
  };

  console.log(props);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  useEffect(() => {
    console.log("Get Data !");
    getUser();
  }, []);

  console.log(props.idReceiver);
  const getUser = () => {
    axiosApiIntances
      .get(`user/${props.transfer.receiverId}`)
      .then((res) => {
        // console.log(res.data);
        setReceiver(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title="Confirmation">
      <Navbar data={user} />
      {console.log(today)}
      {console.log(receiver)}
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
                        <h4 className={styles.textBox2Right3}>
                          {receiver.user_name}
                        </h4>
                        <h4 className={styles.textBox2Right4}>
                          {receiver.user_phone_number}
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
                        <h4 className={styles.textBox2Right4}>
                          Rp{props.transfer.amount}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Balance Left</h4>
                        <h4 className={styles.textBox2Right4}>
                          Rp{props.transfer.balance}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Date & Time</h4>
                        <h4 className={styles.textBox2Right4}>{today}</h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Notes</h4>
                        <h4 className={styles.textBox2Right4}>
                          {props.transfer.note}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.boxTransferField}>
                    <div className={styles.boxButtonContinue}>
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn`}
                        onClick={toggle}
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
