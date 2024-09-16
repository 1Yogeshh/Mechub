// In your React component
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/auth/followers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFollowers(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFollowing = async () => {
      try {
        const { data } = await axios.get('https://mechub-server.vercel.app/api/auth/following', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFollowing(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFollowers();
    fetchFollowing();
  }, []);

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map(follower => (
          <li key={follower._id}>{follower.username}</li>
        ))}
      </ul>

      <h2>Following</h2>
      <ul>
        {following.map(followed => (
          <li key={followed._id}>{followed.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
