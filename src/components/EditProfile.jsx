import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../appStore/constant";
import { UserCard } from "./UserCard";
import { addUser } from "../appStore/userSlice";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    photoUrl: user?.photoUrl || "",
    about: user?.about || "",
    skills: user?.skills || [],
    password: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Skills logic
  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill || form.skills.includes(skill)) return;
    setForm({ ...form, skills: [...form.skills, skill] });
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  // Optional photo URL validation
  const validatePhotoUrl = (url) => {
    return new Promise((resolve) => {
      if (!url) return resolve(true);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Save profile
  const saveProfile = async () => {
    setError("");
    try {
      // 1️⃣ Validate photo URL
      const isValidPhoto = await validatePhotoUrl(form.photoUrl);
      if (!isValidPhoto) console.warn("Photo URL seems invalid, but saving anyway.");

      // 2️⃣ Validate required fields
      if (!form.firstName || !form.lastName) {
        setError("First and Last name are required.");
        return;
      }

      if (!form.age || form.age < 18) {
        setError("Age must be 18 or older.");
        return;
      }

      // 3️⃣ Prepare payload
      const payload = { ...form };

      // Only send password if entered
      if (!payload.password) delete payload.password;

      // Remove empty strings or empty arrays
      Object.keys(payload).forEach((key) => {
        if (payload[key] === "" || (Array.isArray(payload[key]) && payload[key].length === 0)) {
          delete payload[key];
        }
      });

      // 4️⃣ Make PATCH request
      const response = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      // 5️⃣ Update redux and show toast
      dispatch(addUser(response.data.user));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to save profile");
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfile();
  };

  return (
    <>
      <div className="min-h-screen flex items-start justify-center bg-slate-950 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Edit Profile</h2>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/5 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/5 text-white"
                required
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Age</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/5 text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/5 text-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Photo URL</label>
            <input
              name="photoUrl"
              value={form.photoUrl}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/5 text-white"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">About</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-white/5 text-white"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Skills</label>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill"
                className="input input-bordered w-full bg-white/5 text-white"
              />
              <button type="button" onClick={addSkill} className="btn btn-primary">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-600 rounded-full cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">New Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/5 text-white"
            />
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button type="submit" className="btn btn-success w-full mb-2">
            Save
          </button>
        </form>

        {/* Live Preview */}
        <div className="ml-10 flex items-center justify-center">
          <UserCard user={form} />
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-start ml-80 mt-20">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};