import { React, useEffect, useState } from 'react';
import { Octokit } from "octokit";
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [userObjData, setUserData] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // async function userData() { 
      const octokit = new Octokit({
        auth: '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',
      })  

      try{
        const userObj = await octokit.request('GET /users/{username}', {
          username: query,
          headers: {
          'X-Github-Api-Version': '2022-11-28'
          }
        })
        setUserData(userObj.data)
        console.log(userObj.data)
      }

      catch(error) {
        console.log("Error")
      }
    
  }

  return(
    <div>
      <h1>Github User Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Github Username</label>
        <input 
        type='text' required
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <input type='submit' value='submit'/>
      </form>

      {userObjData && (
        <div>
          <h2>User Data:</h2>
          {/* <pre>{JSON.stringify(userObjData, null, 2)}</pre> */}
          <img src={userObjData.avatar_url}></img>
          <p>Name: {userObjData.name}</p>
          <p>Bio: {userObjData.bio}</p>
          <p>User Type: {userObjData.type}</p>
          <p>Followers: {userObjData.followers}</p>
        </div>
      )}
    </div>
  )
}

