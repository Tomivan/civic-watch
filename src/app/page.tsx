import CivicIssues from "./components/civicIssues/civicIssues.competent";
import Navbar from "./components/navbar/navbar.component";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <CivicIssues />
    </div>
  );
}
