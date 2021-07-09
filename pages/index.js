import { useState } from "react";
import Cookie from "js-cookie";
import axiosApiIntances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import Menu from "components/module/Menu";
import styles from "styles/Home.module.css";
import { authPage } from "middleware/authorizationPage";
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import CardTransaction from "components/module/cardHistory";
import { Bar } from "react-chartjs-2";
import { ArrowSquareUp, ArrowSquareDown } from "phosphor-react";

export async function getServerSideProps(context) {
  let data = await authPage(context);
  const authorization = {
    Authorization: `Bearer ${data.token || ""}`,
  };

  const result = await axiosApiIntances
    .get(`/user/${data.user}`, {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 403) {
        Cookie.remove("token");
        Cookie.remove("user");
        return {};
      }
    });

  const resBalance = await axiosApiIntances
    .get(`/balance/${data.user}`, {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 403) {
        Cookie.remove("token");
        Cookie.remove("user");
        return {};
      }
    });

  const resTransaction = await axiosApiIntances
    .get(`/transaction/all/${data.user}?limit=4&filter=month(now())`, {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 403) {
        Cookie.remove("token");
        Cookie.remove("user");
        return {};
      }
    });

  const dataDebitPerDay = await axiosApiIntances
    .get("transaction/all/transaction/transaction-debit", {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  const dataKreditPerDay = await axiosApiIntances
    .get("transaction/all/transaction/transaction-kredit", {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  const sumDataDebit = await axiosApiIntances
    .get("transaction/all/transaction/sum-debit", {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  const sumDataKredit = await axiosApiIntances
    .get("transaction/all/transaction/sum-kredit", {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });
  return {
    props: {
      data: result,
      userLogin: data,
      balance: resBalance,
      transaction: resTransaction,
      transactionDebit: dataDebitPerDay,
      transactionKredit: dataKreditPerDay,
      sumDataDebit,
      sumDataKredit,
    },
  };
}

export default function Home(props) {
  console.log(props);
  const [user] = useState(props.data);
  const [transaction] = useState(props.transaction);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [show] = useState(false);
  const { transactionDebit } = props;
  const { transactionKredit } = props;
  const { sumDataDebit } = props;
  const { sumDataKredit } = props;
  let formatter = new Intl.NumberFormat("in-ID", {
    style: "currency",
    currency: "IDR",
  });
  const IDR = formatter.format(props.balance.balance);

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const [form, setForm] = useState({
    transactionReceiverId: props.idReceiver,
    transactionNote: "",
    transactionAmount: "",
    transactionType: "transfer",
    userPin: "",
  });
  const handleTopUp = (event) => {
    event.preventDefault();
    const setData = {
      transactionReceiverId: 0,
      transactionNote: form.transactionNote,
      transactionAmount: parseInt(form.transactionAmount),
      transactionType: "topup",
      userPin: props.data.user_pin,
    };
    console.log(setData);
    const id = props.data.user_id;
    axiosApiIntances
      .post(`transaction/transfer/${id}`, setData)
      .then((res) => {
        setModal(false);
        router.push(res.data.data.redirectUrl);
        setForm({
          ...form,
          transactionNote: "",
          transactionAmount: "",
        });
      })
      .catch((err) => {
        setModal(false);
        console.log(err);
        setForm({
          ...form,
          transactionNote: "",
          transactionAmount: "",
        });
        // router.push("/");
      });
  };

  //* ==================== Chart

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Debit",
        data: [
          transactionDebit[0][0].total,
          transactionDebit[1][0].total,
          transactionDebit[2][0].total,
          transactionDebit[3][0].total,
          transactionDebit[4][0].total,
          transactionDebit[5][0].total,
          transactionDebit[6][0].total,
        ],
        backgroundColor: ["#6379f4"],
        borderColor: ["#6379f4"],
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 15,
      },
      {
        label: "Kredit",
        data: [
          transactionKredit[0][0].total,
          transactionKredit[1][0].total,
          transactionKredit[2][0].total,
          transactionKredit[3][0].total,
          transactionKredit[4][0].total,
          transactionKredit[5][0].total,
          transactionKredit[6][0].total,
        ],
        backgroundColor: ["#ff5b37"],
        borderColor: ["#ff5b37"],
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const handleRefresh = () => {
    window.location.href = "/";
  };

  return (
    <Layout title="Home">
      <Navbar data={user} />
      {console.log(sumDataDebit, sumDataKredit)}
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Modal isOpen={modal} className={styles.modal}>
            <ModalHeader className={styles.modalHeader}>
              Enter Balance to Top Up
            </ModalHeader>
            <ModalBody className={styles.modalBody}>
              <h4 className={styles.textPin}>
                Enter balance, and please put number to field
              </h4>
              <div>
                <div className={styles.boxForm}>
                  <form
                    className={`card ${styles.form} `}
                    onSubmit={handleTopUp}
                  >
                    {show ? (
                      <Alert className={styles.alert} variant="warning">
                        <Alert.Heading>Warning!</Alert.Heading>
                        <p>{msg}</p>
                        <Button variant="warning" onClick={() => handleClose()}>
                          Close
                        </Button>
                      </Alert>
                    ) : (
                      ""
                    )}

                    <div className={styles.boxInput1}>
                      <div className="input-group">
                        <input
                          type="number"
                          step="1"
                          pattern="\d+"
                          placeholder="00.00"
                          className={`${styles.placeholder} form-control`}
                          id="exampleInputPassword1"
                          pattern="[0-9]"
                          name="transactionAmount"
                          value={form.transactionAmount}
                          onChange={(event) => changeText(event)}
                          required
                        />
                      </div>
                    </div>
                    <h4 className={styles.textMoney}>
                      Balance available : {IDR}
                    </h4>
                    <div className={styles.boxNote}>
                      <div className="input-group">
                        <div className={styles.iconForm}>
                          <Image
                            src="/img/edit.png"
                            width="20px"
                            height="20px"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Add some notes"
                          className={`${styles.placeholder1} form-control`}
                          name="transactionNote"
                          value={form.transactionNote}
                          onChange={(event) => changeText(event)}
                        />
                      </div>
                    </div>
                    <div className={styles.boxButtonContinue}>
                      <button
                        type="submit"
                        className={`${styles.buttonForm1} btn`}
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`${styles.buttonForm} btn`}
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </ModalBody>
          </Modal>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu nav="home" />
            </Col>
            <Col lg={9} className={styles.right}>
              <div className={styles.boxRight}>
                <div className={styles.box1}>
                  <div className={styles.textBox1Left}>
                    <h4 className={styles.balance}>Balance</h4>
                    <h4 className={styles.saldo}>{IDR}</h4>
                    <h4 className={styles.phone}>{user.user_phone_number}</h4>
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
                    <Button
                      className={styles.boxButton}
                      onClick={() => setModal(true)}
                    >
                      <div>
                        <Image src="/img/plus.png" width="25px" height="25px" />
                      </div>
                      <h4 className={styles.textBox1Right}>Top Up</h4>
                    </Button>
                  </div>
                </div>
                <div className={styles.box2}>
                  <div className={`${styles.box2Left} `}>
                    <Row className={styles.boxInfoIncomeOutcome}>
                      <Col
                        lg={6}
                        md={12}
                        xs={12}
                        className={styles.colBoxInfoIncomeOutcome}
                      >
                        <div className={styles.boxIncome}>
                          <ArrowSquareUp color="#6379f4" size={40} />
                          <h6 className={styles.textIncome}>Income</h6>
                        </div>
                        <h5>{formatter.format(sumDataDebit[0].total)}</h5>
                      </Col>
                      <Col
                        lg={6}
                        md={12}
                        xs={12}
                        className={styles.colBoxInfoIncomeOutcome}
                      >
                        <div className={styles.boxOutCome}>
                          <ArrowSquareDown color="#ff5b37" size={40} />
                          <h6 className={styles.textIncome}>Expense</h6>
                        </div>
                        <h5>{formatter.format(sumDataKredit[0].total)}</h5>
                      </Col>
                    </Row>
                    <Bar data={data} options={options} />
                  </div>
                  <div className={`${styles.box2Right} `}>
                    <div className={styles.boxTransaction}>
                      <h4 className={styles.textBox2Right1}>
                        Transaction History
                      </h4>
                      <h4
                        className={styles.textBox2Right2}
                        onClick={() => handleRefresh()}
                      >
                        Refresh
                      </h4>
                    </div>
                    {transaction.map((item, index) => {
                      return (
                        <div key={index} className={styles.boxTransaction2}>
                          <CardTransaction data={item} userLogin={props.data} />
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
