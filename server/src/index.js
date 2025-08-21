
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './utils/env.js';
import { CONFIG } from './config/default.js';
import { brandMiddleware } from './middlewares/brand.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { searchRouter } from './routes/search.route.js';
import { detailsRouter } from './routes/details.route.js';


const app = express();


app.use(express.json({ limit: '1mb' }));
app.use(brandMiddleware);


if (ENV.ALLOWED_ORIGINS.length > 0) {
app.use(cors({ origin: ENV.ALLOWED_ORIGINS, credentials: false }));
} else {
app.use(cors());
}


app.use('/api', searchRouter);
app.use('/api', detailsRouter);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDist = path.join(__dirname, '../web/dist');



app.use(express.static(webDist));
app.get('*', (_req, res) => {
res.sendFile(path.join(webDist, 'index.html'));
});


app.use(errorMiddleware);


app.listen(ENV.PORT, () => {
console.log(`DewOps server listening on :${ENV.PORT}`);
console.log('Config:', CONFIG);
});