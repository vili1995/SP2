import React, { useState, useEffect } from 'react'

const Time = ({ className }) => {
  const [time, setTime] = useState(null)

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleString())
    }, 1000)
  }, [])

  return <p className={className}>{time}</p>
}

export default Time
