const { createOrder } = require("./Models/consultas");

const pedido = {
  usuario_id: 1,
  total: 300.0,
  tipo_de_pago: "Efectivo",
  delivery: true,
  productos: [
    { producto_id: 1, cantidad: 2 },
    { producto_id: 2, cantidad: 1 },
  ],
};

createOrder(pedido)
  .then((result) => {
    console.log("Pedido creado:", result);
  })
  .catch((err) => {
    console.error("Error al crear pedido:", err);
  });
