import { Router, Request, Response } from 'express';
import { Category } from '../db/schema';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await Category.find();
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get single category
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Category.findById(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Create category (admin only)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image } = req.body;
    
    const category = new Category({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      image,
    });

    await category.save();
    res.status(201).json({ data: category });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update category (admin only)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await Category.findByIdAndUpdate(id, updates, { new: true });

    if (!result) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete category (admin only)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
