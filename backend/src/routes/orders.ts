import { Router, Request, Response } from 'express';
import { Order } from '../db/schema';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all orders (admin only)
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await Order.find().sort({ createdAt: -1 });
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get single order
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Order.findById(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Create order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, customerPhone, customerAddress, items, totalPrice } = req.body;
    
    const orderNumber = `ORD-${Date.now()}`;
    
    const order = new Order({
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalPrice,
      status: 'PENDING',
    });

    await order.save();
    res.status(201).json({ data: order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status (admin only)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Delete order (admin only)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

export default router;
