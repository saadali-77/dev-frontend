import { useSelector } from "react-redux";

export const UserCard= ({user})=>{
    
    const {firstName,lastName,age,gender,about,skills,photoUrl}= user;
   // console.log(user)
    return (<>
<div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
    src={photoUrl}
//   src={
//     user?.photoUrl?
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhimJIyrBNRlqfiMPmIrUcfNktz3XZEGEhA&s" + user?.firstName:'no found'
//   }
  alt="user"
/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">  {firstName + " " + lastName }</h2>
    <p> about {about}</p>
    {age && skills  && <p> {age + " " + skills } </p>}
    {gender && <p>{gender} </p>}
    <div className="card-actions justify-end">
      <button className="btn btn-secondary">ignore</button>
      <button className="btn btn-primary">interested</button>
    </div>
  </div>
</div></>)}
