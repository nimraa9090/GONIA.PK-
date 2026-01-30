import { Router, Request, Response } from 'express';
import { Product } from '../db/schema';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { categoryId, featured, search, limit = 20, offset = 0 } = req.query;
    
    let query: any = {};
    
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const result = await Product.find(query)
      .limit(parseInt(limit as string))
      .skip(parseInt(offset as string));
    
    const total = await Product.countDocuments(query);
    
    res.json({ data: result, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment views
    product.views = (product.views || 0) + 1;
    await product.save();

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (admin only)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, slug, description, price, categoryId, images, sizes, colors, material, stock } = req.body;
    
    const product = new Product({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      price,
      categoryId,
      images: images || [],
      sizes: sizes || [],
      colors: colors || [],
      material,
      stock: stock || 0,
    });

    await product.save();
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (admin only)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (admin only)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
