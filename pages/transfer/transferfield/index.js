import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/TransferField.module.css";

export default function Profile() {
  return (
    <Layout title="Transfer Field">
      <Navbar />
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
                              required
                            />
                          </div>
                        </div>
                        <h4 className={styles.textMoney}>
                          Rp120.000 Available
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
                              id="exampleInputPassword1"
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
