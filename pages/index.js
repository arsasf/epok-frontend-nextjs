// import { useEffect, useState } from "react";
// import axiosApiIntances from "../utils/axios";
// import Layout from "../components/Layout";
// import Navbar from "../components/module/Navbar";
// import styles from "../styles/Home.module.css";

// export default function Home() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     console.log("Get Data");
//     getUsers();
//   }, []);

//   const getUsers = () => {
//     axiosApiIntances
//       .get("users")
//       .then((res) => {
//         setUsers(res.data);
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <Layout title="Home">
//       <Navbar />
//       <h1 className={styles.titleHead}>Home Page !</h1>
//       <h2>{process.env.APP_NAME}</h2>
//       {users.map((item, index) => (
//         <div className="d-grid gap-2" key={index}>
//           <button className="btn btn-primary" type="button">
//             {item.name}
//           </button>
//         </div>
//       ))}
//     </Layout>
//   );
// }

// ==========================================

import { useState } from "react";
import axiosApiIntances from "../utils/axios";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import Footer from "../components/module/Footer";
import Menu from "../components/module/Menu";
import styles from "../styles/Home.module.css";
import { authPage } from "../middleware/authorizationPage";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  console.log(data);
  const res = await axiosApiIntances
    .get("users")
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return [];
    });
  return {
    props: { users: res, userLogin: data }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log(props);
  const [users, setUsers] = useState(props.users);
  return (
    <Layout title="Home">
      <Navbar />
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
                    <h4 className={styles.saldo}>Rp120.000</h4>
                    <h4 className={styles.phone}>+62 813-9387-7946</h4>
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
