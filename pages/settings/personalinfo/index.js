import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row } from "reactstrap";
import styles from "../../../styles/PersonalInfo.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
import { Button, FormControl, Modal } from "react-bootstrap";
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
  const [update, setupdate] = useState(false);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [form, setForm] = useState({
    userFirstName: props.data.user_first_name,
    userLastName: props.data.user_last_name,
    userPhone: props.data.user_phone_number,
    userEmail: props.data.user_email,
  });
  // console.log(props);
  const resetData = () => {
    setForm({
      userFirstName: props.data.user_first_name,
      userLastName: props.data.user_last_name,
      userPhone: props.data.user_phone_number,
      userEmail: props.data.user_email,
    });
  };
  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const changeUpdate = () => {
    setupdate(!update);
    resetData();
  };
  const handleSave = () => {
    const id = props.data.user_id;
    axiosApiIntances
      .patch(`user/update/profile/user/${id}`, form, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((result) => {
        console.log(result);
        setShow(true);
        setInfo("UPDATE BIODATA PROFILE");
        setMsg(result.data.msg);
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setInfo("ERROR : UPDATE BIODATA PROFILE");
        setMsg(err.response.data.msg);
        resetImage();
      });
  };
  const handleClose = () => {
    if (info === "ERROR : UPDATE BIODATA PROFILE") {
      router.push("/settings/personalinfo");
      setShow(false);
      setupdate(false);
    } else {
      router.push("/profile");
      setShow(false);
      setupdate(false);
    }
  };
  return (
    <Layout title="PersonalInfo">
      <Navbar data={user} />
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Modal show={show} className={styles.modal}>
            <Modal.Header className={styles.modalHeader}>
              <Modal.Title className={styles.modalTitle}>
                INFO {info}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="fff"
                className={styles.modalFooter}
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div className={styles.boxPersonalInfo}>
                    <h4 className={styles.titleSetting}>
                      Personal Information
                    </h4>
                    <div className={styles.boxUpdate}>
                      <Button
                        variant="fff"
                        onClick={changeUpdate}
                        className={styles.buttonUpdate}
                      >
                        {update === false ? (
                          <h1 className={styles.textUpdate}>Update </h1>
                        ) : (
                          <h1 className={styles.textUpdate}>Cancel</h1>
                        )}
                      </Button>
                      <Button
                        variant="fff"
                        className={styles.buttonSave}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.textSetting}>
                      We got your personal information from the sign up
                      proccess. If you want to make changes on your information,
                      contact our support.
                    </h3>
                  </div>
                  {update === true ? (
                    <div className={styles.boxForm}>
                      <div className={`${styles.boxButton} `}>
                        <h4 className={styles.textButton}>First Name</h4>
                        <FormControl
                          className={styles.placeholder}
                          type="text"
                          placeholder="Input your first name"
                          name="userFirstName"
                          value={form.userFirstName}
                          onChange={(event) => changeText(event)}
                          required
                        />
                      </div>
                      <div className={`${styles.boxButton} `}>
                        <h4 className={styles.textButton}>Last Name</h4>
                        <FormControl
                          className={styles.placeholder}
                          type="text"
                          placeholder="Input your last name"
                          name="userLastName"
                          value={form.userLastName}
                          onChange={(event) => changeText(event)}
                          required
                        />
                      </div>
                      <div className={`${styles.boxButton} `}>
                        <h4 className={styles.textButton}>Verified E-mail</h4>
                        <FormControl
                          className={styles.placeholder1}
                          type="text"
                          placeholder="Input your email"
                          disabled
                          name="userEmail"
                          value={form.userEmail}
                          onChange={(event) => changeText(event)}
                          required
                        />
                      </div>
                      <div className={`${styles.boxButtonPhone} `}>
                        <div className={styles.boxtextPhone}>
                          <h4 className={styles.textButton}>Phone Number</h4>
                          <FormControl
                            className={styles.placeholder}
                            type="text"
                            pattern="[+]{1}[0-9]{11,14}"
                            maxLength="14"
                            placeholder="Input your phone number"
                            name="userPhone"
                            value={form.userPhone}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <h4 className={styles.textButton3}>Manage</h4>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.boxForm}>
                      <div className={`${styles.boxButton} `}>
                        <h4 className={styles.textButton}>First Name</h4>
                        <FormControl
                          className={styles.placeholder1}
                          type="text"
                          placeholder="Input your first name"
                          disabled
                          name="userFirstName"
                          value={form.userFirstName}
                          onChange={(event) => changeText(event)}
                          required
                        />
                      </div>
                      <div className={`${styles.boxButton} `}>
                        <h4 className={styles.textButton}>Last Name</h4>
                        <FormControl
                          className={styles.placeholder1}
                          type="text"
                          placeholder="Input your last name"
                          disabled
                          name="userLastName"
                          value={form.userLastName}
                          onChange={(event) => changeText(event)}
                          required
                        />
                      </div>
                      <div className={`${styles.boxButton} `}>
                        <h4 className={styles.textButton}>Verified E-mail</h4>
                        <FormControl
                          className={styles.placeholder1}
                          type="text"
                          placeholder="Input your email"
                          disabled
                          name="userEmail"
                          value={form.userEmail}
                          onChange={(event) => changeText(event)}
                          required
                        />
                      </div>
                      <div className={`${styles.boxButtonPhone} `}>
                        <div className={styles.boxtextPhone}>
                          <h4 className={styles.textButton}>Phone Number</h4>
                          <FormControl
                            className={styles.placeholder1}
                            type="text"
                            placeholder="Input your phone number"
                            disabled
                            name="userPhone"
                            value={form.userPhone}
                            onChange={(event) => changeText(event)}
                            required
                          />
                        </div>
                        <h4 className={styles.textButton3}>Manage</h4>
                      </div>
                    </div>
                  )}
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
