import express from 'express';

import { config } from './config/index.ts';
import { logger, pino } from './lib/logger.ts';
import { apiRouter } from './lib/router.ts';
import { handleErr, handleNotFoundErr } from './middleware/errs.ts';

const app = express();

app.use(pino);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter);

app.use(handleNotFoundErr);
app.use(handleErr);

const { PORT } = config;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
