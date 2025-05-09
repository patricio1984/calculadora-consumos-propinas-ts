import { useMemo } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import type { OrderItem, OrderPDFData } from "../types";
import { formatCurrency } from "../helpers";
import OrderPDF from "./OrderPDF";
import Swal from "sweetalert2";

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
  placeOrder: () => void;
};

const OrderTotals = ({ order, tip, placeOrder }: OrderTotalsProps) => {
  const subTotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );
  const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order]);
  const totalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order]);

  const handleDownload = async () => {
    if (!order || order.length === 0) {
      Swal.fire({
        title: "Orden vacía",
        text: "Debes agregar productos antes de guardar la orden.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const orderData: OrderPDFData = {
      items: order.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: formatCurrency(item.price),
        total: formatCurrency(item.quantity * item.price),
      })),
      tip: `${Math.round(tip * 100)}%`,
      total: {
        subtotal: formatCurrency(subTotalAmount),
        tip: formatCurrency(tipAmount),
        total: formatCurrency(totalAmount),
      },
    };

    const blob = await pdf(<OrderPDF orderData={orderData} />).toBlob();

    Swal.fire({
      title: "¡Orden lista!",
      text: "El PDF se descargará ahora.",
      icon: "success",
      confirmButtonText: "Descargar",
    }).then(() => {
      saveAs(blob, "orden.pdf");
      placeOrder();
    });
  };

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:</h2>

        <p>
          Subtotal a pagar:{" "}
          <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
        </p>

        <p>
          Propina:{" "}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>

        <p>
          Total a pagar:{" "}
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>

      <button
        className="w-full bg-green-900 hover:bg-green-800 p-3 uppercase text-white font-bold mt-10 cursor-pointer rounded-md"
        onClick={handleDownload}
      >
        Guardar Orden
      </button>
    </>
  );
};

export default OrderTotals;