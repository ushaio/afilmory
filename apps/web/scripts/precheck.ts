import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { $ } from 'execa'

export const precheck = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const workdir = path.resolve(__dirname, '../../..')

  const manifestPath = path.resolve(workdir, 'apps/web/src/data/photos-manifest.json')
  if (fs.existsSync(manifestPath)) {
    return
  }

  await $({
    cwd: workdir,
    stdio: 'inherit',
  })`pnpm --filter @afilmory/builder cli`
}
