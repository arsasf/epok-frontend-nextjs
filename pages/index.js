import Layout from "components/Layout";
import { Button, Container, Col, Row } from "react-bootstrap";
import styles from "styles/LandingPage.module.css";
import {
  DownloadSimple,
  LockKey,
  Phone,
  ArrowLeft,
  ArrowRight,
} from "phosphor-react";
import { useRouter } from "next/router";
import { unauthPage } from "middleware/authorizationPage";
export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function LandingPage() {
  const router = useRouter();
  return (
    <Layout title="Landing Page">
      <Container fluid className={styles.navbar}>
        <div className={styles.rowNavbar}>
          <h1 className={styles.textLogo}>E-Pok</h1>
          <div>
            <Button
              variant="fff"
              className={styles.buttonLogin}
              onClick={() => router.push("/signin")}
            >
              Login
            </Button>
            <Button
              variant="fff"
              className={styles.buttonSignUp}
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Container>
      <Container fluid className={styles.content1}>
        <Row>
          <Col lg={5} md={6} xs={12}>
            <div className={styles.boxLayer}>
              <img
                src="/landing-page/layer.png"
                alt="layer"
                className={styles.layer}
              />
              <img
                src="/landing-page/phone.png"
                alt="layer"
                className={styles.phone}
              />
            </div>
          </Col>
          <Col lg={7} md={6} xs={12}>
            <div className={styles.boxContent1}>
              <h1 className={styles.textTitleContent1}>
                Awesome App <br /> For Saving
                <b className={styles.textBold}>Time.</b>
              </h1>
              <h6 className="mb-5">
                We bring you a mobile app for banking problems that oftenly
                wasting much of your times.
              </h6>
              <Button variant="fff" className={styles.buttonTryIt}>
                Try It Free
              </Button>
              <h6>Available on</h6>
              <div className={styles.boxStore}>
                <img
                  src="/landing-page/gplay.png"
                  alt="layer"
                  className={styles.gplay}
                />
                <img
                  src="/landing-page/appstore.png"
                  alt="layer"
                  className={styles.appstore}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.content2}>
        <div className={styles.boxLogoCompany}>
          <img
            src="/landing-page/microsoft.png"
            alt="layer"
            className={styles.logoCompany}
          />
          <img
            src="/landing-page/dropbox.png"
            alt="layer"
            className={styles.logoCompany}
          />
          <img
            src="/landing-page/hm.png"
            alt="layer"
            className={styles.logoCompany}
          />
          <img
            src="/landing-page/airbnb.png"
            alt="layer"
            className={styles.logoCompany}
          />
          <img
            src="/landing-page/canon.png"
            alt="layer"
            className={styles.logoCompany}
          />
          <img
            src="/landing-page/dell.png"
            alt="layer"
            className={styles.logoCompany}
          />
        </div>
      </Container>
      <Container fluid className={styles.content3}>
        <div className={styles.boxAboutApp}>
          <h1 className={styles.textTitleContent1}>
            <b className={styles.textBold}>About</b> the Application.
          </h1>
          <h5 className={`${styles.textInfoAboutApp} mb-5`}>
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </h5>
        </div>
        <div className={styles.boxContent3}>
          <div className={`${styles.boxLogo} mb-3 shadow md`}>
            <Phone size={48} color="#6379f4" className={styles.icon} />
            <h5 className={`${styles.textLogoContent3} mb-3`}>24/7 Support</h5>
            <h6 className={`${styles.textInfoLogo} mb-3`}>
              We have 24/7 contact support so you can contact us whenever you
              want and we will respond it.
            </h6>
          </div>
          <div className={`${styles.boxLogo} mb-3 shadow md`}>
            <LockKey size={48} color="#6379f4" className={styles.icon} />
            <h5 className={`${styles.textLogoContent3} mb-3`}>Data Privacy</h5>
            <h6 className={`${styles.textInfoLogo} mb-3`}>
              We make sure your data is safe in our database and we will encrypt
              any data you submitted to us.
            </h6>
          </div>
          <div className={`${styles.boxLogo} mb-3 shadow md`}>
            <DownloadSimple size={48} color="#6379f4" className={styles.icon} />
            <h5 className={`${styles.textLogoContent3} mb-3`}>Easy Download</h5>
            <h6 className={`${styles.textInfoLogo} mb-3`}>
              E-Pok is 100% totally free to use it’s now available on Google
              Play Store and App Store.
            </h6>
          </div>
        </div>
      </Container>
      <Container fluid className={styles.content4}>
        <Row>
          <Col lg={5} md={6} xs={12}>
            <div className={styles.boxLayerContent4}>
              <img
                src="/landing-page/layer.png"
                alt="layer"
                className={styles.layerContent4}
              />
              <img
                src="/landing-page/phone.png"
                alt="layer"
                className={styles.phoneContent4}
              />
            </div>
          </Col>
          <Col lg={7} md={6} xs={12}>
            <div className={styles.boxContent4}>
              <h1 className={styles.textTitleContent4}>
                All The <b className={styles.textBold}>Great</b>
                <br />
                E-Pok Features.
              </h1>
              <div className={styles.boxFeature}>
                <h5 className={styles.textTitleFeature}>
                  <b className={styles.textBold}>1. </b>
                  Small Fee
                </h5>
                <h6 className={styles.textInfoFeature}>
                  We only charge 5% of every success transaction done in Zwallet
                  app.
                </h6>
              </div>
              <div className={styles.boxFeature}>
                <h5 className={styles.textTitleFeature}>
                  <b className={styles.textBold}>2. </b>
                  Data Secured
                </h5>
                <h6 className={styles.textInfoFeature}>
                  All your data is secured properly in our system and it’s
                  encrypted.
                </h6>
              </div>
              <div className={styles.boxFeature}>
                <h5 className={styles.textTitleFeature}>
                  <b className={styles.textBold}>3. </b>
                  User Friendly
                </h5>
                <h6 className={styles.textInfoFeature}>
                  Zwallet come up with modern and sleek design and not
                  complicated.
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.content3}>
        <div className={styles.boxAboutApp}>
          <h1 className={styles.textTitleContent1}>
            What Users are
            <b className={styles.textBold}> Saying.</b>
          </h1>
          <h5 className={`${styles.textInfoAboutApp} mb-5`}>
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </h5>
        </div>
        <div className={styles.boxTestimoni}>
          <ArrowLeft size={48} color="#6379f4" className={styles.icon} />
          <div className={`${styles.boxProfile} mb-3 shadow md`}>
            <img
              src="/landing-page/img-testimoni.png"
              alt="layer"
              className="mb-5"
            />
            <h5 className={`${styles.textLogoContent5} mb-3`}>
              Alex Hansinburg
            </h5>
            <h6 className={`${styles.textInfoLogo} mb-3`}>
              “This is the most outstanding app that I’ve ever try in my live,
              this app is such an amazing masterpiece and it’s suitable for you
              who is bussy with their bussiness and must transfer money to
              another person aut there. Just try this app and see the power!”
            </h6>
          </div>
          <ArrowRight size={48} color="#6379f4" className={styles.icon} />
        </div>
      </Container>
      <Container fluid className={styles.footer}>
        <h1 className={`${styles.textLogoFooter} mb-3`}>E-pok</h1>
        <h5 className={styles.textInfoFooter}>
          Simplify financial needs and saving <br />
          much time in banking needs with <br />
          one single app.
        </h5>
        <hr className={styles.header} />
        <div className={styles.boxContact}>
          <h1 className={styles.textInfoFooter}>
            2021 E-Pok. All right reserved.
          </h1>
          <div className={styles.contact}>
            <h1 className={styles.textInfoContact}>+62 5637 8882 9901</h1>
            <h1 className={styles.textInfoFooter}>contact@epok.com</h1>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
