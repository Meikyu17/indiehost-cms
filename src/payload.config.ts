import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// URL publique du serveur (définie dans .env)
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Liste des domaines autorisés pour CORS et CSRF
const whitelist = [
  'http://localhost:5173', // Vue.js (Vite) en développement
  'http://localhost:3000', // Payload en local
  'http://localhost:8080', // Vue.js (alternative)
  'http://172.17.0.1:3000', // n8n pour communiquer avec Payload
  process.env.NEXT_PUBLIC_SERVER_URL, // URL publique du CMS
  process.env.FRONTEND_URL, // URL de votre frontend
].filter((val): val is string => Boolean(val)) // Type guard pour garantir que ce sont des strings

export default buildConfig({
  serverURL: serverURL,
  cors: whitelist,
  csrf: whitelist,

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Articles, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
