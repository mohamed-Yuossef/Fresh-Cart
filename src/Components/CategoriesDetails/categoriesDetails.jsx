import { useState } from 'react'
import Style from './CategoriesDetails.module.css'
import { useEffect } from 'react'

function CategoriesDetails() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting CategoriesDetails');
    } , [])
    return (
        <div>
            <h2>CategoriesDetails</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
        </div>
    )
}

export default CategoriesDetails
