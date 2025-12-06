import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),'.env')});

const config = {
    PORT: process.env.PORT,
    CONNECTION_STRING: process.env.DATABASE_URL,
}

export default config;