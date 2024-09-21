import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebaseConfig'; // Import Firestore instance
import { Blog } from '../types'; // Import the Blog type
//import { v4 as uuidv4 } from 'uuid';

type CreateBlogProps = {
  onCreate: (newBlog: Blog) => void;
  userName: string;
  email: string;
  onClose: () => void;
};

const CreateBlog: React.FC<CreateBlogProps> = ({ onCreate, userName, email, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    console.log('Submit clicked');

    if (title.trim() === '' || body.trim() === '') {
      console.log('Title or body is empty');
      setError('Title and content are required');
      return;
    }

    const newBlog: Blog = {
      title,
      body,
      author: userName,
      email: email,
      date: new Date().toLocaleString(),
      likes: [],
      comments: [],
    };

    if (isSubmitting) {
      console.log('Submit attempt ignored: already submitting');
      return;
    }

    console.log('Submitting blog:', newBlog);
    setIsSubmitting(true);

    try {
      // Add the new blog to Firestore
      await addDoc(collection(db, 'blogs'), newBlog);
      console.log('Blog added successfully');
      onCreate(newBlog);
      setTitle('');
      setBody('');
      onClose();
    } catch (err) {
      console.error('Error adding blog:', err);
      setError('Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="card bg-neutral text-neutral-content w-full max-w-4xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold mb-6">Create New Blog</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="input input-bordered flex items-center gap-2 w-full"
          />
          <textarea 
            placeholder="Content" 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            className="input p-3 border rounded-lg w-full h-48 resize-none"
          ></textarea>
          <br/>
          <div className="card-actions justify-end space-x-4">
            <button 
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button 
              className="btn btn-ghost"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};

export default CreateBlog;
