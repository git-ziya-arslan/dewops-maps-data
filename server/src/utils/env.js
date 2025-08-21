import dotenv from 'dotenv';


dotenv.config();


function requireEnv(name) {
const v = process.env[name];
if (!v) throw new Error(`Missing required env: ${name}`);
return v;
}


export const ENV = {
PORT: parseInt(process.env.PORT || '8787', 10),
ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
GOOGLE_API_KEY: requireEnv('GOOGLE_API_KEY')
};
