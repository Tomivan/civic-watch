import styles from "./page.module.css"

const Notifications = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1>Notifications</h1>
                <p>Updates on reports you are following.</p>
            </div>
            <span> X </span>
        </div>
        <hr />
        <div className={styles.notificationList}>
            <p><strong>LGS-84920 assigned to LASEMA</strong></p>
            <p>Drainage clearance crew scheduled for Oshodi service lane within 24 hours.</p>
            <p>18 min ago</p>
        </div>
    </div>
  )
}

export default Notifications;