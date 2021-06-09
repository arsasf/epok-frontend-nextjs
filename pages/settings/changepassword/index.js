import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import Cookie from "js-cookie";
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/ChangePassword.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
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
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState("");
  const [form, setForm] = useState({
    userCurrentPassword: "",
    userNewPassword: "",
    userConfirmPassword: "",
  });

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const toggle = (event) => {
    event.preventDefault();
    if (info === "ERROR CHANGE PASSWORD") {
      router.push("/settings/changepassword");
      setModal(!modal);
    } else {
      Cookie.remove("token");
      Cookie.remove("user");
      router.push("/signin");
      setModal(!modal);
    }
  };

  const handleChangePassword = (event) => {
    const id = user.user_id;
    event.preventDefault();
    console.log("runnging");
    console.log(form);
    axiosApiIntances
      .patch(`/user/update/password/${id}`, form)
      .then((res) => {
        console.log(res.data);
        setModal(!modal);
        setMsg(res.data.msg);
        return res.data;
      })
      .catch((err) => {
        setModal(!modal);
        setMsg(err.response.data.msg);
        setInfo("ERROR CHANGE PASSWORD");
        console.log(err);
        return [];
      });
  };

  return (
    <Layout title="Change Password">
      <Navbar data={user} />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Modal isOpen={modal} className={styles.modal}>
            <ModalHeader className={styles.modalHeader}>
              INFO : {info}
            </ModalHeader>
            <ModalBody className={styles.modalBody}>{msg}</ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className={styles.modalFooter}
                onClick={toggle}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div>
                    <h4 className={styles.titleSetting}>Change Password</h4>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.textSetting}>
                      You must enter your current password and then type your
                      new password twice.
                    </h3>
                  </div>
                  <div
                    className={styles.boxForm}
                    onSubmit={handleChangePassword}
                  >
                    <form className={`card ${styles.form} `}>
                      <div className="mb-5">
                        <div className="input-group">
                          <div className={styles.iconForm}>
                            <Image
                              src="/img/lock.png"
                              width="24px"
                              height="24px"
                            />
                          </div>
                          <input
                            type="password"
                            placeholder="Current password"
                            className={`${styles.placeholder} form-control`}
                            id="exampleInputPassword1"
                            name="userCurrentPassword"
                            value={form.userCurrentPassword}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="input-group">
                          <div className={styles.iconForm}>
                            <Image
                              src="/img/lock.png"
                              width="24px"
                              height="24px"
                            />
                          </div>
                          <input
                            type="password"
                            placeholder="New password"
                            className={`${styles.placeholder} form-control`}
                            id="exampleInputPassword2"
                            name="userNewPassword"
                            value={form.userNewPassword}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="input-group">
                          <div className={styles.iconForm}>
                            <Image
                              src="/img/lock.png"
                              width="24px"
                              height="24px"
                            />
                          </div>
                          <input
                            type="password"
                            placeholder="Repeat new password"
                            className={`${styles.placeholder} form-control`}
                            id="exampleInputPassword3"
                            name="userConfirmPassword"
                            value={form.userConfirmPassword}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn`}
                      >
                        Change Password
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
