import React from 'react'
import FoodCard from './FoodCard'

type Props = {}

function FoodPackages({}: Props) {
  return (
    <div className='bg-cover bg-center w-full px-24 py-8 ' style={{backgroundImage: 'url("/pasta.jpg")',backdropFilter: 'blur(800px)'}}>
        <div className="flex justify-between px-10 mb-20">
        <h3 className='text-white font-bold text-xl'>SEASONAL OFFERS</h3>
        <p className='text-white font-bold text-xl'>SEE MORE </p>
      </div>
      <div className="flex justify-between px-20">
      <FoodCard size='sm'/>
      <FoodCard size='sm' />
      <FoodCard size='sm' />
        </div>
    </div>
  )
}

export default FoodPackages