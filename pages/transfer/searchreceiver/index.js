import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/SearchReceiver.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CardUser from "../../../components/module/card";

export async function getServerSideProps(context) {
  const data = await authPage(context);

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
    });

  return {
    props: { data: result, userLogin: data },
  };
}

export default function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useState(props.data);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const changeText = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    // const id = user.user_id;
    event.preventDefault();
    console.log("runnging");
    console.log(search);
    axiosApiIntances
      .get(`/user?page=&limit=&sort=&search=${search}`)
      .then((res) => {
        router.push(`/transfer/searchreceiver?search=${search}`);
        console.log(res.data);
        setSearch("");
        setUsers(res.data.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  return (
    <Layout title="Search Receiver">
      <Navbar data={user} />
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
                    <form
                      className={`card ${styles.form} `}
                      onSubmit={handleSearch}
                    >
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
                            name="search"
                            value={search}
                            onChange={(event) => changeText(event)}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className={styles.listReceiver}>
                    {users.map((item, index) => {
                      return (
                        <div key={index}>
                          <CardUser data={item} />
                        </div>
                      );
                    })}
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
