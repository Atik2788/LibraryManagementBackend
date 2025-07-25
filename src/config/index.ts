import dotenv from 'dotenv';

dotenv.config()

export default {
    node_env: process.env.NODENODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL
}