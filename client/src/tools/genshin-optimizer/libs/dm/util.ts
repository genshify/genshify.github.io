import { existsSync, readFileSync } from 'fs'

export function readDMJSON(path: string) {
  const fullPath = `../GenshinData/${path}`
  if (!existsSync(fullPath)) throw `File not found :${fullPath}`
  return readFileSync(fullPath).toString()
}
