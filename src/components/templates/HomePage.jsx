import { useEffect, useState } from "react"
import TableCoin from "./TableCoin"

function HomePage() {
    const [coins, setCoins] = useState([]);

    useEffect( () => {
        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&x_cg_demo_api_key=CG-CwMqfWH5PZiNEFuY6Yxzyf5d"
        ).then( (res) => res.json())
         .then( (json) => setCoins(json))
    }, []);

  return (
    <div>
        <h1>homepage</h1>
        <TableCoin coins={coins} />
    </div>
  )
}

export default HomePage
