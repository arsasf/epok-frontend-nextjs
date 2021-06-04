import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Pin.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Pin() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    // proses axios didalam .then
    const data = {
      user_id: 1,
    };
    Cookie.set("token", "TestingToken", { expires: 7, secure: true });
    Cookie.set("user", data.user_id, { expires: 7, secure: true });
    router.push("/");
  };

  return (
    <Layout title="Pin">
      <div className={`${styles.containerFluid} container-fluid`}>
        <div className="row">
          <div className={`col-lg-7 ${styles.colLeft}`}>
            <h1 className={styles.epok}>E-Pok</h1>
            <div className={styles.imgLine}>
              <Image
                src="/linier_gradient.png"
                width="1000px"
                height="900px"
                className={styles.linierGradient}
              />
            </div>
            <div className={styles.boxImage}>
              <div className={styles.boxImagePhone}>
                <Image
                  src="/phone1.png"
                  width="auto"
                  height="530px"
                  className={styles.phone1}
                />
              </div>
              <div className={styles.boxImagePhone1}>
                <Image src="/phone2.png" width="auto" height="530px" />
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
            <h1 className={styles.textRight1}>
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </h1>
            <h1 className={styles.textRight2}>
              Create 6 digits pin to secure all your money and your data in
              Zwallet app. Keep it secret and don’t tell anyone about your
              Zwallet account password and the PIN.
            </h1>
            <form className={`card ${styles.form} `} onSubmit={handleLogin}>
              <div className={styles.colPin}>
                <div className="mb-5">
                  <input
                    type="text"
                    className={`${styles.placeholder} form-control`}
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    className={`${styles.placeholder} form-control`}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`${styles.placeholder} form-control`}
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    className={`${styles.placeholder} form-control`}
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    className={`${styles.placeholder} form-control`}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`${styles.placeholder} form-control`}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={`${styles.buttonForm} btn `}>
                Confirm
              </button>
            </form>
          </div>
          <div className={`${styles.colSpace} col-lg-1`}>ini left col 1</div>
        </div>
      </div>
    </Layout>
  );
}
