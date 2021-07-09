// * ========================= Import ================================
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import Menu from "components/module/Menu";
import { Col, Container, Row } from "reactstrap";
import { Alert, Button } from "react-bootstrap";
import Image from "next/image";
import styles from "styles/TransferField.module.css";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Cookie from "js-cookie";
import { images } from "next.config";
// * ========================= End Import =============================

// ?? =========================== STATIC PATHS ========================
export async function getStaticPaths() {
  // * ================== API ALL DATA USER ===========================
  const users = await axiosApiIntances
    .get("user/all-user")
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      if (err) {
        return [];
      }
    });
  // * ============================ End ===============================

  // * ============================ Paths ============================
  const idLogin = users.filter((item) => item.user_login === "1");
  const paths = users.map((item) => ({
    params: {
      user: idLogin[0].user_id.toString(),
      id: `${item.user_id.toString()}`,
    },
  }));
  // * ============================ End ===============================

  return {
    paths,
    fallback: false,
  };
}
// ?? ============================ End ================================

// ?? =========================== STATIC DATA =========================
export async function getStaticProps(context) {
  // * ========================= API USER LOGIN =======================
  const userLogin = await axiosApiIntances
    .get(`user/${context.params.user}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      if (err) {
        return {};
      }
    });
  // * ============================ End ===============================

  // * ==================== API BALANCE USER LOGIN ====================
  const userBalance = await axiosApiIntances
    .get(`/balance/${context.params.user}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      if (err) {
        return {};
      }
    });
  // * ============================ End ===============================

  // *============================ API RECEIVER =======================
  const receiver = await axiosApiIntances
    .get(`user/${context.params.id}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      if (err) {
        return {};
      }
    });
  // * ============================ End ===============================

  return {
    props: { userLogin, userBalance, receiver },
  };
}
// ?? ============================ End ================================

export default function Profile(props) {
  const router = useRouter();
  const [user] = useState(props.userLogin);
  const [balance] = useState(props.userBalance);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    transactionReceiverId: props.receiver.user_id,
    transactionNote: "",
    transactionAmount: "",
    transactionType: "transfer",
    userPin: "",
  });

  // * =========================== Change Date ========================
  const date = Date.now();
  const formatDateIn = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const DateNow = formatDateIn(date);
  // * ============================ End ===============================

  // * =========================== Change Currency ====================
  let formatter = new Intl.NumberFormat("in-ID", {
    style: "currency",
    currency: "IDR",
  });
  const IDR = formatter.format(balance.balance);
  // * ============================ End ===============================

  // * =========================== Change Form ========================
  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setShow(false);
    setForm({
      ...form,
      transactionAmount: "",
    });
  };
  // * ============================ End ===============================

  // * =================== SET DATA BALANCE ===========================
  const handleTransferField = (balance) => {
    if (form.transactionAmount > balance) {
      setShow(true);
      setMsg("Your balance not enough to transfer!");
    } else if (form.transactionAmount === "") {
      setShow(true);
      setMsg("Please input balance !");
    } else {
      const amount = parseInt(form.transactionAmount);
      let saldo = formatter.format(balance - amount);
      Cookie.set("receiverId", form.transactionReceiverId, {
        expires: 1,
        secure: true,
      });
      Cookie.set("amountIDR", formatter.format(form.transactionAmount), {
        expires: 1,
        secure: true,
      });
      Cookie.set("amount", form.transactionAmount, {
        expires: 1,
        secure: true,
      });
      Cookie.set("note", form.transactionNote, {
        expires: 1,
        secure: true,
      });
      Cookie.set("balance", saldo, {
        expires: 1,
        secure: true,
      });
      Cookie.set("date", DateNow, {
        expires: 1,
        secure: true,
      });
      router.push("/transfer/confirmation");
    }
  };
  // * ============================ End ===============================

  return (
    <Layout title="Transfer Field">
      <Navbar data={user} />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu transfer={true} />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div className={styles.boxTitleSetting}>
                    <h4 className={styles.titleSetting}>Transfer Money</h4>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton}`}>
                      <div className={styles.boxImage}>
                        {props.receiver.user_image === "" ? (
                          <Image
                            src="/img/img-not-found.png"
                            width="56px"
                            height="56px"
                            className={styles.imgProfile}
                          />
                        ) : (
                          <img
                            src={`${images.domains}${props.receiver.user_image}`}
                            width="56px"
                            height="56px"
                            className={styles.imgProfile}
                          />
                        )}
                      </div>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>
                          {props.receiver.user_first_name}{" "}
                          {props.receiver.user_last_name}
                        </h4>
                        <h4 className={styles.textBox2Right4}>
                          {props.receiver.user_phone_number}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.boxTextSetting}>
                    <h4 className={styles.textSetting}>
                      Type the amount you want to transfer and then press
                      continue to the next steps.
                    </h4>
                  </div>
                  <div className={styles.boxTransferField}>
                    <div className={styles.boxForm}>
                      <form className={`card ${styles.form} `}>
                        {show ? (
                          <Alert className={styles.alert} variant="warning">
                            <Alert.Heading>Warning!</Alert.Heading>
                            <p>{msg}</p>
                            <Button
                              variant="warning"
                              onClick={() => handleClose()}
                            >
                              Close
                            </Button>
                          </Alert>
                        ) : (
                          ""
                        )}

                        <div className={styles.boxInput1}>
                          <div className="input-group">
                            <input
                              type="number"
                              step="1000"
                              pattern="\d+"
                              placeholder="00.00"
                              className={`${styles.placeholder} form-control`}
                              pattern="[0-9]"
                              name="transactionAmount"
                              value={form.transactionAmount}
                              onChange={(event) => changeText(event)}
                              required
                            />
                          </div>
                        </div>
                        <h4 className={styles.textMoney}>{IDR} Available</h4>
                        <div className={styles.boxNote}>
                          <div className="input-group">
                            <div className={styles.iconForm}>
                              <Image
                                src="/img/edit.png"
                                width="20px"
                                height="20px"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Add some notes"
                              className={`${styles.placeholder1} form-control`}
                              name="transactionNote"
                              value={form.transactionNote}
                              onChange={(event) => changeText(event)}
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className={styles.boxButtonContinue}>
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn`}
                        onClick={() => handleTransferField(balance.balance)}
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
