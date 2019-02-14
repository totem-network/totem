import { buildSchema } from 'graphql';
import types from './types';

export default buildSchema(types);
