import Image from "next/image";
import styles from "./page.module.css";
import Onboard from "./onboard/page";
import Login from "./auth/login/page";

export default function Home() {
  return (
   <main>
   <Login/>
   </main>
  );
}
