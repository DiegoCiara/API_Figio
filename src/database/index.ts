import { createConnection } from 'typeorm';
import config from '../../ormconfig';
import mocks from '@utils/mocks';

async function connect() {
  await createConnection(config);

  await mocks();
}

if (process.env.NODE_ENV !== 'test') {
  connect();
}
