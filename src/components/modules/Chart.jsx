import PropTypes from "prop-types"
import styles from "./Chart.module.css"

import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { convertData } from "../../helpers/convertData";


function Chart({chart, setChart, sign}) {
    console.log(chart)
    const [type, setType] =useState("prices")
    console.log(convertData(chart, type));

  return (
    <div className={styles.container}>
        <span className={styles.cross} onClick={() => setChart((chart) => !chart)}>
            X
        </span>
        <div className={styles.chart}>

            <div className={styles.name}>
                <img src={chart.coin.image} alt="" />
                <p>{chart.coin.name}</p>
            </div>

            <div className={styles.graph}>
                <ChartComponent data={convertData(chart, type)} type={type} />
            </div>

            <div className={styles.types}>
                <button>Prices</button>
                <button>Market Caps</button>
                <button>Total Volumes</button>
            </div>

            <div className={styles.details}>
                <div>
                    <p>Prices:</p>
                    <span>{sign}{chart.coin.current_price}</span>
                </div>
                <div>
                    <p>ATH:</p>
                    <span>{sign}{chart.coin.ath}</span>
                </div>
                <div>
                    <p>Market Cap:</p>
                    <span>{sign}{chart.coin.market_cap}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

Chart.propTypes = {
  chart: PropTypes.shape({
    coin: PropTypes.shape({
      current_price: PropTypes.any,
      image: PropTypes.any,
      name: PropTypes.any,
      ath: PropTypes.any,
      market_cap:PropTypes.any
    })
  }),
  setChart: PropTypes.func,
  sign: PropTypes.any
}

export default Chart

const ChartComponent = ({data, type}) => {
    return(
        <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={400}
                        height={400}
                        data={data}
                    >
                        <Line type="monotone" dataKey={type} stroke="#BACD92" strokeWidth="2px" />
                        <CartesianGrid stroke="#404042"/>
                        <YAxis dataKey={type} domain={["auto","auto"]} />
                        <XAxis dataKey="date" hide />
                        <Legend />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
    );
}

ChartComponent.propTypes = {
  data: PropTypes.any,
  type: PropTypes.any
}
