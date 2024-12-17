import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSnippets, deleteSnippet } from '../api/snippetsAPI';

const SnippetListPage: React.FC = () => {
  const [snippets, setSnippets] = useState<any[]>([]);

  // Fetch all snippets when the component loads
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const data = await getSnippets();
        setSnippets(data);
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };

    fetchSnippets();
  }, []);

  // Handle snippet deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteSnippet(id);
      setSnippets(snippets.filter((snippet) => snippet.id !== id));
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };

  return (
    <div>
      <h1>Snippet List</h1>
      <Link to="/new">
        <button>Create New Snippet</button>
      </Link>

      {/* Display list of snippets */}
      <ul>
        {snippets.map((snippet) => (
          <li key={snippet.id}>
            <h3>{snippet.title}</h3>
            <pre>{snippet.code}</pre>
            <p>Language: {snippet.language}</p>
            <button onClick={() => handleDelete(snippet.id)}>Delete</button>
            <Link to={`/edit/${snippet.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetListPage;
