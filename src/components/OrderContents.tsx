import { formatCurrency } from "../helpers"
import type { MenuItemType, OrderItem } from "../types"

type OrderContentsProps = {
    order: OrderItem[],
    removeItem: (id: MenuItemType["id"]) => void,
}

const OrderContents = ({order, removeItem} : OrderContentsProps) => {
  return (
    <div>
        <h2 className="font-black text-4xl">Consumo</h2>

        <div className="space-y-3 mt-3">
            {
                order.map(item => (
                    <div 
                        key={item.id}
                        className="flex justify-between items-center border-t border-gray-200 p-3 last-of-type:border-b mb-0 hover:bg-green-100"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-2xl">{item.icon}</div>
                            <div>
                                <p className="text-lg font-semibold">
                                    {item.name} - {formatCurrency(item.price)}
                                </p>
                                <p>
                                    Cantidad: <span className="font-black">{item.quantity}</span> - Costo: <span className="font-black">{formatCurrency(item.price * item.quantity)}</span>
                                </p>
                            </div>
                        </div>

                        <button
                            aria-label={`Eliminar consumo de ${item.name}`}
                            className="bg-red-600 h-8 w-8 rounded-full text-white font-black cursor-pointer"
                            onClick={() => removeItem(item.id)}
                        >
                            X
                        </button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default OrderContents
