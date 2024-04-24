import PropTypes from "prop-types"
import styles from "./Chart.module.css"

import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { convertData } from "../../helpers/convertData";


function Chart({chart, setChart, sign}) {
    const [type, setType] =useState("prices")

    const typeHandler = (event) =>{
        if (event.target.tagName === "BUTTON"){
            const type = event.target.innerText.toLowerCase().replace(" ", "_");
            setType(type);
        }
    }
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

            <div className={styles.types} onClick={typeHandler}>
                <button className={type === "prices" ? styles.selected : null}>Prices</button>
                <button className={type === "market_caps" ? styles.selected : null}>Market Caps</button>
                <button className={type === "total_volumes" ? styles.selected : null}>Total Volumes</button>
            </div>

            <div className={styles.details}>
                <div>
                    <p>Prices:</p>
                    <span>{sign}{chart.coin.current_price.toLocaleString()}</span>
                </div>
                <div>
                    <p>ATH:</p>
                    <span>{sign}{chart.coin.ath.toLocaleString()}</span>
                </div>
                <div>
                    <p>Market Cap:</p>
                    <span>{sign}{chart.coin.market_cap.toLocaleString()}</span>
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
