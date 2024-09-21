import React from 'react';
import { Blog } from '../types';

type BlogListsProps = {
  blogs: Blog[];
  onBlogClick: (blogId: string) => void; // Add onBlogClick prop
};

const BlogLists: React.FC<BlogListsProps> = ({ blogs, onBlogClick }) => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <div 
            key={blog.id}
            className="card bg-neutral text-neutral-content shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={() => blog.id && onBlogClick(blog.id)} // Only call onBlogClick if id exists
            >
          
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-sm mb-4">by {blog.author}</p>
              <div className="text-sm text-gray-400 flex justify-between items-center w-full">
                <span>{blog.date}</span>
                <div className='flex flex-row gap-[10px]'>
                  <span>{blog.likes?.length || 0} Likes</span> 
                  <span>{blog.comments?.length || 0} Comments</span> 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogLists;
