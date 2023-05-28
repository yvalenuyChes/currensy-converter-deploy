import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import classes from './ExchangeRates.module.scss'




export default function ExchangeRates() {

   const [result, setResult] = useState(false)

   useEffect(() => {
      axios({
         method:'get',
         url:
         navigator.language === ('ru' || 'ru-RU')
         ?
         `https://api.apilayer.com/exchangerates_data/latest?symbols=&base=rub`

         : `https://api.apilayer.com/exchangerates_data/latest?symbols=&base=usd`,
         headers:{
            apikey:'JrIzAJG2OcFMqWRjPDn1SfsxDEgtKcIU'
         }
      })
      .then(data => setResult(data.data.rates))
      
      .catch(err => console.log(err))
   }, [])


   return (
      <div className={classes.container}>
         <h1 className={classes.title}>{navigator.language === ('ru' || 'ru-RU') ? 'Курс рубля' : 'Dollar rate'}</h1>

         {
            result
            ?
            navigator.language === ('ru' || 'ru-RU')
               ?
               <ul className={classes.rates__list}>
                  {
                  Object.entries(result).map((item, key) =>
                     <li key={key} className={classes.rates__list__item}>
                        Валюта: <span>{item[0]}</span>, рублей за валюту:<span>{item[1]}</span> руб
                     </li>
                  )}
               </ul>
               :
               <ul className={classes.rates__list}>
                  {
                  Object.entries(result).map(item =>
                     <li key={item[0]} className={classes.rates__list__item}>
                        Valute: <span>{item[0]}</span>, Rate:<span>{item[1].toFixed(3)}</span> for 1 euro
                     </li>
                  )}
               </ul>
            :
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', paddingTop:'40px'}} >
               <Loader
                  size={'50px'}
               />
            </div>
          
         }
         <div className={classes.rates__link}>
            <NavLink to='/'>{navigator.language === ('ru' || 'ru-RU') ? 'Конвертер' : 'Converter'}</NavLink>
         </div>
      </div>
   )
}