/*
Description:

Create a function handleData that processes an array of mixed types.
The array can contain objects with different structures.
Implement type guards to handle each type of object and perform specific operations based on their structure.
*/
import './App.css'

type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

type MixedData = User | Product | Order;

// --- Type guards ---

function isUser(item: MixedData): item is User {
  return item.type === 'user';
}

function isProduct(item: MixedData): item is Product {
  return item.type === 'product';
}

function isOrder(item: MixedData): item is Order {
  return item.type === 'order';
}

// --- Main function ---

function handleData(data: MixedData[]): string[] {
  return data.map((item) => {
    if (isUser(item)) {
      return `User: ${item.name}, Age: ${item.age}`;
    } else if (isProduct(item)) {
      const discounted = (item.price * 0.9).toFixed(2);
      return `Product #${item.id}: $${item.price} → 10% off: $${discounted}`;
    } else if (isOrder(item)) {
      return `Order ${item.orderId}: total $${item.amount}`;
    }
    const _exhaustive: never = item;
    return _exhaustive;
  });
}

// --- Sample data ---

const sampleData: MixedData[] = [
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 49.99 },
  { type: 'order', orderId: 'ORD-007', amount: 149.97 },
  { type: 'user', name: 'Bob', age: 25 },
  { type: 'product', id: 202, price: 19.99 },
];

function App() {
  const results = handleData(sampleData);

  return (
    <>
      <h2>handleData Results</h2>
      <ul>
        {results.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </>
  )
}

export default App
