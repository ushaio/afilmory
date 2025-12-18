import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { merge } from 'es-toolkit/compat'

function loadUserConfig(): Record<string, unknown> {
  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const configPath = path.resolve(dirname, 'config.json')
  const examplePath = path.resolve(dirname, 'config.example.json')

  const resolvedPath = fs.existsSync(configPath) ? configPath : fs.existsSync(examplePath) ? examplePath : null
  if (!resolvedPath) return {}

  try {
    return JSON.parse(fs.readFileSync(resolvedPath, 'utf-8')) as Record<string, unknown>
  } catch {
    return {}
  }
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  accentColor: string
  author: Author
  social?: Social
  feed?: Feed
  map?: MapConfig
  mapStyle?: string
  mapProjection?: 'globe' | 'mercator'
}

/**
 * Map configuration - can be either:
 * - A string for a single provider: 'maplibre'
 * - An array for multiple providers in priority order: ['maplibre']
 */
type MapConfig = 'maplibre'[]

interface Feed {
  folo?: {
    challenge?: {
      feedId: string
      userId: string
    }
  }
}
interface Author {
  name: string
  url: string
  avatar?: string
}
interface Social {
  twitter?: string
  github?: string
}

const defaultConfig: SiteConfig = {
  name: 'New Afilmory',
  title: 'New Afilmory',
  description: 'A modern photo gallery website.',
  url: 'https://afilmory.art',
  accentColor: '#007bff',
  author: {
    name: 'Afilmory',
    url: 'https://afilmory.art/',
    avatar: 'https://cdn.jsdelivr.net/gh/Afilmory/Afilmory@main/logo.jpg',
  },
}
export const siteConfig: SiteConfig = merge(defaultConfig, loadUserConfig()) as any

export default siteConfig
