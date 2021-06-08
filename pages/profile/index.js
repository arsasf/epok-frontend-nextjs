import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import Menu from "../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";

export default function Profile() {
  return (
    <Layout title="Profile">
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
                    <div className={styles.imgMenu}>
                      <Image
                        src="/img/img-not-found.png"
                        width="80px"
                        height="80px"
                        className={styles.imgProfile}
                      />
                    </div>
                    <div className={styles.boxEdit}>
                      <div className={styles.divEdit}>
                        <Image
                          src="/img/edit.png"
                          width="15px"
                          height="15px"
                          className={styles.imgEdit}
                        />
                      </div>
                      <h5 className={styles.textEdit}>Edit</h5>
                    </div>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.nameProfie}>Name Profile User</h3>
                    <h3 className={styles.phoneProfile}>+62 813-9387-7946</h3>
                  </div>
                  <Button className={styles.boxButton}>
                    <h4 className={styles.textButton}>Personal Information</h4>
                    <div className={styles.divEdit}>
                      <Image
                        src="/img/arrow-left.png"
                        width="25px"
                        height="25px"
                        className={styles.imgEdit}
                      />
                    </div>
                  </Button>
                  <Button className={styles.boxButton}>
                    <h4 className={styles.textButton}>Change Password</h4>
                    <div className={styles.divEdit}>
                      <Image
                        src="/img/arrow-left.png"
                        width="25px"
                        height="25px"
                        className={styles.imgEdit}
                      />
                    </div>
                  </Button>
                  <Button className={styles.boxButton}>
                    <h4 className={styles.textButton}>Change PIN</h4>
                    <div className={styles.divEdit}>
                      <Image
                        src="/img/arrow-left.png"
                        width="25px"
                        height="25px"
                        className={styles.imgEdit}
                      />
                    </div>
                  </Button>
                  <Button className={styles.boxButton}>
                    <h4 className={styles.textButton}>Logout</h4>
                  </Button>
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
