// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { ClientAccounts } from './collections/ClientAccounts'
import { ClientTransactions } from './collections/ClientTransactions'
import { VendorTransactions } from './collections/VendorTransactions'
import { Expense } from './collections/Expense'
import { Vendor } from './collections/Vendor'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import dotenv from 'dotenv'
// ✅ Load the .env file from the project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
console.log('Loaded PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET)
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ClientAccounts, ClientTransactions, VendorTransactions, Expense, Vendor],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
