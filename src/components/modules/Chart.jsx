import PropTypes from "prop-types"
import styles from "./Chart.module.css"

import { convertData } from "../../helpers/convertData";
import { useState } from "react";

function Chart({chart, setChart}) {
    const [type, setType] =useState("market_cap")
    console.log(convertData(chart, type));
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
