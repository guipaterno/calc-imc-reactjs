import styles from "./App.module.css";
import poweredImage from  "./assets/powered.png";
import {useState} from "react"
import {GridItem} from "./components/GridItem"
import leftArrowImage from "./assets/leftarrow.png"

import { levels, calculateImc, Level } from "./helpers/imc";

const App = ()=>{

  const [heightField, setHeigthField] = useState<number>(0);
  const [weightField, setWeigthField] = useState<number>(0);
  const [toShow,setToShow] = useState<Level | null>()


  const handleCalculateButton = () =>{
    if  (heightField && weightField){
  setToShow(calculateImc(heightField,weightField));

    }else{
      alert("Digite todos os campos!")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeigthField(0);
    setWeigthField(0);
  }


  return(
    <div className={styles.main}>

      <header>

        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>

      </header>
    <div className={styles.container}>
      <div className={styles.leftSide}>

      <h1>Calcule o seu IMC</h1>
      <p>O índice de massa corporal é uma medida internacional
         usada para calcular se uma pessoa está no peso ideal.</p>

      <input
        type="number"
        placeholder="Digite a sua altura. Ex:1.50 (em metros)" 
        value={heightField > 0 ? heightField : ""}
        onChange={e => setHeigthField(parseFloat(e.target.value))}
        disabled={toShow ? true : false}
      />

      <input
        type="number"
        placeholder="Digite o seu peso. Ex:75.50 (em Kg)" 
        value={weightField > 0 ? weightField : ""}
        onChange={e => setWeigthField(parseFloat(e.target.value))}
        disabled={toShow ? true : false}
      />

      <button onClick={handleCalculateButton} disabled={toShow ? true : false}
      >Calcular</button>

      </div>

        <div className={styles.rightSide}>
          {!toShow &&
        <div className={styles.grid}>
          {levels.map((item, key)=>(
            <GridItem key={key} item={item}/>
          ))}
        </div>
        }{toShow && 
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
            <img src={leftArrowImage} alt="" width={25} />
            </div>
            <GridItem item={toShow}/>
          </div>
        }

        </div>
      </div>
    </div>
  )
}

export default App