import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import Menu from "../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { authPage } from "../../middleware/authorizationPage";
import axiosApiIntances from "../../utils/axios";
import { images } from "../../next.config";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const result = await axiosApiIntances
    .get(`/user/${data.user}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { data: result, userLogin: data },
  };
}

export default function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useState(props.data);

  const handlePersonlInfo = (event) => {
    event.preventDefault();
    router.push("/settings/personalinfo");
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    router.push("/settings/changepassword");
  };

  const handleChangePin = (event) => {
    event.preventDefault();
    router.push("/settings/changepin");
  };

  return (
    <Layout title="Profile">
      <Navbar data={user} />
      {/* {console.log(user)} */}
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
                      {user.user_image === "" ? (
                        <Image
                          src="/img/img-not-found.png"
                          width="80px"
                          height="80px"
                          className={styles.imgProfile}
                        />
                      ) : (
                        <img
                          src={`${images.domains}${user.user_image}`}
                          width="80px"
                          height="80px"
                          className={styles.imgProfile}
                        />
                      )}
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
                    <h3 className={styles.nameProfie}>{user.user_name}</h3>
                    <h3 className={styles.phoneProfile}>
                      {user.user_phone_number}
                    </h3>
                  </div>
                  <Button
                    className={styles.boxButton}
                    onClick={handlePersonlInfo}
                  >
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
                  <Button
                    className={styles.boxButton}
                    onClick={handleChangePassword}
                  >
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
                  <Button
                    className={styles.boxButton}
                    onClick={handleChangePin}
                  >
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
