import express from 'express';
import { getAllSnippets, getSnippetById, createSnippet, updateSnippet, deleteSnippet } from '../controllers/snippetsController';

const router = express.Router();

router.get('/', getAllSnippets);
router.get('/:id', getSnippetById);
router.post('/', createSnippet);
router.put('/:id', updateSnippet);
router.delete('/:id', deleteSnippet);

export default router;
