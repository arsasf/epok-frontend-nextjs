import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Layout from "../../../components/Layout";
import styles from "../../../styles/SignUp.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function SignUp() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState("");
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const toggle = () => {
    if (info === "ERROR REGISTER") {
      router.push("/signup");
      setModal(!modal);
    } else {
      router.push("/signin");
      setModal(!modal);
    }
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosApiIntances
      .post("auth/register", form)
      .then((res) => {
        console.log(res);
        setModal(!modal);
        setMsg(res.data.msg);
        setInfo("REGISTER");
        return res.data;
      })
      .catch((err) => {
        setModal(!modal);
        setMsg(err.response.data.msg);
        setInfo("ERROR REGISTER");
        console.log(err.response.data.msg);
        return [];
      });
  };

  return (
    <Layout title="SignUp">
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
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </h1>
            <h1 className={styles.textRight2}>
              Transfering money is eassier than ever, you can access Zwallet
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </h1>
            <form className={`card ${styles.form} `} onSubmit={handleSubmit}>
              <div className="mb-5">
                <div className="input-group">
                  <div className={styles.iconForm}>
                    <Image src="/img/person.png" width="24px" height="24px" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className={`${styles.placeholder} form-control`}
                    id="exampleInputNamel1"
                    aria-describedby="emailHelp"
                    name="userName"
                    value={form.userName}
                    onChange={(event) => changeText(event)}
                    required
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="input-group">
                  <div className={styles.iconForm}>
                    <Image src="/img/mail.png" width="24px" height="24px" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your e-mail"
                    className={`${styles.placeholder} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="userEmail"
                    value={form.userEmail}
                    onChange={(event) => changeText(event)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <div className={styles.iconForm}>
                    <Image src="/img/lock.png" width="24px" height="24px" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className={`${styles.placeholder} form-control`}
                    id="exampleInputPassword1"
                    name="userPassword"
                    value={form.userPassword}
                    onChange={(event) => changeText(event)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={`${styles.buttonForm} btn `}>
                Sign Up
              </button>
              <div className={styles.boxSignUp}>
                <h1 className={styles.textRight3}>
                  Already have an account? Let’s
                </h1>
                <Link href="/signin">
                  <h1 className={styles.textRight4}>Login</h1>
                </Link>
              </div>
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
