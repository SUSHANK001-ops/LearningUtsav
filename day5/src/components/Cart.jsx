import React from 'react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, totalPrice, updateQty, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return <div className="p-8 max-w-4xl mx-auto">Your cart is empty.</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 border rounded-xl p-4 bg-white shadow">
            <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded" />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Qty:</label>
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={e => updateQty(item.id, Number(e.target.value))}
                className="w-16 border rounded px-2 py-1"
              />
            </div>
            <p className="font-medium w-24 text-rose-600">${(item.price * item.qty).toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-rose-600 hover:underline"
            >Remove</button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center border-t pt-4">
        <button onClick={clearCart} className="text-sm text-gray-600 hover:underline">Clear Cart</button>
        <div className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</div>
      </div>
      <button className="bg-rose-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-700 transition">Checkout</button>
    </div>
  )
}

export default Cart