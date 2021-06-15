import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import Menu from "../../components/module/Menu";
import { Col, Container, Row, Button } from "reactstrap";
import { Form, Modal } from "react-bootstrap";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import { authPage } from "../../middleware/authorizationPage";
import axiosApiIntances from "../../utils/axios";
import { images } from "../../next.config";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  console.log(data);

  const result = await axiosApiIntances
    .get(`/user/${data.user}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      console.log(res.config);
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
  // console.log(props);
  const router = useRouter();
  const [user, setUser] = useState(props.data);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [choose, setChoose] = useState(false);
  const [form, setForm] = useState({
    userImage: `${images.domains}${props.data.user_image}`,
    image: props.data.user_image,
  });

  const handleClose = () => {
    if (
      info === "ERROR : UPDATE IMAGE PROFILE" ||
      info === "ERROR : DELETE IMAGE PROFILE"
    ) {
      router.push("/profile");
      setShow(false);
    } else {
      router.push("/");
      setShow(false);
    }
  };

  const resetImage = () => {
    setForm({
      ...form,
      userImage: `${images.domains}${props.data.user_image}`,
      image: null,
    });
  };

  const handleImage = (event) => {
    // console.log(props);
    setForm({
      userImage: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0],
    });
    const id = props.data.user_id;
    console.log(id);
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    //* ==================== Check Form Data ===================== */
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    //* ======================== End ============================== */

    axiosApiIntances
      .patch(`user/update/profile/user/image/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((result) => {
        console.log(result);
        setShow(true);
        setInfo("UPDATE PROFILE IMAGE");
        setMsg(result.data.msg);
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setInfo("ERROR : UPDATE IMAGE PROFILE");
        setMsg(err.response.data.msg);
        resetImage();
      });
  };

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

  const handleChoose = () => {
    setShow(true);
    setChoose(true);
    setInfo("DELETE IMAGE PROFILE");
    setMsg("Are you sure to delete image?");
  };

  const handleDelete = () => {
    console.log("ini delete");
    const id = props.data.user_id;
    axiosApiIntances
      .patch(`user/delete/profile/user/image-profile/${id}`, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((result) => {
        console.log(result);
        setShow(true);
        setInfo("DELETE PROFILE IMAGE");
        setMsg(result.data.msg);
        setChoose(false);
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setInfo("ERROR : DELETE IMAGE PROFILE");
        setMsg(err.response.data.msg);
        resetImage();
        router.push("/profile");
      });
  };

  const handleCancel = () => {
    setShow(false);
    router.push("/profile");
  };

  return (
    <Layout title="Profile">
      <Navbar data={user} />
      {/* {console.log(user)} */}
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Modal show={show} className={styles.modal}>
            <Modal.Header className={styles.modalHeader}>
              <Modal.Title className={styles.modalTitle}>
                INFO {info}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
            {choose === true ? (
              <Modal.Footer>
                <Button
                  variant="fff"
                  className={styles.modalFooter1}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="fff"
                  className={styles.modalFooter2}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            ) : (
              <Modal.Footer>
                <Button
                  variant="fff"
                  className={styles.modalFooter}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Modal.Footer>
            )}
          </Modal>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={`${styles.boxRight} shadow md`}>
                <div className={styles.profile}>
                  <div>
                    <Form.Group className={styles.formUserImage}>
                      <Form.Label
                        htmlFor="files"
                        className={styles.boxUpdateImage}
                      >
                        Jangan di hapus !
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="files"
                        onChange={(event) => handleImage(event)}
                        className={styles.updateImage}
                      />
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
                    </Form.Group>

                    <div className={styles.boxEdit} onClick={handleChoose}>
                      <div className={styles.divEdit}>
                        <Image
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTE1Ni4zNzEwOTQgMzAuOTA2MjVoODUuNTcwMzEydjE0LjM5ODQzOGgzMC45MDIzNDR2LTE2LjQxNDA2M2MuMDAzOTA2LTE1LjkyOTY4Ny0xMi45NDkyMTktMjguODkwNjI1LTI4Ljg3MTA5NC0yOC44OTA2MjVoLTg5LjYzMjgxMmMtMTUuOTIxODc1IDAtMjguODc1IDEyLjk2MDkzOC0yOC44NzUgMjguODkwNjI1djE2LjQxNDA2M2gzMC45MDYyNXptMCAwIiBmaWxsPSIjN2E3ODg2IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMzQ0LjIxMDkzOCAxNjcuNzVoLTI5MC4xMDkzNzZjLTcuOTQ5MjE4IDAtMTQuMjA3MDMxIDYuNzgxMjUtMTMuNTY2NDA2IDE0LjcwNzAzMWwyNC4yNTM5MDYgMjk5LjkwNjI1YzEuMzUxNTYzIDE2Ljc0MjE4OCAxNS4zMTY0MDcgMjkuNjM2NzE5IDMyLjA5Mzc1IDI5LjYzNjcxOWgyMDQuNTQyOTY5YzE2Ljc3NzM0NCAwIDMwLjc0MjE4OC0xMi44OTQ1MzEgMzIuMDkzNzUtMjkuNjQwNjI1bDI0LjI1MzkwNy0yOTkuOTAyMzQ0Yy42NDQ1MzEtNy45MjU3ODEtNS42MTMyODItMTQuNzA3MDMxLTEzLjU2MjUtMTQuNzA3MDMxem0tMjE5Ljg2MzI4MiAzMTIuMjYxNzE5Yy0uMzI0MjE4LjAxOTUzMS0uNjQ4NDM3LjAzMTI1LS45Njg3NS4wMzEyNS04LjEwMTU2MiAwLTE0LjkwMjM0NC02LjMwODU5NC0xNS40MDYyNS0xNC41MDM5MDdsLTE1LjE5OTIxOC0yNDYuMjA3MDMxYy0uNTIzNDM4LTguNTE5NTMxIDUuOTU3MDMxLTE1Ljg1MTU2MiAxNC40NzI2NTYtMTYuMzc1IDguNDg4MjgxLS41MTU2MjUgMTUuODUxNTYyIDUuOTQ5MjE5IDE2LjM3NSAxNC40NzI2NTdsMTUuMTk1MzEyIDI0Ni4yMDcwMzFjLjUyNzM0NCA4LjUxOTUzMS01Ljk1MzEyNSAxNS44NDc2NTYtMTQuNDY4NzUgMTYuMzc1em05MC40MzM1OTQtMTUuNDIxODc1YzAgOC41MzEyNS02LjkxNzk2OSAxNS40NDkyMTgtMTUuNDUzMTI1IDE1LjQ0OTIxOHMtMTUuNDUzMTI1LTYuOTE3OTY4LTE1LjQ1MzEyNS0xNS40NDkyMTh2LTI0Ni4yMTA5MzhjMC04LjUzNTE1NiA2LjkxNzk2OS0xNS40NTMxMjUgMTUuNDUzMTI1LTE1LjQ1MzEyNSA4LjUzMTI1IDAgMTUuNDUzMTI1IDYuOTE3OTY5IDE1LjQ1MzEyNSAxNS40NTMxMjV6bTkwLjc1NzgxMi0yNDUuMzAwNzgyLTE0LjUxMTcxOCAyNDYuMjA3MDMyYy0uNDgwNDY5IDguMjEwOTM3LTcuMjkyOTY5IDE0LjU0Mjk2OC0xNS40MTAxNTYgMTQuNTQyOTY4LS4zMDQ2ODggMC0uNjEzMjgyLS4wMDc4MTItLjkyMTg3Ni0uMDIzNDM3LTguNTE5NTMxLS41MDM5MDYtMTUuMDE5NTMxLTcuODE2NDA2LTE0LjUxNTYyNC0xNi4zMzU5MzdsMTQuNTA3ODEyLTI0Ni4yMTA5MzhjLjUtOC41MTk1MzEgNy43ODkwNjItMTUuMDE5NTMxIDE2LjMzMjAzMS0xNC41MTU2MjUgOC41MTk1MzEuNSAxNS4wMTk1MzEgNy44MTY0MDYgMTQuNTE5NTMxIDE2LjMzNTkzN3ptMCAwIiBmaWxsPSIjN2E3ODg2IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMzk3LjY0ODQzOCAxMjAuMDYyNS0xMC4xNDg0MzgtMzAuNDIxODc1Yy0yLjY3NTc4MS04LjAxOTUzMS0xMC4xODM1OTQtMTMuNDI5Njg3LTE4LjY0MDYyNS0xMy40Mjk2ODdoLTMzOS40MTAxNTZjLTguNDUzMTI1IDAtMTUuOTY0ODQ0IDUuNDEwMTU2LTE4LjYzNjcxOSAxMy40Mjk2ODdsLTEwLjE0ODQzOCAzMC40MjE4NzVjLTEuOTU3MDMxIDUuODY3MTg4LjU4OTg0NCAxMS44NTE1NjIgNS4zNDM3NSAxNC44MzU5MzggMS45Mzc1IDEuMjE0ODQzIDQuMjMwNDY5IDEuOTQ1MzEyIDYuNzUgMS45NDUzMTJoMzcyLjc5Njg3NmMyLjUxOTUzMSAwIDQuODE2NDA2LS43MzA0NjkgNi43NS0xLjk0OTIxOSA0Ljc1MzkwNi0yLjk4NDM3NSA3LjMwMDc4MS04Ljk2ODc1IDUuMzQzNzUtMTQuODMyMDMxem0wIDAiIGZpbGw9IiM3YTc4ODYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
                          width="15px"
                          height="15px"
                          className={styles.imgEdit}
                        />
                      </div>
                      <h5 className={styles.textEdit}>Delete</h5>
                    </div>
                  </div>
                  <div className={styles.boxName}>
                    <h3 className={styles.nameProfie}>
                      {user.user_first_name} {user.user_last_name}
                    </h3>
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
