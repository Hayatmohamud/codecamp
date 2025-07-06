document.addEventListener("DOMContentLoaded",displayPosts);

// add post 
function addPost(){
const title = document.querySelector("#title").value;
const imageUrl = document.querySelector("#imageUrl").value
const content = document.querySelector("#content").value

if(title.trim() === "" || content.trim() === ""){
   alert("Title and content are required!");
    return;
}
  const post = {
    id:Date.now(),
    title,
    imageUrl,
    content,
    timestamp: new Date().toLocaleString()
  };
  let posts = JSON.parse(localStorage.getItem("blogPost")) || [];
  posts.unshift(post);
  localStorage.setItem("blogPosts",JSON.stringify(posts));
   
  // clear form
  document.querySelector("#title").value = "";
  document.querySelector("#imageUrl").value = "";
  document.querySelector("#content").value = "";
  //  console.log(posts)
   displayPosts();
}
// Function to display all posts
function displayPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = ""; // Clear previous posts

  const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p><small>${post.timestamp}</small></p>
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image"/>` : ""}
      <p>${post.content}</p>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;

    postList.appendChild(postDiv);
  });
}

// Function to delete a post
function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  posts = posts.filter(post => post.id !== id); // Remove the post with the matching ID
  localStorage.setItem("blogPosts", JSON.stringify(posts)); // Update the localStorage
  displayPosts(); // Refresh the display
}

// Function to edit a post
function editPost(id) {
  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  const post = posts.find(p => p.id === id); // Find the post with the given ID
  if (!post) return; // If post doesn't exist, exit

  // Prefill form fields with post data
  document.getElementById("title").value = post.title;
  document.getElementById("imageUrl").value = post.imageUrl;
  document.getElementById("content").value = post.content;

  // Change the button to "Update Post"
  const button = document.querySelector("button");
  button.textContent = "Update Post";
  
  // Update the post when the button is clicked
  button.onclick = function() {
    updatePost(id); // Pass the post ID to the update function
  };
}

// Function to update the post after editing
function updatePost(id) {
  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  const index = posts.findIndex(post => post.id === id); // Find the index of the post

  if (index === -1) return; // If post not found, exit

  // Update the post with new values
  posts[index].title = document.getElementById("title").value;
  posts[index].imageUrl = document.getElementById("imageUrl").value;
  posts[index].content = document.getElementById("content").value;
  posts[index].timestamp = new Date().toLocaleString(); // Update timestamp to current time

  // Save the updated posts array to localStorage
  localStorage.setItem("blogPosts", JSON.stringify(posts));

  // Reset form and button
  document.getElementById("title").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("content").value = "";

  const button = document.querySelector("button");
  button.textContent = "Add Post";
  button.onclick = addPost; // Switch the button back to "Add Post"

  displayPosts(); // Refresh the post list
}
