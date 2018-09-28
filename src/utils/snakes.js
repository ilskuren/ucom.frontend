import { snakeCase } from 'lodash';
import createHumps from 'lodash-humps/lib/createHumps';

export default createHumps(snakeCase);
