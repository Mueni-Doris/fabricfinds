"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:3001/cart", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "❌ Failed to fetch cart");
        return;
      }
      setItems(data.cart);
    } catch (err) {
      toast.error("Something went wrong fetching the cart");
    }
  };

  useEffect(() => {
    const checkSessionAndFetch = async () => {
      try {
        const res = await fetch("http://localhost/backend/check_session.php", {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.loggedIn) {
          toast.error("Please login first 🙅‍♀️");
          router.push("/login");
        } else {
          await fetchCart();
        }
      } catch (err) {
        toast.error("Session check failed");
      } finally {
        setLoading(false);
      }
    };

    checkSessionAndFetch();
  }, [router]);

  const handleSaveEdit = async (item: any) => {
    try {
      const res = await fetch("http://localhost:3001/cart/update/" + item.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity: editedQuantity }),
      });
  
      const result = await res.json();
      if (result.success) {
        toast.success("Cart updated");
        setEditingItemId(null);
        fetchCart();
      } else {
        toast.error(result.message || "❌ Failed to update");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };
  

  const handleDelete = async (item: any) => {
    if (!confirm(`Remove ${item.description}?`)) return;

    try {
      const res = await fetch("http://localhost:3001/cart/remove/" + item.id, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Item removed");
        fetchCart();
      } else {
        toast.error(result.message || "❌ Failed to delete item.");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const subtotal = items.reduce((total, item) => {
    const unit = Number(item.price) / Number(item.quantity);
    return total + unit * Number(item.quantity);
  }, 0);

  if (loading) {
    return (
      <div className="p-6 text-4xl text-yellow-300">
        Bear with me love 😅...
        <div className="mt-4 h-10 w-10 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center mt-10 animate-bounce text-gray-600 text-lg">
            Your cart is empty 💔 Go get yourself something
          </div>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {items.map((item: any) => {
                const unitPrice = Number(item.price) / Number(item.quantity);
                const totalPrice = unitPrice * Number(item.quantity);

                return (
                  <div
                    key={item.id}
                    className="border p-4 rounded-lg shadow-sm bg-white"
                  >
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-full h-40 object-cover rounded"
                    />
                    <h2 className="mt-2 font-semibold">{item.description}</h2>
                    <p>Unit Price: ${unitPrice.toFixed(2)}</p>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>

                    {editingItemId === item.id ? (
                      <div className="flex items-center gap-2 mt-2">
<input
  type="number"
  min="1"
  className="border px-2 py-1 w-16 rounded"
  value={isNaN(editedQuantity) ? 1 : editedQuantity}
  onChange={(e) => {
    const val = parseInt(e.target.value);
    setEditedQuantity(isNaN(val) ? 1 : val); // fallback to 1
  }}
/>

                        <button
                          onClick={() => handleSaveEdit(item)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItemId(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <p>Quantity: {item.quantity}</p>
                        <button
                          onClick={() => {
                            setEditingItemId(item.id);
                            setEditedQuantity(item.quantity);
                          }}
                          className="mt-2 bg-blue-200 text-black py-1 px-4 rounded hover:bg-blue-300"
                        >
                          Edit
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDelete(item)}
                      className="mt-2 bg-red-200 text-black py-1 px-4 rounded hover:bg-red-300"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-right">
              <p className="text-lg font-semibold mb-2">
                Subtotal: <span className="text-black">${subtotal.toFixed(2)}</span>
              </p>
              <button
                onClick={() => router.push("/checkout")}
                className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 text-sm"
              >
                Go to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
