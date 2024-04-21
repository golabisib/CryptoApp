import { useEffect, useState } from "react"
import TableCoin from "./TableCoin"
import { getCoinList } from "../../services/cryptoApi";

function HomePage() {
    const [coins, setCoins] = useState([]);

    useEffect( () => {
        const getData = async () => {
            const res = await fetch(getCoinList());
            const json = await res.json();
            setCoins(json);
        };

        getData();
    }, []);

  return (
    <div>
        <h1>homepage</h1>
        <TableCoin coins={coins} />
    </div>
  )
}

export default HomePage
