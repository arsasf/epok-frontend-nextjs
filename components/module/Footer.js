import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "../../styles/Footer.module.css";
import { Container, Col, Row } from "reactstrap";

export default function Footer() {
  const router = useRouter();

  const handleLogout = (event) => {
    event.preventDefault();
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/signin");
  };

  return (
    <>
      <Container fluid className={`${styles.fullArea} shadow md`}>
        <Container className={styles.container}>
          <Row className={styles.rowContainer}>
            <Col className={styles.colLeft}>
              <h1 className={styles.epok}>2021 E-Pok. All right reserved.</h1>
            </Col>
            <div className={styles.colRight}>
              <div className={styles.rowUser}>
                <h1 className={styles.phoneUser}>+62 5637 8882 9901</h1>
                <h1 className={styles.contact}>contact@epok.com</h1>
              </div>
            </div>
          </Row>
        </Container>
      </Container>
    </>
  );
}
