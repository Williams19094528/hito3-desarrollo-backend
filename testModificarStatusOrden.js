const { modificarStatusOrden } = require("./Models/consultas");

const pedido_id = 1;
const status = "En camino";

modificarStatusOrden(pedido_id, status)
  .then((result) => {
    console.log("Estado del pedido modificado:", result);
  })
  .catch((err) => {
    console.error("Error al modificar estado del pedido:", err);
  });
