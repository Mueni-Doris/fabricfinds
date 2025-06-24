import Link from "next/link";


export const metadata = {
  title: "Fabric Finds",
  description: "Where style meets elegance",
};

export default function Navbar() 
 {
  return (

      <nav style={{ padding: "1rem", background: "#f0f0f0", display: "flex", gap: "1rem" }}>
      <Link href="/" >Home</Link>
         <Link href="/clothes"> Products</Link> 
          <Link href="/cart">cart</Link>
          <Link href="/addclothes">Add clothes</Link>
          <Link href="/login">login</Link>
          <Link href="/logout">logout</Link>


        </nav>

  );
}

