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

export default buildConfig({
  serverURL: serverURL,

  // Configuration CORS pour permettre les requêtes depuis votre frontend
  cors: [
    'http://localhost:5173', // Vue.js (Vite) en développement
    'http://localhost:3000', // Payload en local
    'http://localhost:8080', // Vue.js (alternative)
    process.env.FRONTEND_URL, // URL de votre frontend (depuis .env)
  ].filter(Boolean), // Retire les valeurs undefined

  // Configuration CSRF pour la sécurité
  csrf: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    process.env.FRONTEND_URL,
  ].filter(Boolean),

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
