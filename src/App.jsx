import { useState } from 'react'
import { WeatherForm } from './components/WeatherForm'

export const App = () => {

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-indigo-400 bg-gradient-to-b from-indigo-500 to-cyan-200 ">
      <div className='shadow-xl rounded-2xl'>
        <WeatherForm />
      </div>
    </div>
  )
}
