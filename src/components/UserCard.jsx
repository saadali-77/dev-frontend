import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../appStore/feedSlice";
import { BASE_URL } from "../appStore/constant";
import axios from "axios";

export const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, skills, photoUrl } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-100  h-120 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://via.placeholder.com/150"}
          alt={`${firstName} ${lastName}`}
          className="h-130 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        {/* Name */}
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>

        {/* Age and Gender side by side */}
        {(age || gender) && (
          <p className="text-white-700">
            {age && `Age: ${age}`} {age && gender && " | "} {gender && `Gender, ${gender}`}
           
          </p>
        )}

        {/* About below Age & Gender */}
        {about && <p className="mt-1 text-white-600">{about}</p>}
{/* 
        {/* Skills */}
        {/* {skills && skills.length > 0 && (
          <p className="mt-1 text-gray-600">Skills: {skills.join(", ")}</p>
        )}  */}

        {/* Actions */}
        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};