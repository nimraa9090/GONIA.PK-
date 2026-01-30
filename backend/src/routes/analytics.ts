import { Router, Request, Response } from 'express';
import { Analytics, Order, Product } from '../db/schema';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Track event
router.post('/track', async (req: Request, res: Response) => {
  try {
    const { productId, eventType, userId, sessionId, metadata } = req.body;
    
    const analytics = new Analytics({
      productId,
      eventType,
      userId,
      sessionId,
      metadata,
    });

    await analytics.save();
    res.json({ message: 'Event tracked' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track event' });
  }
});

// Get dashboard stats (admin only)
router.get('/dashboard', authMiddleware, async (req: Request, res: Response) => {
  try {
    const allAnalytics = await Analytics.find();
    const allOrders = await Order.find();
    const allProducts = await Product.find();

    const totalViews = allAnalytics.filter((a) => a.eventType === 'view').length;
    const totalSearches = allAnalytics.filter((a) => a.eventType === 'search').length;
    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.json({
      data: {
        totalViews,
        totalSearches,
        totalOrders,
        totalRevenue,
        totalProducts: allProducts.length,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get product analytics (admin only)
router.get('/products/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productAnalytics = await Analytics.find({ productId: id });
    
    const views = productAnalytics.filter((a) => a.eventType === 'view').length;
    const searches = productAnalytics.filter((a) => a.eventType === 'search').length;

    res.json({ data: { views, searches } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product analytics' });
  }
});

export default router;
