import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  
  let [amount, setAmount] = useState(0);
  let [convertedAMount, setConvertedAMount] = useState(0);
  let [from, setFrom] = useState("usd");
  let [to, setTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo);

  const swap = () =>{
    setFrom(to);
    setTo(from);
    setConvertedAMount(amount);
    setAmount(convertedAMount);
  }

  const convert = () => {
    setConvertedAMount((amount * currencyInfo[to]).toFixed(2));
  }

  return (
    <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://wallpapercave.com/wp/wp2300367.jpg')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <h1 className='text-center py-4 pb-7 text-gray-900 text-4xl font-semibold ' style={{fontFamily: 'Dancing Script'}}>Currency Convertor</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onAmountChange={(amount) => setAmount(amount)}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAMount}
                                currencyOptions={options}
                                amountDisable
                                onCurrencyChange={(currency)=> {
                                  setTo(currency);
                                }}
                                selectCurrency={to}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default App
