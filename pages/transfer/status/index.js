import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/Status.module.css";

export default function Profile() {
  const [error, setError] = useState(false);

  return (
    <Layout title="Status Transfer">
      <Navbar />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow`}>
                <div className={styles.profile}>
                  {error ? (
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
                        <h4 className={styles.textBox2Right4}>Rp100.000</h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} `}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Balance Left</h4>
                        <h4 className={styles.textBox2Right4}>Rp20.000</h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} `}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Date & Time</h4>
                        <h4 className={styles.textBox2Right4}>
                          May 11, 2020 - 12.20
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.listReceiver}>
                    <div className={`${styles.boxButton} `}>
                      <div className={styles.textProfile}>
                        <h4 className={styles.textBox2Right3}>Notes</h4>
                        <h4 className={styles.textBox2Right4}>
                          For buying some socks
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.boxTitleSetting2}>
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
                        <h4 className={styles.textBox2Right3}>Samuel Suhi</h4>
                        <h4 className={styles.textBox2Right4}>
                          +62 813-8492-9994
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={styles.boxTransferField}>
                    {error ? (
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
