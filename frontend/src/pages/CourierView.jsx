import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const CourierView = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState("pending");

  const { id } = useParams();
  const socket = io('http://localhost:3000', {
    query: {
      typeClient: 'courier',
      id: id
    }
  });

  useEffect(() => {
    // Lógica para obtener pedidos asignados al repartidor desde una API o base de datos
    const fetchedOrders = []; // Obtener los pedidos asignados desde la API o base de datos
    setOrders(fetchedOrders);
  }, []);

  const acceptOrder = (order) => {
    setSelectedOrder(order);
    setDeliveryStatus('accepted');
    // Lógica para notificar al restaurante y actualizar el estado del pedido 
    // También podrías emitir un evento al cliente para informarle sobre el estado de su pedido
  };

  const rejectOrder = () => {
    setSelectedOrder(null);
    setDeliveryStatus('rejected');
    // Lógica para manejar el rechazo del pedido
  };

  const completeDelivery = () => {
    setSelectedOrder(null);
    setDeliveryStatus('completed');
    // Lógica para notificar al cliente y actualizar el historial
  };

  return (
    <div>
      <h1>Courier View</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.restaurantName} - {order.items.join(", ")}
            <button onClick={() => acceptOrder(order)}>Aceptar</button>
            <button onClick={rejectOrder}>Rechazar</button>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div>
          <h2>Detalles del Pedido</h2>
          <p>Restaurante: {selectedOrder.restaurantName}</p>
          <p>Elementos del Pedido: {selectedOrder.items.join(", ")}</p>
          <button onClick={completeDelivery}>Marcar como entregado</button>
        </div>
      )}
    </div>
  );
};

export default CourierView;
