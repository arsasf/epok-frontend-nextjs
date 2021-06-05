import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Pin.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axiosApiIntances from "../../../utils/axios";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  console.log(data);
  return { props: { data: data } };
}

export default function Pin(props) {
  console.log(props);
  const router = useRouter();
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
  const [form, setForm] = useState({});

  const toggle = () => {
    if (info === "ERROR UPDATE PIN") {
      router.push("/signin");
      setModal(!modal);
    } else {
      router.push("/");
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
    const id = props.data.user;
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
    <Layout title="Pin">
      <div className={`${styles.containerFluid} container-fluid`}>
        <div className="row">
          <div className={`col-lg-7 ${styles.colLeft}`}>
            <h1 className={styles.epok}>E-Pok</h1>
            <div className={styles.imgLine}>
              <Image
                src="/img/linier_gradient.png"
                width="1000px"
                height="900px"
                className={styles.linierGradient}
              />
            </div>
            <div className={styles.boxImage}>
              <div className={styles.boxImagePhone}>
                <Image
                  src="/img/phone1.png"
                  width="auto"
                  height="530px"
                  className={styles.phone1}
                />
              </div>
              <div className={styles.boxImagePhone1}>
                <Image src="/img/phone2.png" width="auto" height="530px" />
              </div>
            </div>
            <h1 className={styles.textLeft1}>
              App that Covering Banking Needs.
            </h1>
            <h1 className={styles.textLeft2}>
              E-Pok is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </h1>
          </div>
          <div className={`${styles.colRight} col-lg-4`}>
            <h1 className={styles.textRight1}>
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </h1>
            <h1 className={styles.textRight2}>
              Create 6 digits pin to secure all your money and your data in
              Zwallet app. Keep it secret and don’t tell anyone about your
              Zwallet account password and the PIN.
            </h1>
            <form className={`card ${styles.form} `} onSubmit={handlePin}>
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
              <button type="submit" className={`${styles.buttonForm} btn `}>
                Confirm
              </button>
            </form>
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
          </div>
          <div className={`${styles.colSpace} col-lg-1`}>ini left col 1</div>
        </div>
      </div>
    </Layout>
  );
}
