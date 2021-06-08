import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "../../styles/Menu.module.css";
import Image from "next/image";
import { Button } from "reactstrap";

export default function Menu() {
  const router = useRouter();

  const handleLogout = (event) => {
    event.preventDefault();
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/signin");
  };

  return (
    <>
      <div className={`${styles.boxMenuLeft} shadow md`}>
        <div className={styles.listMenuTop}>
          <Button className={styles.rowMenu}>
            <div className={styles.imgMenu}>
              <Image src="/img/grid.png" width="25px" height="25px" />
            </div>
            <h3 className={styles.textMenu}>Dashboard</h3>
          </Button>
          <Button className={styles.rowMenu}>
            <div className={styles.imgMenu}>
              <Image src="/img/arrow-up.png" width="25px" height="25px" />
            </div>
            <h3 className={styles.textMenu}>Transfer</h3>
          </Button>
          <Button className={styles.rowMenu}>
            <div className={styles.imgMenu}>
              <Image src="/img/plus.png" width="25px" height="25px" />
            </div>
            <h3 className={styles.textMenu}>Top Up</h3>
          </Button>
          <Button className={styles.rowMenu}>
            <div className={styles.imgMenu}>
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwyODguMzg5Yy0xNTMuODM3LDAtMjM4LjU2LDcyLjc3Ni0yMzguNTYsMjA0LjkyNWMwLDEwLjMyMSw4LjM2NSwxOC42ODYsMTguNjg2LDE4LjY4Nmg0MzkuNzQ3ICAgIGMxMC4zMjEsMCwxOC42ODYtOC4zNjUsMTguNjg2LTE4LjY4NkM0OTQuNTYsMzYxLjE3Miw0MDkuODM3LDI4OC4zODksMjU2LDI4OC4zODl6IE01NS40OTIsNDc0LjYyOCAgICBjNy4zNS05OC44MDYsNzQuNzEzLTE0OC44NjYsMjAwLjUwOC0xNDguODY2czE5My4xNTksNTAuMDYsMjAwLjUxNSwxNDguODY2SDU1LjQ5MnoiIGZpbGw9IiMzYTNkNDJjYyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LDBjLTcwLjY2NSwwLTEyMy45NTEsNTQuMzU4LTEyMy45NTEsMTI2LjQzN2MwLDc0LjE5LDU1LjYwNCwxMzQuNTQsMTIzLjk1MSwxMzQuNTRzMTIzLjk1MS02MC4zNSwxMjMuOTUxLTEzNC41MzQgICAgQzM3OS45NTEsNTQuMzU4LDMyNi42NjUsMCwyNTYsMHogTTI1NiwyMjMuNjExYy00Ny43NDMsMC04Ni41NzktNDMuNTg5LTg2LjU3OS05Ny4xNjhjMC01MS42MTEsMzYuNDEzLTg5LjA3MSw4Ni41NzktODkuMDcxICAgIGM0OS4zNjMsMCw4Ni41NzksMzguMjg4LDg2LjU3OSw4OS4wNzFDMzQyLjU3OSwxODAuMDIyLDMwMy43NDMsMjIzLjYxMSwyNTYsMjIzLjYxMXoiIGZpbGw9IiMzYTNkNDJjYyIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
                width="25px"
                height="25px"
              />
            </div>
            <h3 className={styles.textMenu}>Profile</h3>
          </Button>
        </div>
        <div className={styles.listMenuBottom}>
          <Button className={styles.rowMenu} onClick={handleLogout}>
            <div className={styles.imgMenu}>
              <Image src="/img/log-out.png" width="25px" height="25px" />
            </div>
            <h3 className={styles.textMenu}>Logout</h3>
          </Button>
        </div>
      </div>
    </>
  );
}
