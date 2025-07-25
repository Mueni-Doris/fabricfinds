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
  address:string;
  phonenumber: string;

}

export default function CheckoutPage() {
  const [user, setUser] = useState<User>({ full_name: "", email: "" , address:"", phonenumber: "" });
  const [items, setItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await fetch("http://localhost:3001/checkout", {
          method: "GET",
          credentials: "include",
        });
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
  
    fetchCheckout();
  }, [router]);
  
  const total = items.reduce((sum, item) => sum + item.total_price, 0);
  const totalAmount = total + 100;

  if (loading)
    return (
      <p className="p-10 text-3xl font-semibold text-yellow-600 text-center">
        Just a sec, .. 👑
      </p>
    );

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Final Touches 🛍️
        </h1>

        <form
          action="http://localhost/backend/process_payment.php"
          method="POST"
          className="bg-white shadow-2xl p-8 rounded-2xl space-y-6 border border-yellow-200"
        >
          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={user.full_name}
                readOnly
                className="mt-1 w-full border rounded-xl p-3 bg-gray-100 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="mt-1 w-full border rounded-xl p-3 bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          {/* Address + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                name="address"
                value={user.address}
                readOnly
                className="mt-1 w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input

type="tel"
name="phone"
value={phone || user.phonenumber}
onChange={(e) => setPhone(e.target.value)}
required
placeholder="0700000000"
className="mt-1 w-full border rounded-xl p-3"


              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-center gap-3">
            <img src="pay.jpg" alt="Mpesa" className="h-6 w-auto" />
            <p className="text-sm font-medium text-gray-800">
              Mpesa Payment (Pay on Delivery)
            </p>
          </div>

          {/* Cart Items */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mt-4 text-sm">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-2">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price (KES)</th>
                  <th className="p-2">Preview</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2 font-semibold text-green-700">
  {typeof item.total_price === 'number'
    ? item.total_price.toLocaleString()
    : '0.00'}
</td>

                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.description}
                        className="h-16 w-16 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="text-right text-xl font-bold mt-6 text-gray-800">
            Total: KES {totalAmount.toLocaleString()}{" "}
            <span className="text-sm text-gray-500">
              (Incl. KES 100 shipping)
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            name="address"
            value={address}
            onClick={() => !address && toast.error("Please enter address")}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all"
          >
            Complete Purchase 💳
          </button>
        </form>
      </div>
    </div>
  );
}
