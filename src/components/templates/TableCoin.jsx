import PropTypes from "prop-types"
import { FidgetSpinner } from "react-loader-spinner"


import { marketChart } from "../../services/cryptoApi"
import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"

import styles from "../modules/TableCoin.module.css"


function TableCoin({coins, isLoading, sign, setChart}) {
  return (
    <div className={styles.container}>
        {isLoading ? <FidgetSpinner
                        backgroundColor="#11CBD7"
                        ballColors={["#C6F1E7", "#F0FFF3", "#FA4659"]}/> :
        <table className={styles.table}>
        <thead>
            <tr>
                <th>Coin</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h</th>
                <th>Total volume</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {coins.map( (coin) => (
                <TableRow coin={coin} key={coin.id} sign={sign} setChart={setChart} />
            ))}
        </tbody>
    </table>
        }
    </div>
  )
}

TableCoin.propTypes = {
  coins: PropTypes.array.isRequired,
  isLoading: PropTypes.any,
  setChart: PropTypes.any,
  setSign: PropTypes.any,
  sign: PropTypes.any
}

export default TableCoin

//128

//This component used only in here so we define in parent component

const TableRow = ({coin,sign,setChart}) => {
    const  {
        id,
        name,
        image,
        symbol,
        total_volume,
        current_price,
        price_change_percentage_24h : price_change
        } = coin ;

        const showHandler = async () => {
            try {
                const res = await fetch(marketChart(id));
                const json = await res.json();
                setChart({...json, coin});
            } catch (error) {
                setChart(null);
            }
        }

    return (
        <tr>
                        <td>
                            <div className={styles.symbol} onClick={showHandler}>
                                <img src={image} alt="Coin Image" />
                                <span>{symbol.toUpperCase()}</span>
                            </div>
                        </td>
                        <td>{name}</td>
                        <td>{sign} {current_price.toLocaleString()}</td>
                        <td className={price_change > 0 ? styles.success : styles.error} >
                            {price_change.toFixed(2)}%
                        </td>
                        <td>{total_volume.toLocaleString()}</td>
                        <td><img src={price_change > 0 ? chartUp : chartDown} alt="Chart Condition" /></td>
                    </tr>
    )
}

TableRow.propTypes = {
    coin: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        total_volume: PropTypes.number.isRequired,
        current_price: PropTypes.number.isRequired,
        price_change_percentage_24h: PropTypes.number.isRequired,
    }).isRequired,
    sign: PropTypes.string.isRequired,
    setChart: PropTypes.func.isRequired,
};
