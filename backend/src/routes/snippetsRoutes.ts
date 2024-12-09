import express from 'express';
import { getAllSnippets, getSnippetById, createSnippet, updateSnippet, deleteSnippet, searchSnippets } from '../controllers/snippetsController';

const router = express.Router();

//CRUD routes
router.get('/', getAllSnippets);
router.post('/', createSnippet);
router.get('/search', searchSnippets);
router.get('/:id', getSnippetById);
router.put('/:id', updateSnippet);
router.delete('/:id', deleteSnippet);


export default router;
