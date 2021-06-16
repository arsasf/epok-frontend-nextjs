import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/Status.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import { useRouter } from "next/router";
import axiosApiIntances from "../../../utils/axios";
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
  console.log(props);
  const [user, setUser] = useState(props.data);
  const [receiver, setReceiver] = useState(props.receiver);

  useEffect(() => {
    console.log("Get Data !");
    getUser();
  }, []);
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
    <Layout title="Status Transfer">
      <Navbar data={user} />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu transfer={true} />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow`}>
                <div className={styles.profile}>
                  {props.transfer.error === "false" ? (
                    <div className={styles.statusSuccess}>
                      <div className={styles.boxImage}>
                        <Image
                          src="/img/success.png"
                          width="40px"
                          height="40px"
                          className={styles.imgProfile}
                        />
                      </div>
                      <h4 className={styles.textStatus}>Transfer Success</h4>
                    </div>
                  ) : (
                    <div className={styles.statusSuccess}>
                      <div className={styles.boxImage}>
                        <Image
                          src="/img/failed.png"
                          width="40px"
                          height="40px"
                          className={styles.imgProfile}
                        />
                      </div>
                      <h4 className={styles.textStatus}>Transfer Failed</h4>
                      <h4 className={styles.textStatus1}>
                        We can’t transfer your money at the moment, we recommend
                        you to check your internet connection and try again.
                      </h4>
                    </div>
                  )}

                  <div className={styles.listReceiver}>
                    <div className={styles.boxButton}>
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
                  <div className={styles.boxTitleSetting2}>
                    <h4 className={styles.titleSetting}>Transfer To</h4>
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
                  <div className={styles.boxTransferField}>
                    {props.transfer.error === "false" ? (
                      <div className={styles.boxButtonContinue}>
                        <button
                          type="submit"
                          className={`${styles.buttonDownload3} btn`}
                        >
                          <div className={styles.boxImage}>
                            <Image
                              src="/img/share.png"
                              width="24px"
                              height="24px"
                              className={styles.imgProfile}
                            />
                          </div>
                        </button>
                        <button
                          type="submit"
                          className={`${styles.buttonDownload} btn`}
                        >
                          <div className={styles.boxImage}>
                            <Image
                              src="/img/download.png"
                              width="24px"
                              height="24px"
                              className={styles.imgProfile}
                            />
                          </div>
                          Download PDF
                        </button>
                        <button
                          type="submit"
                          className={`${styles.buttonForm} btn`}
                        >
                          Back to Home
                        </button>
                      </div>
                    ) : (
                      <div className={styles.boxButtonContinue}>
                        <button
                          type="submit"
                          className={`${styles.buttonForm} btn`}
                        >
                          Try Again
                        </button>
                      </div>
                    )}
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
