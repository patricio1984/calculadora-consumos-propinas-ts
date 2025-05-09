import { useMemo } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void,
}

const OrderTotals = ({order, tip, placeOrder}: OrderTotalsProps) => {
  
  const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order])
  const totalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order])
  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina:</h2>

            <p>Subtotal a pagar: {""}
                <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
            </p>

            <p>Propina: {""}
                <span className="font-bold">{formatCurrency(tipAmount)}</span>
            </p>

            <p>Total a pagar: {""}
                <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </p>
        </div>

        <button 
            className="w-full bg-green-900 hover:bg-green-800 p-3 uppercase text-white font-bold mt-10 cursor-pointer rounded-md"
            onClick={placeOrder}
        >
            Guardar Orden
        </button>
    </>
  )
}

export default OrderTotals