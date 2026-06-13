import express from 'express';

import { config } from './config.ts';
import { logger, pino } from './lib/logger.ts';
import { apiRouter } from './lib/router.ts';
import { handleError, handleNotFoundError } from './middleware/errors.ts';

const app = express();

app.use(pino);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter);

app.use(handleNotFoundError);
app.use(handleError);

const { PORT } = config;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
