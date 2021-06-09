import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
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
  return {
    props: { data: result, userLogin: data, idReceiver: id, balance: id },
  };
}

export default function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useState(props.data);
  const [receiver, setReceiver] = useState(props.idReceiver);
  const [balance, setBalance] = useState(props.balance);
  const [form, setForm] = useState({
    transactionReceiverId: props.balance,
    transactionNote: "",
    transactionAmount: "",
    transactionType: "transfer",
    userPin: "",
  });
  // console.log(props);

  useEffect(() => {
    console.log("Get Data !");
    getUser();
    getBalance();
  }, []);

  console.log(props.idReceiver);
  const getUser = () => {
    axiosApiIntances
      .get(`user/${props.idReceiver}`)
      .then((res) => {
        // console.log(res.data);
        setReceiver(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBalance = () => {
    axiosApiIntances
      .get(`balance/${props.idReceiver}`)
      .then((res) => {
        // console.log(res.data.data[0]);
        setBalance(res.data.data[0]);
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

  const handleTransferField = (balance) => {
    // console.log("handle running");
    // console.log(form);
    const amount = parseInt(form.transactionAmount);
    let saldo = balance - amount;
    // console.log(saldo);
    Cookie.set("receiverId", form.transactionReceiverId, {
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
    router.push("/transfer/confirmation");
  };

  return (
    <Layout title="Transfer Field">
      <Navbar data={user} />
      {/* {console.log(balance)} */}
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div className={styles.boxTitleSetting}>
                    <h4 className={styles.titleSetting}>Transfer Money</h4>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} shadow sm`}>
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
                          {receiver.user_name}
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
                        <div className={styles.boxInput1}>
                          <div className="input-group">
                            <input
                              type="text"
                              placeholder="00.00"
                              className={`${styles.placeholder} form-control`}
                              id="exampleInputPassword1"
                              name="transactionAmount"
                              value={form.transactionAmount}
                              onChange={(event) => changeText(event)}
                              required
                            />
                          </div>
                        </div>
                        <h4 className={styles.textMoney}>
                          Rp{balance.balance} Available
                        </h4>
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
