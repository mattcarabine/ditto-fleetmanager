import { useState } from 'react';
import { useStore } from '../store/store';

export default function ConfigureGroups() {
  const { groups, addGroup, deleteGroup } = useStore();
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupId, setNewGroupId] = useState('');

  const handleAddGroup = () => {
    if (newGroupName.trim() && newGroupId.trim()) {
      addGroup({name: newGroupName, _id: newGroupId});
      setNewGroupName('');
      setNewGroupId('');
    }
  };

  const handleDeleteGroup = (group: { name: string, _id: string }) => {
    if (window.confirm(`Are you sure you want to delete the group "${group.name}"?`)) {
      deleteGroup(group);
    }
  };

  const renderGroupsList = () => {
    if (groups.length === 0) {
      return <p>No groups configured yet</p>;
    }

    return (
      <ul>
        {groups.map((group) => (
          <li key={group._id} className="group-item">
            <div className="group-info">
              <span className="group-name">{group.name}</span>
              <span className="group-id">({group._id})</span>
            </div>
            <button 
              onClick={() => handleDeleteGroup(group)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="configure-groups">
      <h2>Configure Groups</h2>
      
      <div className="add-group-section">
        <div className="input-group">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter user-friendly name"
            className="group-input"
          />
          <input
            type="text"
            value={newGroupId}
            onChange={(e) => setNewGroupId(e.target.value)}
            placeholder="Enter metadata field name"
            className="group-input"
          />
        </div>
        <button 
          onClick={handleAddGroup} 
          className="add-button"
          disabled={!newGroupName.trim() || !newGroupId.trim()}
        >
          Add Group
        </button>
      </div>

      <div className="groups-list">
        <h3>Existing Groups</h3>
        {renderGroupsList()}
      </div>
    </div>
  );
} 