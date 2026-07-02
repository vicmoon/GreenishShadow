import React, { useState } from 'react';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Article');
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageURL('');
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert('Please select an image file first');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setImageURL(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !imageURL) {
      alert('Please fill all fields and upload an image');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, tag, image: imageURL }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error creating post');
      }

      setTitle('');
      setContent('');
      setTag('Article');
      setImageFile(null);
      setImageURL('');
      setConfirmationMessage('✅ Post created successfully!');

      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Error creating post:', error.message);
      setConfirmationMessage(`❌ ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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

      <ReactQuill
        value={content}
        onChange={setContent}
        modules={CreatePost.modules}
        formats={CreatePost.formats}
        placeholder="Write your content here..."
        className="quill-editor"
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-button" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
        {imageURL && <span className="upload-success">✅ Image uploaded</span>}
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

CreatePost.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

CreatePost.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

export default CreatePost;
