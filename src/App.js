import { useState } from 'react';
import PostsList from './components/PostsList';
import Search from './components/Search';
import './css/style.css';

function App() {
  const [request, setRequest] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className='App'>
      <div className='container'>
        <Search setRequest={setRequest} setCurrentPage={setCurrentPage} />
        <PostsList request={request} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
