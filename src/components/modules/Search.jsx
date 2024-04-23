import PropTypes from "prop-types"
import { useEffect } from "react";
import { useState } from "react";

import { FidgetSpinner } from "react-loader-spinner";

import { searchCoin } from "../../services/cryptoApi";

import styles from "./search.module.css"

function Search({ currency, setCurrency, setSign}) {
    const [text, setText] = useState("");
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const signHandler = (event) => {
        setCurrency(event.target.value);
        if (event.target.value == "aed") {setSign("د.إ")}
        if (event.target.value == "cny") {setSign("¥")}
        if (event.target.value == "jpy") {setSign("¥")}
        if (event.target.value == "kwd") {setSign("د.ک")}
        if (event.target.value == "rub") {setSign("₽")}
        if (event.target.value == "sar") {setSign("ريال")}
        if (event.target.value == "krw") {setSign("₩")}
        if (event.target.value == "gbp") {setSign("£")}
        if (event.target.value == "cad") {setSign("$")}
        if (event.target.value == "aud") {setSign("$")}
    }

    useEffect( () =>{
        const controller = new AbortController();

        setCoins([])
        if (!text) {
            setIsLoading(false);
            return
        }
        const search = async () => {
            try {
                const res = await fetch(searchCoin(text), {signal: controller.signal});
                const json = await res.json();
                
                if (json.coins){
                    setCoins(json.coins);
                    setIsLoading(false);
                }else{
                    alert(json.status.error_message)
                }
            }catch (error) {
                if (error.name !== "AbortError"){
                    alert(error.message);
                }
            }
        };

        setIsLoading(true)
        search();
        return () => controller.abort();
    },[text])

  return (
    <div className={styles.searchBox}>
        <input
            type="text"
            placeholder="Search"
            value={text}
            onChange={(event => setText(event.target.value))}/>
        <select
            onChange={signHandler}
            value={currency}
        >
            <option value="usd">USD (United States of America)</option>
            <option value="aed">AED (United Arab Emirates)</option>
            <option value="cny">CNY (China)</option>
            <option value="jpy">JPY (Japan)</option>
            <option value="kwd">KWD (Kuwait)</option>
            <option value="rub">RUB (Russia)</option>
            <option value="sar">SAR (Saudi Arabia)</option>
            <option value="krw">KRW (South Korea)</option>
            <option value="gbp">GBP (United Kingdom)</option>
            <option value="cad">CAD (Canada)</option>
            <option value="aud">AUD (Australia)</option>
        </select>
        {(!!coins.length || isLoading) && (
            <div className={styles.searchResult}>
            {isLoading ? <FidgetSpinner
                            width="50px"
                            height="50px"
                            backgroundColor="#11CBD7"
                            ballColors={["#C6F1E7", "#F0FFF3", "#FA4659"]} /> : null}
            <ul>
                {coins.map(coin => (
                    <li key={coin.id}>
                        <img src={coin.thumb} alt={coin.name} />
                        <p>{coin.name}</p>
                    </li>
                ))}
            </ul>
        </div>
        )}
    </div>
  )
}

Search.propTypes = {
  currency: PropTypes.any,
  setCurrency: PropTypes.func,
  setSign: PropTypes.func
}

export default Search
