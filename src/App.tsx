import './App.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ConfigureGroups from './pages/ConfigureGroups';
import ConfigureSettings from './pages/ConfigureSettings';
import Group from './pages/Group';
import GroupPeers from './pages/GroupPeers';
import ListGroups from './pages/ListGroups';
import Peer from './pages/Peer';
import { RemoteQueryProvider } from './contexts/RemoteQuery';
import { useEffect, useRef } from 'react';
import { initializeDitto } from './config/ditto';
import { useStore } from './store/store';

function App() {
  const hasRun = useRef(false);
  const { initialize } = useStore();

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;
    const init = async () => {
      try {
        await initializeDitto();
        initialize();
      } catch (error) {
        console.error('Failed to initialize:', error);
      }
    };
    
    init();
  }, []);

  const { groups } = useStore();

  return (
    <div className="app">
      <nav className="main-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/configure-groups" className="nav-link">Configure Groups</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          groups.length === 0 ? <ConfigureGroups /> :
          groups.length === 1 ? <Navigate to={`/group/${groups[0]._id}`} /> :
          <ListGroups />
        } />
        <Route path="/configure-groups" element={<ConfigureGroups />} />
        <Route path="/settings" element={<ConfigureSettings />} />
        <Route path={`/group/:groupName`} element={<Group />} />
        <Route path={`/group/:groupName/:metadataValue`} element={<RemoteQueryProvider><GroupPeers /></RemoteQueryProvider>} />
        <Route path="/peer/:peerId" element={<RemoteQueryProvider><Peer /></RemoteQueryProvider>} />
      </Routes>
    </div>
  );
}

export default App;
