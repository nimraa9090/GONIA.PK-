import { Router } from 'express';

const router = Router();

// Mock data for demonstration
let products = [
  { id: 1, name: 'Minimalist Silk Dress', price: 120, category: 'Dresses', isFeatured: true },
  { id: 2, name: 'Cotton Linen Shirt', price: 45, category: 'Tops', isFeatured: true },
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

router.post('/', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default router;
