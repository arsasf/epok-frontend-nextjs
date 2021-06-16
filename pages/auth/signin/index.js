import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Layout from "components/Layout";
import styles from "styles/SignIn.module.css";
import { unauthPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";
import Image from "next/image";
import Link from "next/link";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function SignIn() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState("");
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

  const toggle = (event) => {
    event.preventDefault();
    if (info === "ERROR LOGIN") {
      router.push("/signin");
      setModal(!modal);
    } else if (info === "LOGIN") {
      router.push("/");
      setModal(!modal);
    } else if (info === "INPUT PIN") {
      router.push("/pin");
      setModal(!modal);
    }
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axiosApiIntances
      .post("auth/login", form)
      .then((res) => {
        console.log(res.data.msg);
        setModal(!modal);
        setMsg(res.data.msg);
        if (res.data.msg === "Success login !") {
          console.log("login");
          setInfo("LOGIN");
          Cookie.set("token", res.data.data.token, {
            expires: 1,
            secure: true,
          });
          Cookie.set("user", res.data.data.user_id, {
            expires: 1,
            secure: true,
          });
          return res.data;
        } else {
          console.log("pin");
          setInfo("INPUT PIN");

          Cookie.set("token", res.data.data.token, {
            expires: 1,
            secure: true,
          });
          Cookie.set("user", res.data.data.user_id, {
            expires: 1,
            secure: true,
          });
          return res.data;
        }
      })
      .catch((err) => {
        setModal(!modal);
        setMsg(err.response.data.msg);
        setInfo("ERROR LOGIN");
        console.log(err);
        return [];
      });
  };

  return (
    <Layout title="SignIn">
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
            <form className={`card ${styles.form} `} onSubmit={handleLogin}>
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
                <Link href="#">
                  <div
                    id="emailHelp"
                    className={`${styles.textForgot} form-text`}
                  >
                    Forgot Password ?
                  </div>
                </Link>
              </div>
              <button type="submit" className={`${styles.buttonForm} btn`}>
                Login
              </button>
              <div className={styles.boxSignUp}>
                <h1 className={styles.textRight3}>
                  Don’t have an account? Let’s
                </h1>
                <Link href="/signup">
                  <h1 className={styles.textRight4}>Sign Up</h1>
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
