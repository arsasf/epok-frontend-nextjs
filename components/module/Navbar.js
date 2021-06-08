import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Image from "next/image";
import styles from "../../styles/Navbar.module.css";
import { Container, Col, Row } from "reactstrap";

export default function Navbar() {
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
              <h1 className={styles.epok}>Epok</h1>
            </Col>
            <div className={styles.colRight}>
              <div className={styles.boxProfile}>
                <div className={styles.imageUser}>
                  <Image
                    src="/img/img-not-found.png"
                    width="52px"
                    height="52px"
                    className={styles.imgnotfound}
                  />
                </div>
                <div className={styles.rowUser}>
                  <h1 className={styles.nameUser}>Name Profile User</h1>
                  <h1 className={styles.phoneUser}>(+62)85240403232</h1>
                </div>
                <div className={styles.imgBell}>
                  <Image src="/img/bell.png" width="25px" height="25px" />
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </Container>
    </>
  );
}
