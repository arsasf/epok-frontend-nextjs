import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/PersonalInfo.module.css";

export default function Profile() {
  return (
    <Layout title="PersonalInfo">
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
                    <h4 className={styles.titleSetting}>
                      Personal Information
                    </h4>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.textSetting}>
                      We got your personal information from the sign up
                      proccess. If you want to make changes on your information,
                      contact our support.
                    </h3>
                  </div>
                  <div className={`${styles.boxButton} shadow sm`}>
                    <h4 className={styles.textButton}>First Name</h4>
                    <h4 className={styles.textButton2}>Robert</h4>
                  </div>
                  <div className={`${styles.boxButton} shadow sm`}>
                    <h4 className={styles.textButton}>Last Name</h4>
                    <h4 className={styles.textButton2}>Chandler</h4>
                  </div>
                  <div className={`${styles.boxButton} shadow sm`}>
                    <h4 className={styles.textButton}>Verified E-mail</h4>
                    <h4 className={styles.textButton2}>pewdiepie1@gmail.com</h4>
                  </div>
                  <div className={`${styles.boxButtonPhone} shadow sm`}>
                    <div className={styles.boxtextPhone}>
                      <h4 className={styles.textButton}>Phone Number</h4>
                      <h4 className={styles.textButton2}>+62 813-9387-7946</h4>
                    </div>
                    <h4 className={styles.textButton3}>Manage</h4>
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
