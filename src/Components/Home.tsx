import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BlogLists from './BlogLists';
import CreateBlog from './CreateBlog';
import profile from '../assets/Home/profile.svg';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import { Blog } from '../types';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const navigate = useNavigate();  // For navigating to another page

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

  const handleProfileClick = () => {
    // Navigate to the user details page and pass the userName and email
    navigate('/home/userdetails', { state: { userName, email: userEmail } });
  };

  const handleCreateBlog = (newBlog: Blog) => {
    setBlogs([...blogs, newBlog]);
    setIsCreateBlogOpen(false);
  };

  const handleOpenCreateBlog = () => {
    setIsCreateBlogOpen(true);
  };

  const handleCloseCreateBlog = () => {
    setIsCreateBlogOpen(false);
  };

  const handleBlogClick = (blogId: string) => {
    // Navigate to a new page for the blog with the given blogId
    navigate(`/home/blog/${blogId}`);
  };

  
  // Filter blogs based on search query (by title or author)
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='overflow-x-hidden'>
      
      {/* Header */}
      <div className="navbar bg-base-100 mr-[25px] ml-[15px]">
        <div className="flex-1">
          <div className="text-7xl font-KolkerBrush ">dojo blog</div>
        </div>
        <div className="flex-none relative right-[30px]">
          <ul className="menu menu-horizontal px-1">
            <h2 className="mr-4 text-xl">Hi, {userName}!</h2>
            <button onClick={handleProfileClick}>
              <img src={profile} className="min-h-5" alt="Profile" />
            </button>
            
          </ul>
        </div>
      </div>

      <br/>      

      {/* Blog Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl  font-KodeMono">Blogs</h1>
          
          <button className="btn btn-primary" onClick={handleOpenCreateBlog}>New Blog</button>
        </div>

        {/* Search Bar */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search by author or title..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
        </label>

        <br/>
        <br/>

        {/* Blog Lists */}
        <BlogLists blogs={filteredBlogs} onBlogClick={handleBlogClick} />
      </div>

      <footer className="footer footer-center bg-base-300 text-base-content p-4 ">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Navaneeth K.B.</p>
        </aside>
      </footer>

      

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
