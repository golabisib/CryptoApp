import PropTypes from "prop-types"
import { FidgetSpinner } from "react-loader-spinner"


import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"

function TableCoin({coins, isLoading}) {
    console.log(coins)
  return (
    <div>
        {isLoading ? <FidgetSpinner /> :
        <table>
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
                <TableRow coin={coin} key={coin.id} />
            ))}
        </tbody>
    </table>
        }
    </div>
  )
}

TableCoin.propTypes = {
  coins: PropTypes.array.isRequired,
  isLoading: PropTypes.any
}

export default TableCoin

//128

//This component used only in here so we define in parent component

const TableRow = ({
    coin: {
        name,
        image,
        symbol,
        total_volume,
        current_price,
        price_change_percentage_24h : price_change
        }
    }) => {
    return (
        <tr>
                        <td>
                            <div>
                                <img src={image} alt="Coin Image" />
                                <span>{symbol.toUpperCase()}</span>
                            </div>
                        </td>
                        <td>{name}</td>
                        <td>${current_price.toLocaleString()}</td>
                        <td>{price_change.toFixed(2)}%</td>
                        <td>{total_volume.toLocaleString()}</td>
                        <td><img src={price_change > 0 ? chartUp : chartDown} alt="Chart Condition" /></td>
                    </tr>
    )
}

TableRow.propTypes = {
  coin: PropTypes.shape({
    current_price: PropTypes.shape({
      toLocaleString: PropTypes.func
    }),
    image: PropTypes.image,
    name: PropTypes.string,
    price_change_percentage_24h: PropTypes.number,
    symbol: PropTypes.shape({
      toUpperCase: PropTypes.func
    }),
    total_volume: PropTypes.shape({
      toLocaleString: PropTypes.func
    })
  })
}
