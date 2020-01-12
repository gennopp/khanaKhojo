async function getUser() {
    console.log("I am here");
    const response = await fetch("http://localhost:5001/user");
    const data = response.json();
    return Array.from(data);
  }

export default getUser;