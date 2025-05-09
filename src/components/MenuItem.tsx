import type { MenuItemType } from "../types"

type MenuItemProps = {
    item: MenuItemType,
    addItem: (item: MenuItemType) => void,
}

const MenuItem = ({item, addItem}: MenuItemProps) => {
  return (
    <button
        className="cursor-pointer border-2 border-green-400 p-3 flex justify-between w-full items-center hover:bg-green-100 hover:shadow-md rounded-md"
        onClick={() => addItem(item)}
    >
        <p className="flex items-center gap-2">
          {item.icon} {item.name}
        </p>
        <p className="font-black">${item.price}</p>
    </button>

  )
}

export default MenuItem