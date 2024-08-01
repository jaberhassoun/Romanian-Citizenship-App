import React, { useState } from 'react';
import QAIterator from './QAIterator'; // Ensure this path matches your file structure

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Geography');

  return (
    <div className="main-content">
      <div className="container">
        {/* Dropdown Menu */}
        <div className="dropdown-container">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="Culture">Culture</option>
            <option value="Constitution">Constitution</option>
            <option value="Anthem">Anthem</option>
          </select>
        </div>

        <QAIterator selectedCategory={selectedCategory} />
        
      </div>
    </div>
  );
}

export default App;
