import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/ChangePin.module.css";

export default function Profile() {
  return (
    <Layout title="Change PIN">
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
                    <h4 className={styles.titleSetting}>Change PIN</h4>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.textSetting}>
                      Enter your current 6 digits Zwallet PIN below to continue
                      to the next steps.
                    </h3>
                  </div>
                  <div className={styles.boxForm}>
                    <form
                      className={`card ${styles.form} `}
                      // onSubmit={handlePin}
                    >
                      <div className={styles.colPin}>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin1"
                            // value={inputPin.pin1}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin2"
                            // value={inputPin.pin2}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin3"
                            // value={inputPin.pin3}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin4"
                            // value={inputPin.pin4}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin5"
                            // value={inputPin.pin5}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className={`${styles.placeholder} form-control`}
                            pattern="[0-9]{1}"
                            maxLength="1"
                            // name="pin6"
                            // value={inputPin.pin6}
                            // onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn `}
                      >
                        Continue
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
