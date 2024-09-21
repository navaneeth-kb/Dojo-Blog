import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added useNavigate
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Blog } from '../types';

const UserDetailsPage = () => {
  const navigate = useNavigate(); // For navigation
  const location = useLocation();
  const { userName, email } = location.state || { userName: 'Guest', email: 'Not available' };

  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs written by the user
  useEffect(() => {
    const fetchUserBlogs = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'blogs'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];
        setUserBlogs(blogs);
      } catch (err) {
        console.error('Error fetching user blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [email]);

  // Navigate to BlogDetails page
  const handleBlogClick = (blogId: string) => {
    navigate(`/home/blog/${blogId}`); // Adjust path if necessary
  };

  // Delete a blog
  const handleDelete = async (blogId: string) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
      if (confirmDelete) {
        await deleteDoc(doc(db, 'blogs', blogId));
        setUserBlogs(userBlogs.filter((blog) => blog.id !== blogId)); // Update the list
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
        <div className="text-4xl font-KodeMono">User Details</div>
        </div>
      </div>
      <br/>
      <p className="text-lg"><strong>Name:</strong> {userName}</p>
      <p className="text-lg mb-6"><strong>Email:</strong> {email}</p>

      {/* Blog List */}
      <h2 className="text-xl font-semibold mt-6">Blogs by {userName}:</h2>
      <br/>
      <br/>
      {loading ? (
        <p>Loading blogs...</p>
      ) : userBlogs.length > 0 ? (
        <div className="flex flex-col gap-[10px]">
          {userBlogs.map((blog) => (
            <div
              key={blog.id}
              className="card bg-neutral text-neutral-content w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="card-body ">
                <h2 className="card-title text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-sm mb-2">by {blog.author}</p>
                <p className="text-sm mb-4">{blog.body.slice(0, 100)}...</p>
                <div className='flex flex-row justify-between'>
                  <div className="text-sm text-gray-400 mb-4">{blog.date}</div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => blog.id && handleBlogClick(blog.id)} // Only call if 'id' exists
                    >
                      View Blog
                    </button>
                    <button
                      className="btn btn-ghost ml-2"
                      onClick={() => blog.id && handleDelete(blog.id)} // Only delete if 'id' exists
                    >
                      Delete Blog
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (
        <p className="text-gray-500">No blogs written by this user yet.</p>
      )}
    </div>
  );
};

export default UserDetailsPage;
