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
import Cookie from "js-cookie";
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
  const [inputPin, setInputPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const toggle = (event) => {
    event.preventDefault();
    setModal(!modal);
  };

  console.log(props);

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

  const changeText = (event) => {
    setInputPin({
      ...inputPin,
      [event.target.name]: event.target.value,
    });
  };

  const handlePin = (event) => {
    event.preventDefault();
    const id = props.data.user_id;
    console.log(id);
    let pin = [
      inputPin.pin1,
      inputPin.pin2,
      inputPin.pin3,
      inputPin.pin4,
      inputPin.pin5,
      inputPin.pin6,
    ];
    const pinCombine = parseInt(pin.join(""));
    const setData = {
      transactionReceiverId: props.transfer.receiverId,
      transactionNote: props.transfer.note,
      transactionAmount: parseInt(props.transfer.amount),
      transactionType: "transfer",
      userPin: pinCombine,
    };
    console.log(setData);
    setModal(false);
    setInputPin({
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    });
    axiosApiIntances
      .post(`transaction/transfer/${id}`, setData)
      .then((res) => {
        Cookie.set("error", false, {
          expires: 1,
          secure: true,
        });
        console.log(res.data);
        router.push("/transfer/status");
      })
      .catch((err) => {
        Cookie.set("error", true, {
          expires: 1,
          secure: true,
        });
        console.log(err);
        router.push("/transfer/status");
      });
  };

  return (
    <Layout title="Confirmation">
      <Navbar data={user} />
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
                      onSubmit={handlePin}
                    >
                      <div className={styles.colPin}>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            name="pin1"
                            value={inputPin.pin1}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            name="pin2"
                            value={inputPin.pin2}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            name="pin3"
                            value={inputPin.pin3}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            name="pin4"
                            value={inputPin.pin4}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            name="pin5"
                            value={inputPin.pin5}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            name="pin6"
                            value={inputPin.pin6}
                            onChange={(event) => changeText(event)}
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
              <Menu transfer={true} />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div className={styles.boxTitleSetting}>
                    <h4 className={styles.titleSetting}>Transfer To</h4>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} `}>
                      <div className={styles.boxImage}>
                        {receiver.user_image === "" ? (
                          <Image
                            src="/img/img-not-found.png"
                            width="56px"
                            height="56px"
                            className={styles.imgProfile}
                          />
                        ) : (
                          <img
                            src={`${images.domains}${receiver.user_image}`}
                            width="56px"
                            height="56px"
                            className={styles.imgProfile}
                          />
                        )}
                      </div>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>
                          {receiver.user_first_name} {receiver.user_last_name}
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
                    <div className={`${styles.boxButton} `}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Amount</h4>
                        <h4 className={styles.textBox2Right4}>
                          {props.transfer.amountIDR}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} `}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Balance Left</h4>
                        <h4 className={styles.textBox2Right4}>
                          {props.transfer.balance}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} `}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Date & Time</h4>
                        <h4 className={styles.textBox2Right4}>
                          {props.transfer.date}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} `}>
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
