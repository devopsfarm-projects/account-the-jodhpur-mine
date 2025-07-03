import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const envPath = path.resolve(process.cwd(), '.env')

// Debug: Show file exists
console.log('Looking for .env at:', envPath)
console.log('File exists:', fs.existsSync(envPath))

dotenv.config({ path: envPath })

// Debug: Show full parsed env
console.log('Full ENV:', process.env)
console.log('Test PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET)
console.log('Test DATABASE_URI:', process.env.DATABASE_URI)
