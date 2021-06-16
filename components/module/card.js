import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "../../styles/SearchReceiver.module.css";
import Image from "next/image";
import { images } from "../../next.config";
import { authPage } from "../../middleware/authorizationPage";
import axiosApiIntances from "../../utils/axios";
import React, { useState } from "react";

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

export default function Footer(props) {
  console.log(props);
  const router = useRouter();
  const handleTransferField = (id) => {
    router.push(`/transfer/transferfield/${id}`);
  };

  return (
    <>
      {props.data.user_id === props.userLogin.user_id ? (
        console.log("true")
      ) : (
        <div
          className={`${styles.boxButton}`}
          onClick={() => handleTransferField(props.data.user_id)}
        >
          <div className={styles.boxImage}>
            {props.data.user_image === "" ? (
              <Image
                src="/img/img-not-found.png"
                width="56px"
                height="56px"
                className={styles.imgProfile}
              />
            ) : (
              <img
                src={`${images.domains}${props.data.user_image}`}
                width="56px"
                height="56px"
                className={styles.imgProfile}
              />
            )}
          </div>
          <div className={styles.textProfile}>
            <h4 className={styles.textBox2Right3}>
              {props.data.user_first_name} {props.data.user_last_name}
            </h4>
            <h4 className={styles.textBox2Right4}>
              {props.data.user_phone_number}
            </h4>
          </div>
        </div>
      )}
    </>
  );
}
