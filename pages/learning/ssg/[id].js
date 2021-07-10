import axios from "axios";

export async function getStaticPaths() {
  const users = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return [];
    });

  const paths = users.map((item) => ({
    params: { id: `${item.id}` },
  }));
  // console.log(paths);
  //fallback false : jika id yg diakses tidak ada maka muncul page 404
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // console.log(context.params);
  const user = await axios
    .get(`https://jsonplaceholder.typicode.com/users/${context.params.id}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return {};
    });

  return {
    props: { user },
  };
}

export default function SSGPage(props) {
  return (
    <>
      <h1>SSG DETAIL PAGE</h1>
      <hr />
      <h3>{props.user.name}</h3>
      <h3>{props.user.email}</h3>
    </>
  );
}
