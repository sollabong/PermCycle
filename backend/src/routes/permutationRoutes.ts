import { Router } from 'express';
import { decomposePermutation } from '../services/permutationService';

const router = Router();

router.post('/simplify-permutation', (req, res) => {
  const { cycles } = req.body;
  console.log(cycles);
  try {
    const result = decomposePermutation(cycles);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Error processing cycles', error });
  }
});

export default router;
