import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BlogLists from './BlogLists';
import CreateBlog from './CreateBlog';
import profile from '../assets/Home/profile.svg';
import UserDetailsModal from './UserDetailsModel';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Blog } from '../types';

const Home = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, 'blogs');
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[];
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []); // Empty dependency array ensures it only runs once

  const userName = user?.displayName || 'Guest';
  const userEmail = user?.email || 'Not available';

  const handleCreateBlog = (newBlog: Blog) => {
    setBlogs([...blogs, newBlog]);
    setIsCreateBlogOpen(false);
  };

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenCreateBlog = () => {
    setIsCreateBlogOpen(true);
  };

  const handleCloseCreateBlog = () => {
    setIsCreateBlogOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-row justify-between items-center p-4 bg-gray-800 text-white">
        <div>
          <h1 className="text-2xl font-bold">Dojo-Blog</h1>
        </div>
        <div className="flex flex-row items-center">
          <h2 className="mr-4">Hi, {userName}!</h2>
          <button onClick={handleProfileClick}>
            <img src={profile} className="min-h-5" alt="Profile" />
          </button>
        </div>
      </div>

      {/* Blog Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Blogs</h1>
          <button onClick={handleOpenCreateBlog} className="bg-blue-500 text-white px-4 py-2 rounded">
            New Blog
          </button>
        </div>

        {/* Blog Lists */}
        <BlogLists blogs={blogs} />
      </div>

      {/* User Details Modal */}
      {isModalOpen && (
        <UserDetailsModal 
          userName={userName} 
          email={userEmail} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Create Blog Modal */}
      {isCreateBlogOpen && (
        <CreateBlog 
          userName={userName} 
          email={userEmail} 
          onCreate={handleCreateBlog} 
          onClose={handleCloseCreateBlog} 
        />
      )}
    </div>
  );
};

export default Home;
