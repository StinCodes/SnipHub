import { Request, Response, NextFunction } from "express";
import pool from "../db";

// Get all snippets
export const getAllSnippets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM snippets');
    res.json(result.rows);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};


// Get a single snippet by ID
export const getSnippetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM snippets WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Snippet not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};


// Add a new snippet
export const createSnippet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, code, language, tags } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO snippets (title, code, language, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, code, language, tags]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};


// Update a snippet by ID
export const updateSnippet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, code, language, tags } = req.body;

  try {
    const result = await pool.query(
      'UPDATE snippets SET title = $1, code = $2, language = $3, tags = $4 WHERE id = $5 RETURNING *',
      [title, code, language, tags, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Snippet not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};


// Delete a snippet by ID
export const deleteSnippet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM snippets WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Snippet not found' });
      return;
    }

    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    next(error);
  }
};


//Search snippets by title, language or tags
export const searchSnippets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { query, language, tags } = req.query;

  try {
    let sqlQuery = 'SELECT * FROM snippets WHERE 1=1'; // Base query
    const params: any[] = [];

    if (query) {
      sqlQuery += ' AND title ILIKE $1';
      params.push(`%${query}%`);
    }

    if (language) {
      sqlQuery += ` AND language = $${params.length + 1}`;
      params.push(language);
    }

    if (tags) {
      sqlQuery += ` AND tags @> $${params.length + 1}`;
      params.push(tags);
    }

    const result = await pool.query(sqlQuery, params);
    res.json(result.rows);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};


