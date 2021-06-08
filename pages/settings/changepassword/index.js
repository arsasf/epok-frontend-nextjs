import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/ChangePassword.module.css";

export default function Profile() {
  return (
    <Layout title="Change Password">
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
                  <div>
                    <h4 className={styles.titleSetting}>Change Password</h4>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.textSetting}>
                      You must enter your current password and then type your
                      new password twice.
                    </h3>
                  </div>
                  <div className={styles.boxForm}>
                    <form className={`card ${styles.form} `}>
                      <div className="mb-5">
                        <div className="input-group">
                          <div className={styles.iconForm}>
                            <Image
                              src="/img/lock.png"
                              width="24px"
                              height="24px"
                            />
                          </div>
                          <input
                            type="password"
                            placeholder="Current password"
                            className={`${styles.placeholder} form-control`}
                            id="exampleInputPassword1"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="input-group">
                          <div className={styles.iconForm}>
                            <Image
                              src="/img/lock.png"
                              width="24px"
                              height="24px"
                            />
                          </div>
                          <input
                            type="password"
                            placeholder="New password"
                            className={`${styles.placeholder} form-control`}
                            id="exampleInputPassword1"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="input-group">
                          <div className={styles.iconForm}>
                            <Image
                              src="/img/lock.png"
                              width="24px"
                              height="24px"
                            />
                          </div>
                          <input
                            type="password"
                            placeholder="Repeat new password"
                            className={`${styles.placeholder} form-control`}
                            id="exampleInputPassword1"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn`}
                      >
                        Change Password
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
