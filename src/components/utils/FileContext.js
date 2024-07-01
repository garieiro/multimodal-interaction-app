// FileContext.js
import React, { createContext, useContext, useState } from 'react'

const FileContext = createContext()

export const useFileContext = () => useContext(FileContext)

export const FileProvider = ({ children }) => {
  const [fileChanged, setFileChanged] = useState(false)

  const handleFileChange = () => {
    setFileChanged((prevState) => !prevState) // Toggle state to force re-render
  }

  return (
    <FileContext.Provider value={{ fileChanged, handleFileChange }}>
      {children}
    </FileContext.Provider>
  )
}

export default FileContext
