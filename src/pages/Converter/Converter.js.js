import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TextField } from '@mui/material'
import axios from 'axios'
import Button from '../../components/Button/Button'
import classes from './Converter.module.scss'
import Loader from '../../components/Loader/Loader'


export default function MainPage() {

   const [value, setValue] = useState(1)
   const [loading, setLoading] = useState(false)

   function valueHandler(event) {
      setValue(event.target.value)
   }

   const [result, setResult] = useState('')


   const [firstSelectValue, setFirstSelectValue] = useState('')
   const [secondSelectValue, setSecondSelectValue] = useState('')

   const handleChangeFirstSelector = event => {
      setFirstSelectValue(event.target.value);
   }

   const handleChangeSecondSelector = event => {
      setSecondSelectValue(event.target.value);
   }

   const getData = () => {
      setLoading(true)
      axios({
         method:'get',
         url:`https://api.apilayer.com/exchangerates_data/convert?to=${secondSelectValue}&from=${firstSelectValue}&amount=${value}`,
         headers:{
            apikey:'JrIzAJG2OcFMqWRjPDn1SfsxDEgtKcIU'
         }
      })
      .then(data => setResult(data.data.result))
      .finally(() => setLoading(false))
   }

   useEffect(() => {
      if (navigator.language !== ('ru' || 'ru-RU')) {
         setFirstSelectValue('eur')
         setSecondSelectValue('eur')
      } else {
         setFirstSelectValue('rub')
         setSecondSelectValue('rub')
      }
   }, [])


   return (
      <div>
         <div className={classes.container}>
            <h2 className={classes.title}>{navigator.language === ('ru' || 'ru-RU') ? 'Конвертер валют' : 'Converter '}</h2>
            <div className={classes.coverter__input}>
               <TextField value={value} onChange={valueHandler} type='number' />
            </div>
            <div className={classes.converter__selects}>
               <FormControl >
                  <InputLabel id="demo-simple-select-label">{navigator.language === ('ru' || 'ru-RU') ? 'Валюта' : 'Valute '}</InputLabel>
                  <Select
                     value={firstSelectValue}
                     label="Валюта"
                     onChange={handleChangeFirstSelector}
                  >
                     <MenuItem value='rub'>Rub</MenuItem>
                     <MenuItem value='usd'>Usd</MenuItem>
                     <MenuItem value='eur'>Eur</MenuItem>
                  </Select>
               </FormControl>
               <FormControl >
                  <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                  <Select
                     value={secondSelectValue}
                     label="Валюта"
                     onChange={handleChangeSecondSelector}
                  >
                     <MenuItem value='rub'>Rub</MenuItem>
                     <MenuItem value='usd'>Usd</MenuItem>
                     <MenuItem value='eur'>Eur</MenuItem>
                  </Select>
               </FormControl>
            </div>
            <div className={classes.converter__button}>
               <Button text={navigator.language === ('ru' || 'ru-RU') ? 'Получить результат' : 'Get result'} onClick={getData} />
            </div>
            <div className={classes.result}>
               <p>{navigator.language === ('ru' || 'ru-RU') ? 'Результат: ' : 'Result: '}{
               loading 
               ? <Loader
                  size={'20px'}
               />
               : result
               }</p>
            </div>
            <div className={classes.converter__link}>
               <NavLink to='exchange_rates'>{navigator.language === ('ru' || 'ru-RU') ? 'Курс рубля' : 'Exchange rates'}</NavLink>
            </div>
         </div>
      </div>
   )
}