import React, { useState } from 'react';
import './CreatePost.css'; // Import the CSS file
import { storage } from '../firebaseConfig'; // Firebase storage instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Article');
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isUploading, setIsUploading] = useState(false); // To track upload status

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected image file
  };

  const handleUpload = () => {
    if (imageFile) {
      setIsUploading(true);
      const storageRef = ref(storage, `images/${imageFile.name}`);
      uploadBytes(storageRef, imageFile)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          console.log('File available at:', url);
          setImageURL(url); // Set the uploaded image URL
          setIsUploading(false); // Upload finished
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setIsUploading(false); // Reset if there's an error
        });
    }
  };

  const handleSubmit = () => {
    // Post data to backend, including image URL
    fetch('http://localhost:9000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        tag,
        image: imageURL, // Include uploaded image URL
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post created:', data);
        // Clear the form fields after successful post creation
        setTitle('');
        setContent('');
        setTag('Article');
        setImageFile(null);
        setImageURL('');
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea-field"
      />
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="select-field"
      >
        <option value="Article">Article</option>
        <option value="Game">Game</option>
      </select>

      <div className="image-upload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-button">
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      <button onClick={handleSubmit} className="submit-button">
        Create Post
      </button>
    </div>
  );
}

export default CreatePost;
