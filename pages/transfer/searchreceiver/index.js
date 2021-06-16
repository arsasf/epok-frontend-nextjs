import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Menu from "../../../components/module/Menu";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
import styles from "../../../styles/SearchReceiver.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import axiosApiIntances from "../../../utils/axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import CardUser from "../../../components/module/card";
import ReactPaginate from "react-paginate";

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
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("Sort");
  const [pagination, setPagination] = useState({});

  const changeText = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    console.log("Get Data !");
    getUser();
  }, []);

  const getUser = () => {
    axiosApiIntances
      .get(`/user?page=1&limit=3&sort=&search=`, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((res) => {
        router.push(`/transfer/searchreceiver`);
        console.log(res.data);
        setSearch("");
        setUsers(res.data.data);
        setPage(res.data.pagination.page);
        setPagination(res.data.pagination);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  const handleSearch = (event, limit, page) => {
    // const id = user.user_id;
    console.log(page);
    event.preventDefault();
    console.log("runnging");
    console.log(search);
    axiosApiIntances
      .get(`/user?page=${page}&limit=3&sort=${sort}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((res) => {
        router.push(`/transfer/searchreceiver?search=${search}&sort=${sort}`);
        console.log(res.data);
        setSearch("");
        setUsers(res.data.data);
        setPage(res.data.pagination.page);
        setPagination(res.data.pagination);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    console.log(selectedPage);
    setPage(selectedPage);
    axiosApiIntances
      .get(`/user?page=${selectedPage}&limit=3&sort=${sort}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((res) => {
        router.push(
          `/transfer/searchreceiver?search=${search}&sort=${sort}&page=${selectedPage}&limit=1`
        );
        console.log(res.data);
        setSearch("");
        setUsers(res.data.data);
        setPage(res.data.pagination.page);
        setPagination(res.data.pagination);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };
  const handleSortClick = (event, param) => {
    setSort(event);
    setTitle(param);
  };

  return (
    <Layout title="Search Receiver">
      <Navbar data={user} />
      {console.log(pagination)}
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <Row>
            <Col lg={3} className={styles.left}>
              <Menu transfer={true} />
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
                      onSubmit={() =>
                        handleSearch(event, pagination.limit, page)
                      }
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
                    <Dropdown className={styles.dropdownSort}>
                      <Dropdown.Toggle
                        variant="#fff"
                        title="sort"
                        id="dropdown-basic"
                        className={styles.titleSort}
                      >
                        {title}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={styles.menuDropdown}>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() =>
                            handleSortClick("user_first_name ASC", "Name A-Z")
                          }
                        >
                          Name A-Z
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() =>
                            handleSortClick("user_first_name DESC", "Name Z-A")
                          }
                        >
                          Name Z-A
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() =>
                            handleSortClick(
                              "user_phone_number ASC",
                              "Phone Number A-Z"
                            )
                          }
                        >
                          Phone Number A-Z
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() =>
                            handleSortClick(
                              "user_phone_number DESC",
                              "Phone Number Z-A"
                            )
                          }
                        >
                          Phone Number Z-A
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className={styles.listReceiver}>
                    {users.map((item, index) => {
                      return (
                        <div key={index}>
                          <CardUser data={item} userLogin={props.data} />
                        </div>
                      );
                    })}
                  </div>
                  <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pagination.totalpage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={styles.pagination}
                    subContainerClassName={`${styles.pages} ${styles.pagination}`}
                    activeClassName={styles.active}
                  />
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
