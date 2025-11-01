


const ModuleOne=()=>{
  const profile={
    name:"Gokul",
    college:"Vaigai college of engineering",
    skills:["HTML","CSS","JavaScript"]
  };
  return (
    <>
      <p>Name:{profile.name}</p>
      <p>College:{profile.college}</p>
      <ul>
        {profile.skills.map((skill,index)=>{
          return <li>{skill}</li>
        })}
      </ul>
    </>
  )
}

export default ModuleOne;