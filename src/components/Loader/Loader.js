import { Typography } from '@mui/material'
import styles from './styles.module.scss'

export default function Loader ({size}) {
   return (
         <Typography style={{display:'inline-block', width: size, height: size}} >
         <div className={styles.loader}>
            <svg className={styles.circular_loader} viewBox="25 25 50 50">
               <circle className={styles.loader_path} cx="50" cy="50" r="20"></circle>
            </svg>
            </div>
         </Typography>
   )
}