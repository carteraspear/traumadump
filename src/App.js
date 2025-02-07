import React, { useState } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({ id: null, title: '', text: '' });

  // Helper function to generate a default title (current date)
  const getDefaultTitle = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSave = () => {
    if (currentEntry.text.trim() === '') return;

    if (currentEntry.id !== null) {
      // Update existing entry
      const updatedEntries = entries.map(entry =>
        entry.id === currentEntry.id ? { ...currentEntry } : entry
      );
      setEntries(updatedEntries);
    } else {
      // Add new entry
      const newEntry = {
        id: Date.now(),
        title: currentEntry.title || getDefaultTitle(), // Use default title if empty
        text: currentEntry.text,
      };
      setEntries([...entries, newEntry]);
    }
    setCurrentEntry({ id: null, title: '', text: '' });
  };

  const handleEdit = (entry) => {
    setCurrentEntry(entry);
  };

  const handleDelete = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <div className="App">
      <div className="journal-container">
        {/* Top Bar */}
        <div className="top-bar">
        </div>

        {/* Left Side: List of Previous Entries */}
        <div className="entries-list">
          <h2>Entries</h2>
          {entries.length === 0 ? (
            <p>No entries yet. Start writing!</p>
          ) : (
            <ul>
              {entries.map((entry) => (
                <li key={entry.id}>
                  <div className="entry-title">{entry.title}</div>
                  <div className="entry-text">{entry.text}</div>
                  <div className="entry-actions">
                    <button onClick={() => handleEdit(entry)}>Edit</button>
                    <button onClick={() => handleDelete(entry.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side: Text Area for Typing/Editing */}
        <div className="entry-editor">
          <h2>{currentEntry.id ? 'Edit Entry' : 'New Entry'}</h2>
          <input
            type="text"
            value={currentEntry.title}
            onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
            placeholder="Journal Title (defaults to today's date)"
          />
          <textarea
            value={currentEntry.text}
            onChange={(e) => setCurrentEntry({ ...currentEntry, text: e.target.value })}
            placeholder="Write your thoughts here..."
          />
          <button onClick={handleSave}>{currentEntry.id ? 'Update' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;