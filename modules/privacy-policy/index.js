import React, { useState } from 'react'
import RootStackNav from '../../navigation/RootStackNav'
import AppContext from '../../store/Context'

function AppMenu () {
  const [user, setUser] = useState([])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <RootStackNav />
    </AppContext.Provider>
  )
}

export default {
  title: "AppMenu",
  navigator: AppMenu
}
