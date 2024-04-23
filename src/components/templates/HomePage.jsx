import { useEffect, useState } from "react"
import { getCoinList } from "../../services/cryptoApi";

import TableCoin from "./TableCoin"
import Search from "../modules/Search";
import Chart from "../modules/Chart";
import Pagination from "../modules/Pagination";


function HomePage() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("USD");
    const [sign, setSign] = useState("$");
    const [chart, setChart] = useState(null);



    useEffect( () => {
        setIsLoading(true);
        const getData = async () => {
            try {
                const res = await fetch(getCoinList(page, currency));
                const json = await res.json();
                setCoins(json);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, [page, currency]);

  return (
    <div>
        <Search currency={currency} setCurrency={setCurrency} setSign={setSign} />
        <TableCoin coins={coins} isLoading={isLoading} sign={sign} setChart={setChart} />
        <Pagination page={page} setPage={setPage} />
        {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  )
}

export default HomePage
