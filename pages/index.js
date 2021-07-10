import Layout from "components/Layout";
import { Button, Container, Col, Row } from "react-bootstrap";
import styles from "styles/LandingPage.module.css";
import { PhoneCall } from "phosphor-react";

export default function LandingPage() {
  return (
    <Layout title="Landing Page">
      <Container fluid className={styles.navbar}>
        <div className={styles.rowNavbar}>
          <h1 className={styles.textLogo}>E-Pok</h1>
          <div>
            <Button variant="fff" className={styles.buttonLogin}>
              Login
            </Button>
            <Button variant="fff" className={styles.buttonSignUp}>
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
                Awesome App For Saving <b className={styles.textBold}>Time.</b>
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
          <h5 className={styles.textInfoAboutApp}>
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </h5>
          <div className={styles.boxContent3}>
            <div>
              <PhoneCall size={45} color="#6379f4" />
            </div>
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
                All The <b className={styles.textBold}> Great </b>
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
    </Layout>
  );
}
