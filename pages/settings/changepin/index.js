import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/ChangePin.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export async function getServerSideProps(context) {
  const data = await authPage(context);

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
    props: { data: result, userLogin: data },
  };
}

export default function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useState(props.data);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState("");
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
    if (info === "ERROR UPDATE PIN") {
      router.push("/settings/changepin");
      setModal(!modal);
    } else {
      router.push("/profile");
      setModal(!modal);
    }
  };

  const changeText = (event) => {
    setInputPin({
      ...inputPin,
      [event.target.name]: event.target.value,
    });
  };

  const handlePin = (event) => {
    event.preventDefault();
    const id = user.user_id;
    console.log(id);
    let setData = [
      inputPin.pin1,
      inputPin.pin2,
      inputPin.pin3,
      inputPin.pin4,
      inputPin.pin5,
      inputPin.pin6,
    ];
    setData = setData.join("");
    const newPin = parseInt(setData);
    console.log(newPin);
    const form = {
      userPin: newPin,
    };
    axiosApiIntances
      .patch(`user/update-pin/${id}`, form)
      .then((res) => {
        console.log(res);
        setModal(!modal);
        setMsg(res.data.msg);
        setInfo("UPDATE PIN");
        return res.data;
      })
      .catch((err) => {
        setModal(!modal);
        setMsg(err.response.data.msg);
        setInfo("ERROR UPDATE PIN");
        console.log(err.response.data.msg);
        return [];
      });
  };

  return (
    <Layout title="Change PIN">
      <Navbar data={user} />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Modal isOpen={modal} className={styles.modal}>
            <ModalHeader className={styles.modalHeader}>
              INFO : {info}
            </ModalHeader>
            <ModalBody className={styles.modalBody}>{msg}</ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className={styles.modalFooter}
                onClick={toggle}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div>
                    <h4 className={styles.titleSetting}>Change PIN</h4>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.textSetting}>
                      Enter your current 6 digits Zwallet PIN below to continue
                      to the next steps.
                    </h3>
                  </div>
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
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn `}
                      >
                        Continue
                      </button>
                    </form>
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
