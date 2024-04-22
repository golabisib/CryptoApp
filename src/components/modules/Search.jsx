
import PropTypes from "prop-types"
function Search({ currency, setCurrency, setSign}) {

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

  return (
    <div>
        <input type="text" />
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
    </div>
  )
}

Search.propTypes = {
  currency: PropTypes.any,
  setCurrency: PropTypes.func,
  setSign: PropTypes.func
}

export default Search
