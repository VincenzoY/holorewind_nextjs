'use client'

import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T | undefined): T | undefined {
  try { 
    const saved = window && localStorage.getItem(key)
    const initial = saved && JSON.parse(saved)
    return initial || defaultValue
  } catch (err) {}
  
  return defaultValue
}

export const useLocalStorage = <T>(key: string, defaultValue: T | undefined = undefined): [T | undefined, (arg: T | undefined) => void] => {
  const [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}