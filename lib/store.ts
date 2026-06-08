export type User = {
  id: string;
  name: string;
  email: string;
  age?: number;
  role: 'admin' | 'customer';
};

export type Part = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export type Order = {
  id: string;
  userId: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  totalAmount: number;
};

export type OrderItem = {
  id: string;
  orderId: string;
  partId: string;
  quantity: number;
  price: number;
};

export const users: User[] = [
  { id: '1', name: 'Иван Иванов', email: 'ivan@example.com', age: 30, role: 'admin' },
  { id: '2', name: 'Петр Петров', email: 'petr@example.com', age: 25, role: 'customer' }
];

export const parts: Part[] = [
  { id: '1', title: 'Тормозные колодки Bosch', description: 'Керамические дисковые тормозные колодки, передняя ось.', price: 2500, stock: 15, category: 'Тормозная система' },
  { id: '2', title: 'Масляный фильтр MANN', description: 'Оригинальный фильтр очистки масла высокой степени фильтрации.', price: 800, stock: 50, category: 'Двигатель' },
  { id: '3', title: 'Свеча зажигания NGK', description: 'Иридиевая свеча для надежного пуска в любые морозы.', price: 1200, stock: 100, category: 'Электрика' },
  { id: '4', title: 'Амортизатор KYB', description: 'Газонаполненный передний амортизатор, серия Excel-G.', price: 4500, stock: 8, category: 'Подвеска' }
];

export const orders: Order[] = [
  { id: '1', userId: '2', status: 'completed', createdAt: new Date().toISOString(), totalAmount: 3300 }
];

export const orderItems: OrderItem[] = [
  { id: '1', orderId: '1', partId: '1', quantity: 1, price: 2500 },
  { id: '2', orderId: '1', partId: '2', quantity: 1, price: 800 }
];
