import { createRequire } from 'node:module'

export const require = createRequire(import.meta.url)

// Function to read JSON
export const readJSON = (path) => require(path)