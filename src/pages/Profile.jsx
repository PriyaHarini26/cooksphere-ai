import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <img
          src="https://i.pravatar.cc/150"
          alt="Profile"
          className="profile-img"
        />

        <h1>Harini</h1>

        <p className="profile-role">
          🍳 CookSphere Creator
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>📚</h2>
          <h3>12</h3>
          <p>Recipes</p>
        </div>

        <div className="stat-card">
          <h2>❤️</h2>
          <h3>8</h3>
          <p>Favorites</p>
        </div>

        <div className="stat-card">
          <h2>🎥</h2>
          <h3>20</h3>
          <p>Videos Viewed</p>
        </div>

        <div className="stat-card">
          <h2>⭐</h2>
          <h3>4.9</h3>
          <p>Rating</p>
        </div>

      </div>

      <div className="about-card">

        <h2>About Me</h2>

        <p>
          Passionate about cooking, nutrition,
          and discovering healthy recipes.
        </p>

      </div>

    </div>
  );
}

export default Profile;