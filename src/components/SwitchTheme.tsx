import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
const SwitchTheme = () => {
  //we store the theme in localStorage to preserve the state on next visit with an initial theme of dark.
  const [theme, setTheme] = useState('light')

  //toggles the theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  //modify data-theme attribute on document.body when theme changes
  useEffect(() => {
    const body = document.body
    body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <button className='btn btn-circle' onClick={toggleTheme}>
      {theme === 'dark' ? <FiMoon className='w-5 h-5' /> : <FiSun className='w-5 h-5' />}
    </button>
  )
}

export default SwitchTheme
