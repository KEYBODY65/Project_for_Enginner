import React, {useState} from 'react';
import './static/Dashboard.css';

export default function CreateTest(){
    const [Variants, setVariants] = useState([]);


    function addVariant(number_of_test){
        setVariants(prevVariants => [...prevVariants, number_of_test])
    }

    function showVariant(){
        const lastVariant = Variants.slice(-1);
        return <a href=''>{lastVariant}</a>;
    }

    function RandomNumber() {
        function generateRandomNumber() {
            const min = 10000000;
            const max = 99999999;
            const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
            addVariant(randomNumber);
        }
        generateRandomNumber()

        return null
    }
    return(
    <div className='container'>
        <h2 className='text-center mt-3'> Составление вариантов </h2>
        <hr class='my-4' />
        <div className="new_test mb-3">
        <div className="d-flex">
          <button className="btn btn-primary mt-2"  type="button">
            +
          </button>
          <h5>Создать</h5>
        </div>
        <div>
          <h4>Составленные варианты:</h4>
        </div>
      </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {showVariant()}
        </div>
    </div>


    );
}