import PropTypes from "prop-types"
import styles from "./Chart.module.css"

function Chart({chart, setChart}) {
  return (
    <div className={styles.container}>
        <span className={styles.cross} onClick={() => setChart((chart) => !chart)}>
            X
        </span>
        <div className={styles.chat}></div>
    </div>
  )
}

Chart.propTypes = {
  chart: PropTypes.any,
  setChart: PropTypes.any
}

export default Chart
