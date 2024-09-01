import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Import your firebase configuration
import { Blog } from '../types'; // Import Blog type
import { collection, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

type BlogListsProps = {
  blogs: Blog[];
};

const BlogLists: React.FC<BlogListsProps> = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [userId] = useState<string>('user123'); // Replace with actual user ID from auth context

  useEffect(() => {
    if (selectedBlog) {
      const fetchBlogData = async () => {
        const blogRef = doc(db, 'blogs', selectedBlog.id || '');
        const blogDoc = await getDoc(blogRef);
        if (blogDoc.exists()) {
          const data = blogDoc.data();
          setLikes(data.likes ? data.likes.length : 0);
          setComments(data.comments || []);
        }
      };
      fetchBlogData();
    }
  }, [selectedBlog]);

  const handleBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const handleClose = () => {
    setSelectedBlog(null);
    setNewComment('');
  };

  const handleLike = async () => {
    if (selectedBlog) {
      const blogRef = doc(db, 'blogs', selectedBlog.id || '');
      const blogDoc = await getDoc(blogRef);

      if (blogDoc.exists()) {
        const data = blogDoc.data();
        const userHasLiked = data.likes && data.likes.some((like: any) => like.userId === userId);

        if (!userHasLiked) {
          await updateDoc(blogRef, {
            likes: arrayUnion({ userId })
          });
          setLikes(prevLikes => prevLikes + 1);
        } else {
          alert('You have already liked this blog.');
        }
      }
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '' || !selectedBlog) return;

    const blogRef = doc(db, 'blogs', selectedBlog.id || '');
    await updateDoc(blogRef, {
      comments: arrayUnion({ userId, comment: newComment })
    });

    setComments(prevComments => [...prevComments, { userId, comment: newComment }]);
    setNewComment('');
  };

  return (
    <div>
      <div className="w-full p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div 
            key={blog.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-200 hover:border-gray-300"
            onClick={() => handleBlogClick(blog)}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-600 mb-4">by {blog.author}</p>
            <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
              <span>{blog.date}</span> {/* Optional date */}
            </div>
          </div>
        ))}
      </div>
    </div>

      {selectedBlog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <p className="text-sm text-gray-600 mb-2">by {selectedBlog.author}</p>
            <p className="text-sm text-gray-600 mb-2">Date: {selectedBlog.date}</p>
            <p className="text-sm text-gray-600 mb-2">Email: {selectedBlog.email}</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Body Content:</h3>
            <p className="text-gray-800 mb-4">{selectedBlog.body}</p>

            <div className="mb-4">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-4"
                onClick={handleLike}
              >
                Like {likes}
              </button>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Comments:</h4>
                <div className="space-y-2">
                  {comments.map((comment, index) => (
                    <p key={index} className="text-gray-800">{comment.comment}</p>
                  ))}
                </div>
              </div>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                rows={3} // Correctly using number for rows
                className="w-full p-2 border rounded mb-2"
              />
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>

            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogLists;