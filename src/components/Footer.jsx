import React from 'react'

const Footer = () => {
  return (
    <div >
        {/* Provides link to portfolio website */}
        <div className='flex justify-center text-center object-bottom p-1'>
            <a href='https://www.michaelkinnear.ca/' target="_blank">Created by Michael Kinnear</a>
        </div>
        {/* Provides link to Openweathermap website */}
        <div className='flex justify-center text-center object-bottom p-1'>
            <a href='https://openweathermap.org/' target="_blank">Powered by OpenWeather</a>
        </div>
    </div>
  )
}

export default Footer