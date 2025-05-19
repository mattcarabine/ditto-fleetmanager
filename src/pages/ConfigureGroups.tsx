import React, { useState } from 'react';
import { useStore } from '../store/store';
import type { Group } from '../store/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ConfigureGroups() {
  const { groups, addGroup, deleteGroup } = useStore();
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupId, setNewGroupId] = useState('');

  const handleAddGroup = () => {
    if (newGroupName.trim() && newGroupId.trim()) {
      addGroup({ name: newGroupName, _id: newGroupId });
      setNewGroupName('');
      setNewGroupId('');
    }
  };

  const renderGroupsList = () => {
    return groups.map((group: Group) => (
      <div key={group._id} className="group-item">
        <span>{group.name}</span>
        <Button variant="destructive" onClick={() => deleteGroup(group)}>Delete</Button>
      </div>
    ));
  };

  return (
    <div className="configure-groups">
      <h2>Configure Groups</h2>
      
      <div className="add-group-section">
        <div className="input-group">
          <Input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter user-friendly name"
          />
          <Input
            type="text"
            value={newGroupId}
            onChange={(e) => setNewGroupId(e.target.value)}
            placeholder="Enter metadata field name"
          />
        </div>
        <Button 
          onClick={handleAddGroup} 
          disabled={!newGroupName.trim() || !newGroupId.trim()}
        >
          Add Group
        </Button>
      </div>

      <div className="groups-list">
        <h3>Existing Groups</h3>
        {renderGroupsList()}
      </div>
    </div>
  );
} 