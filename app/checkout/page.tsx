"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface CartItem {
  id: number;
  description: string;
  price: number;
  image: string;
  quantity: number;
  total_price: number;
}

interface User {
  full_name: string;
  email: string;
}

export default function CheckoutPage() {
  const [user, setUser] = useState<User>({ full_name: "", email: "" });
  const [items, setItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await fetch(
          "http://localhost/backend/checkout.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!data.success) {
          toast.error(data.message || "Failed to fetch checkout data");
          router.push("/cart");
          return;
        }
        setUser(data.user);
        setItems(data.items);
        
      } catch (err) {
        console.error(err);
        toast.error("Error loading checkout details");
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();}, [router]);

  const total = items.reduce((sum, item) => sum + item.total_price, 0);
  const totalAmount = total + 100;

  if (loading) return <p className="p-6 , text-4xl , text-yellow-300" >In a minute ...</p>;

  return (
    <div className="bg-yellow-50 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <form
          action="http://localhost/backend/process_payment.php"
          method="POST"
          className="space-y-4 bg-white p-6 rounded shadow"
        >
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={user.full_name}
              readOnly
              className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="font-semibold">Delivery Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="0700000000"
              className="w-full border p-2 rounded" />
          </div>

          <div className="flex items-center gap-2">
  <img
    src="pay.jpg"
    alt="Mpesa"
    className="h-6 w-auto"
  />
  <p className="font-semibold">Payment Method</p>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price (KES)</th>
                <th className="p-2">Item</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.total_price}</td>
                  <td className="p-2">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="h-16 object-cover rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 text-right font-bold">
            Total Amount: KES {totalAmount} <span className="text-sm">(incl. KES 100 shipping)</span>
          </p>

          <button
            type="submit"
            name="address"
            value={address}
            onClick={() => !address && toast.error("Please enter address")}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
}
