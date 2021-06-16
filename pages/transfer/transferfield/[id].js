import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row } from "reactstrap";
import { Alert, Button } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../styles/TransferField.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { images } from "../../../next.config";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  let id = context.query.id;
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
  const resBalance = await axiosApiIntances
    .get(`/balance/${data.user}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 403) {
        Cookie.remove("token");
        Cookie.remove("user");
        return {};
      }
    });
  return {
    props: {
      data: result,
      userLogin: data,
      idReceiver: id,
      balance: resBalance,
    },
  };
}

export default function Profile(props) {
  console.log(props);
  const router = useRouter();
  const [user, setUser] = useState(props.data);
  const [receiver, setReceiver] = useState(props.idReceiver);
  const [balance, setBalance] = useState(props.balance);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    transactionReceiverId: props.idReceiver,
    transactionNote: "",
    transactionAmount: "",
    transactionType: "transfer",
    userPin: "",
  });
  // console.log(props);

  useEffect(() => {
    console.log("Get Data !");
    getUser();
  }, []);

  console.log(props.idReceiver);
  const getUser = () => {
    axiosApiIntances
      .get(`user/${props.idReceiver}`, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setReceiver(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
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
  console.log(DateNow);

  const handleTransferField = (balance) => {
    if (form.transactionAmount > balance) {
      setShow(true);
      setMsg("Your balance not enough to transfer!");
      console.log("saldo tidak cukup");
    } else if (form.transactionAmount === "") {
      setShow(true);
      setMsg("Please input balance !");
    } else {
      const amount = parseInt(form.transactionAmount);
      let saldo = formatter.format(balance - amount);
      console.log(saldo);
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

  let formatter = new Intl.NumberFormat("in-ID", {
    style: "currency",
    currency: "IDR",
  });
  const IDR = formatter.format(balance.balance);
  console.log(IDR);

  const handleClose = () => {
    setShow(false);
    setForm({
      ...form,
      transactionAmount: "",
    });
  };

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
                              step="1"
                              pattern="\d+"
                              placeholder="00.00"
                              className={`${styles.placeholder} form-control`}
                              id="exampleInputPassword1"
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
                              // id="exampleInputPassword1"
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
