import { Link } from 'react-router-dom';
import { useStore } from '../store/store';

function ListGroups() {
  const { groups } = useStore();

  return (
    <div className="list-groups">
      <h1>Groups</h1>
      <div className="groups-list">
        {groups.map((group) => (
          <Link 
            key={group._id} 
            to={`/group/${group._id}`}
            className="group-link"
          >
            {group.name} ({group._id})
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListGroups; 