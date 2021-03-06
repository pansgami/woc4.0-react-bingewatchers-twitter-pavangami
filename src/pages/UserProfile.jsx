import { Link } from "react-router-dom";
function UserProfile({
  imgUrl,
  onFollowClick,
  name,
  following,
  followingCount,
  followerCount,
  isOwn,
  isall,
  userID,
}) {
  return (
    <div className="p-container">
      <div>
        <div className="time-container">
          <img src={imgUrl} alt="profile" className="profile-icon"></img>

          <div className="col-container">
            <div className="name-container">
              {isall ? (
                <Link to={`/other/${userID}`}>
                  {<h1 className="profileaa-user-name">@{name}</h1>}
                </Link>
              ) : (
                <h1 className="profileaa-user-name">{name}</h1>
              )}

              <div className="count2"></div>
              <div className="count2"></div>
              {isOwn && (
                <button onClick={onFollowClick} className="follow">
                  {following ? "Following" : "Follow"}
                </button>
              )}
            </div>

            <div className="name-container">
              <strong>
                followers
                <span className="navbarListItems">{followerCount}</span>{" "}
              </strong>
              <div className="count2"></div>
              <div className="count2"></div>
              <strong>
                following
                <span className="navbarListItems">{followingCount}</span>{" "}
              </strong>
            </div>
            <div className="count2"></div>
            <div className="count2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
