import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/SearchReceiver.module.css";

export default function Profile() {
  return (
    <Layout title="Search Receiver">
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
                    <h4 className={styles.titleSetting}>Search Receiver</h4>
                  </div>
                  <div className={styles.boxName}>
                    <form className={`card ${styles.form} `}>
                      <div className={styles.boxForm}>
                        <div className="input-group">
                          <div className={styles.iconForm}>
                            <Image
                              src="/img/search.png"
                              width="24px"
                              height="24px"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Search receiver here"
                            className={`${styles.placeholder} form-control`}
                            id="exampleInputPassword1"
                            required
                          />
                        </div>
                      </div>
                    </form>
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
