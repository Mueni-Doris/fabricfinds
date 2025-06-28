'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface ReportItem {
  id: number;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

export default function ReportsPage() {
  const [items, setItems] = useState<ReportItem[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReports = async () => {
    try {
      const res = await fetch('http://localhost:3001/reports', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || '❌ Failed to fetch reports');
        return;
      }
      setItems(data.Reports); // ✅ Match backend key
    } catch (err) {
      toast.error('Something went wrong fetching the reports');
    }
  };

  useEffect(() => {
    const verifySessionAndFetch = async () => {
      try {
        // ✅ Replace with Nest.js session checker
        const res = await fetch("http://localhost/backend/check_session.php", {
          credentials: 'include',
        });
        const data = await res.json();

        if (!data.loggedIn) {
          toast.error('Please login first 💅');
          router.push('/login');
        } else {
          await fetchReports();
        }
      } catch (err) {
        toast.error('Session check failed');
      } finally {
        setLoading(false);
      }
    };

    verifySessionAndFetch();
  }, [router]);

  const handleSaveEdit = async (item: ReportItem) => {
    try {
      const res = await fetch(`http://localhost:3001/reports/update/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ quantity: editedQuantity })
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Quantity updated');
        setEditingItemId(null);
        fetchReports();
      } else {
        toast.error(result.message || '❌ Update failed');
      }
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (item: ReportItem) => {
    if (!confirm(`Remove "${item.description}" from reports?`)) return;
    try {
      const res = await fetch(`http://localhost:3001/reports/remove/${item.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Item removed');
        fetchReports();
      } else {
        toast.error(result.message || '❌ Delete failed');
      }
    } catch (err) {
      toast.error('Delete request failed');
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-2xl text-center text-yellow-500">
        Hang tight 💛 Fetching your reports...
        <div className="mt-4 h-10 w-10 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        {items.length === 0 ? (
          <div className="text-center mt-10 a text-gray-600 text-lg">
            No reports available 🥲
          </div>
        ) : (
<div className="overflow-x-auto">
  <table className="w-[85%] mx-auto border border-black bg-white text-center shadow-md rounded-lg">
    <thead className="bg-yellow-100 text-pink-600 font-semibold">
      <tr>
        <th className="border border-gray-300 p-2">Image</th>
        <th className="border border-gray-300 p-2">Product</th>
        <th className="border border-gray-300 p-2">Quantity</th>
        <th className="border border-gray-300 p-2">Price</th>
        <th className="border border-gray-300 p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item: any) => {
        const unitPrice = Number(item.price) / Number(item.quantity);
        return (
          <tr key={item.id} className="hover:bg-pink-50">
            <td className="border border-gray-300 p-2">
              <img
                src={item.image}
                alt={item.description}
                className="w-24 h-16 object-cover rounded"
              />
            </td>
            <td className="border border-gray-300 p-2">{item.description}</td>
            <td className="border border-gray-300 p-2">
              {editingItemId === item.id ? (
                <input
                  type="number"
                  min="1"
                  className="w-16 border px-2 py-1 rounded-lg text-center"
                  value={editedQuantity}
                  onChange={(e) =>
                    setEditedQuantity(parseInt(e.target.value) || 1)
                  }
                />
              ) : (
                item.quantity
              )}
            </td>
            <td className="border border-gray-300 p-2">
              {(unitPrice * item.quantity).toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 space-x-2">
              {editingItemId === item.id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItemId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditingItemId(item.id);
                    setEditedQuantity(item.quantity);
                  }}
                  className="bg-blue-200 text-black px-3 py-1 rounded hover:bg-blue-300"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(item)}
                className="bg-red-200 text-black px-3 py-1 rounded hover:bg-red-300"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


        )}
      </div>
    </div>
  );
}
