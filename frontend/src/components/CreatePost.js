import React, { useState } from 'react';
import './CreatePost.css';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Article');
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(''); // State for confirmation message

  const navigate = useNavigate(); // Initialize navigate hook

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (imageFile) {
      setIsUploading(true);
      const storageRef = ref(storage, `images/${imageFile.name}`);
      uploadBytes(storageRef, imageFile)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setImageURL(url);
          setIsUploading(false);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setIsUploading(false);
          alert('Error uploading image. Please try again.');
        });
    } else {
      alert('Please select an image file first');
    }
  };

  const handleSubmit = () => {
    if (!title || !content || !imageURL) {
      alert('Please fill all fields and upload an image');
      return;
    }

    setIsSubmitting(true);

    fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        tag,
        image: imageURL,
      }),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          // If response status is not OK, throw an error with the response message
          return response.json().then((data) => {
            throw new Error(data.message || 'Error creating post');
          });
        }
        return response.json();
      })
      .then((data) => {
        // If post creation is successful
        console.log('Post created:', data);
        setTitle('');
        setContent('');
        setTag('Article');
        setImageFile(null);
        setImageURL('');
        setIsSubmitting(false);

        // Display success message
        setConfirmationMessage('✅ Post created successfully!');

        // Redirect after a short delay
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        // Display the exact error message from the backend
        console.error('Error creating post:', error.message);
        setIsSubmitting(false);
        setConfirmationMessage(`❌ ${error.message}`);
      });
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>

      {confirmationMessage && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}

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

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={isSubmitting || isUploading}
      >
        {isSubmitting ? 'Creating Post...' : 'Create Post'}
      </button>
    </div>
  );
}

export default CreatePost;
