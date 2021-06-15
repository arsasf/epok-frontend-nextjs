import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axiosApiIntances from "../utils/axios";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import Footer from "../components/module/Footer";
import Menu from "../components/module/Menu";
import styles from "../styles/Home.module.css";
import { authPage } from "../middleware/authorizationPage";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  let data = await authPage(context);
  console.log(data);

  const result = await axiosApiIntances
    .get(`/user/${data.user}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 403) {
        Cookie.remove("token");
        Cookie.remove("user");
        // useRouter().push("/signin");
        return {};
      }
    });

  const resBalance = await axiosApiIntances
    .get(`/balance/${data.user}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 403) {
        Cookie.remove("token");
        Cookie.remove("user");
        return {};
      }
    });
  return {
    props: { data: result, userLogin: data, balance: resBalance },
  };
}

export default function Home(props) {
  console.log(props);
  const [user, setUser] = useState(props.data);
  const router = useRouter();

  return (
    <Layout title="Home">
      <Navbar data={user} />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={styles.boxRight}>
                <div className={styles.box1}>
                  <div className={styles.textBox1Left}>
                    <h4 className={styles.balance}>Balance</h4>
                    <h4 className={styles.saldo}>Rp{props.balance.balance}</h4>
                    <h4 className={styles.phone}>{user.user_phone_number}</h4>
                  </div>
                  <div className={styles.box1Button}>
                    <Button className={styles.boxButton}>
                      <div>
                        <Image
                          src="/img/arrow-up.png"
                          width="25px"
                          height="25px"
                        />
                      </div>
                      <h4 className={styles.textBox1Right}>Transfer</h4>
                    </Button>
                    <Button className={styles.boxButton}>
                      <div>
                        <Image src="/img/plus.png" width="25px" height="25px" />
                      </div>
                      <h4 className={styles.textBox1Right}>Top Up</h4>
                    </Button>
                  </div>
                </div>
                <div className={styles.box2}>
                  <div className={`${styles.box2Left} shadow sm`}>box left</div>
                  <div className={`${styles.box2Right} shadow sm`}>
                    <div className={styles.boxTransaction}>
                      <h4 className={styles.textBox2Right1}>
                        Transaction History
                      </h4>
                      <h4 className={styles.textBox2Right2}>See all</h4>
                    </div>
                    <div className={styles.boxTransaction2}>
                      <div className={styles.boxProfile}>
                        <div>
                          <Image
                            src="/img/img-not-found.png"
                            width="56px"
                            height="56px"
                            className={styles.imgProfile}
                          />
                        </div>
                        <div className={styles.textProfile}>
                          <h4 className={styles.textBox2Right3}>Samuel Suhi</h4>
                          <h4 className={styles.textBox2Right4}>Transfer</h4>
                        </div>
                      </div>
                      <h4 className={styles.textBox2Right5}>+Rp50.000</h4>
                    </div>
                    <div className={styles.boxTransaction2}>
                      <div className={styles.boxProfile}>
                        <div>
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
                            Subscription
                          </h4>
                        </div>
                      </div>
                      <h4 className={styles.textBox2Right6}>-Rp50.000</h4>
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
