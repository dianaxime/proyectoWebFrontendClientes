import * as types from '../types/ofertas';

export const startAddingOferta = (descripcionOferta, descuentoOferta, venceOferta, idProducto) => ({
    type: types.OFERTA_ADD_STARTED,
    payload: {
        descripcionOferta,
        descuentoOferta,
        venceOferta,
        idProducto,
    },
});

export const completeAddingOferta = (oldId, oferta) => ({
    type: types.OFERTA_ADD_COMPLETED,
    payload: {
      oldId,
      oferta,
    },
});

export const failAddingOferta = (oldId, error) => ({
    type: types.OFERTA_ADD_FAILED,
    payload: {
      oldId,
      error,
    },
});
