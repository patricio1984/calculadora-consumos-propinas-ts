import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"

function App() {
  const { order, tip, setTip, addItem, removeItem, placeOrder } = useOrder()

  return (
    <>
      <header className="bg-green-900 py-5 @max-6xl: px-4">
        <h1 className="text-center font-bold text-2xl text-white">Calculadora de Propinas y consumos</h1>
      </header>

      <main className="max-w-7xl mx-auto py-8 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menu</h2>

          <div className="mt-3 grid md:grid-cols-2 gap-2">
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                addItem={addItem}
              />
            ))}
          </div>
        </div>
        <div className="p-5 space-y-5">
          {order.length === 0 ? <p className="text-center flex items-center justify-center h-full font-bold text-2xl text-red-600">La orden está vacía</p> :
            <>
              <OrderContents
                order={order}
                removeItem={removeItem}
              />

              <TipPercentageForm
                setTip={setTip}
                tip={tip}
              />

              <OrderTotals
                order={order}
                tip={tip}
                placeOrder={placeOrder}
              />
            </>
          }
        </div>
      </main>
    </>
  )
}

export default App
