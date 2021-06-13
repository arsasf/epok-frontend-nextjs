import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import styles from "styles/SignIn.module.css";
import { unauthPage } from "middleware/authorizationPage";
import Image from "next/image";
import { connect } from "react-redux";
import { verify } from "redux/actions/auth";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export async function getServerSideProps(context) {
  await unauthPage(context);
  const id = context.query.id;
  return { props: { userVerify: id } };
}

function Verified(props) {
  // console.log(props);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState("");

  const toggle = (event) => {
    event.preventDefault();
    const id = props.userVerify;

    if (info === "ERROR VERIFY") {
      router.push(`/verify/${id}`);
      setModal(!modal);
    } else {
      router.push("/signin");
      setModal(!modal);
    }
  };

  const handleVerfied = (event) => {
    const id = props.userVerify;
    event.preventDefault();
    props
      .verify(id)
      .then((res) => {
        console.log(res);
        setModal(!modal);
        setMsg(res.value.data.msg);
        setInfo("VERIFY");
      })
      .catch((err) => {
        setModal(!modal);
        setMsg(err.response.data.msg);
        setInfo("ERROR VERIFY");
        console.log(err);
        return {};
      });
  };

  return (
    <Layout title="Verification User">
      <div className={`${styles.containerFluid} container-fluid`}>
        <div className="row">
          <div className={`col-lg-7 ${styles.colLeft}`}>
            <h1 className={styles.epok}>E-Pok</h1>
            <div className={styles.imgLine}>
              <Image
                src="/img/linier_gradient.png"
                width="1000px"
                height="900px"
                className={styles.linierGradient}
              />
            </div>
            <div className={styles.boxImage}>
              <div className={styles.boxImagePhone}>
                <Image
                  src="/img/phone1.png"
                  width="auto"
                  height="530px"
                  className={styles.phone1}
                />
              </div>
              <div className={styles.boxImagePhone1}>
                <Image src="/img/phone2.png" width="auto" height="530px" />
              </div>
            </div>
            <h1 className={styles.textLeft1}>
              App that Covering Banking Needs.
            </h1>
            <h1 className={styles.textLeft2}>
              E-Pok is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </h1>
          </div>
          <div className={`${styles.colRight} col-lg-4`}>
            <h1 className={styles.textRight1}>Verification Email</h1>
            <h1 className={styles.textRight2}>
              Hello, Thanks for registered. Please Click Confirm to activation
              your email !
            </h1>
            <form className={`card ${styles.form} `} onSubmit={handleVerfied}>
              <button type="submit" className={`${styles.buttonForm} btn`}>
                Confirm
              </button>
            </form>
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
          </div>
          <div className={`${styles.colSpace} col-lg-1`}>ini left col 1</div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { verify };
// (null, mapDispatchToProps)
// (mapStateToProps)
export default connect(mapStateToProps, mapDispatchToProps)(Verified);
