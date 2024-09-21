import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase config

const BlogDetails: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [userId] = useState<string>('user123'); // Replace with real userId

  useEffect(() => {
    const fetchBlogData = async () => {
      const blogRef = doc(db, 'blogs', blogId || '');
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        const data = blogDoc.data();
        setBlog(data);
        setLikes(data.likes ? data.likes.length : 0);
        setComments(data.comments || []);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleLike = async () => {
    const blogRef = doc(db, 'blogs', blogId || '');
    const blogDoc = await getDoc(blogRef);

    if (blogDoc.exists()) {
      const data = blogDoc.data();
      const userHasLiked = data.likes && data.likes.some((like: any) => like.userId === userId);

      if (!userHasLiked) {
        await updateDoc(blogRef, {
          likes: arrayUnion({ userId }),
        });
        setLikes(prevLikes => prevLikes + 1);
      } else {
        alert('You have already liked this blog.');
      }
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '' || !blogId) return;

    const blogRef = doc(db, 'blogs', blogId || '');
    await updateDoc(blogRef, {
      comments: arrayUnion({ userId, comment: newComment }),
    });

    setComments(prevComments => [...prevComments, { userId, comment: newComment }]);
    setNewComment('');
  };

  return (
    <div className="p-6 mx-auto">
      {blog ? (
        <div className="text-neutral-content w-full ">
          <div className="card-body">
            <h2 className=" text-4xl font-KodeMono mb-4">{blog.title}</h2>
            <p className="text-lg mb-4">by {blog.author}</p>
            <p className="text-sm text-gray-400 mb-4">{blog.date}</p>
            <h2 className=" text-2xl font-KodeMono mb-4">Blog :</h2>
            <p className=" mb-6">{blog.body}</p>

            <div className="flex flex-row justify-between items-center mb-4">
              <button
                className="btn btn-primary"
                onClick={handleLike}
              >
                Like {likes}
              </button>
              <div className="card-actions justify-end">
                
              </div>
            </div>

            <div>
              <h2 className=" text-2xl font-KodeMono mb-4">Comments :</h2>
              <div className="space-y-2 mb-4">
                {comments.map((comment, index) => (
                  <p key={index} className="">{comment.comment}</p>
                ))}
              </div>
              
              <textarea 
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              rows={3}
              className="textarea textarea-primary w-full h-40 resize-none" 
              />
              <br/>
              <br/>
              <button
                className="btn btn-primary"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading blog...</p>
      )}
    </div>

  );
};

export default BlogDetails;
