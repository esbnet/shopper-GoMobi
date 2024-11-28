import 'dotenv/config'

import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'

// DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"

function genarateDatabaseURL(Schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Plese provide DATABASE_URL in your environment variables.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', Schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    const schema = randomUUID()
    const databaseURL = genarateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
