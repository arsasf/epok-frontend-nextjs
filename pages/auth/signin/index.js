import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Layout from "../../../components/Layout";
import styles from "../../../styles/SignIn.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";
// import img1 from "../../../public/linier_gradient.png";
// const Image = require("next-images");
import Image from "next/image";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

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
    <Layout title="SignIn">
      <div className={`${styles.containerFluid} container-fluid`}>
        <div className="row">
          <div className={`col-lg-7 ${styles.colLeft}`}>
            <h1 className={styles.epok}>E-Pok</h1>
            <div className={styles.imgLine}>
              <Image
                src="/linier_gradient.png"
                width={1000}
                height={900}
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
          <div className={`${styles.colRight} col-lg-4`}>ini left col 4</div>
          <div className={`${styles.colSpace} col-lg-1`}>ini left col 1</div>
        </div>
        {/* <form className={`card ${styles.containerCard}`} onSubmit={handleLogin}>
          <h1>Login</h1>
          <hr />
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form> */}
      </div>
    </Layout>
  );
}
