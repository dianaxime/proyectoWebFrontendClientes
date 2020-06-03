import { schema } from 'normalizr';


export const comentarios = new schema.Entity(
  'valoraciones',
);
export const comentario = new schema.Array(comentarios);