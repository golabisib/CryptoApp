import { useEffect, useState } from "react"
import { getCoinList } from "../../services/cryptoApi";

import TableCoin from "./TableCoin"
import Search from "../modules/Search";

import Pagination from "../modules/Pagination";

function HomePage() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("USD");
    const [sign, setSign] = useState("$")



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
        <TableCoin coins={coins} isLoading={isLoading} sign={sign} />
        <Pagination page={page} setPage={setPage} />
    </div>
  )
}

export default HomePage
