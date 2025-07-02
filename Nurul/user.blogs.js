import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Blog } from '../models/blogs.models.js';
import { User } from '../models/users.models.js';
import { readFileSync, unlinkSync } from 'fs';
import { marked } from 'marked';

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).sort({ 'createdAt': -1, 'updateAt': -1 });
        const data = { blogs };
        res.render('blogs', data);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        next(error);
    }
};

export const getBlogs = async (req, res, next) => {
    try {
        const skip = parseInt(req.params.skip) || 0;
        const blogs = await Blog.find({})
            .sort({ 'createdAt': -1, 'updateAt': -1 })
            .skip(skip)
            .limit(10);
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error getting blogs with skip:', error.message);
        next(error);
    }
};

export const getAllUserBlogs = async (req, res, next) => {
    try {
        const user = req?.user;
        if (!user) throw new ApiError(404, 'user details are not present');

        const blogs = await Blog.find({ authorId: user._id });
        const data = {
            userName: user.name,
            blogs
        };
        res.render('userDashboard', data);
    } catch (error) {
        console.error('Error fetching user blogs:', error.message);
        next(error);
    }
};

export const createBlog = async (req, res, next) => {
    try {
        let { title, description, content } = req.body;
        if (!title || !description || !content) {
            throw new ApiError(400, 'Provide all fields');
        }

        title = title.trim();
        description = description.trim();
        content = content.trim();

        const coverImage = req.file;
        if (!coverImage) throw new ApiError(400, 'Cover image is required');

        const coverimageBuffer = Buffer.from(readFileSync(coverImage.path));

        const blog = await Blog.create({
            title,
            description,
            content,
            coverimage: coverimageBuffer,
            imageMimeType: coverImage.mimetype,
            authorId: req.user._id,
            authorName: req.user.name
        });

        await User.findByIdAndUpdate(
            req.user._id,
            { '$push': { 'blogs': blog._id } }
        );

        unlinkSync(coverImage.path);
        console.log(`New blog created by ${req.user.email}: ${title}`);

        res.status(201).redirect('/user/dashboard');
    } catch (error) {
        console.error('Error creating blog:', error.message);
        next(error);
    }
};

export const editBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        if (!blogId) throw new ApiError(402, 'blog id not provided');

        const { title, description, content } = req.body;
        const coverImage = req?.file;

        const update = {
            $set: {
                'title': title.trim(),
                'description': description.trim(),
                'content': content.trim()
            }
        };

        if (coverImage) {
            const imageBuffer = Buffer.from(readFileSync(coverImage.path));
            unlinkSync(coverImage.path);
            update.$set.coverimage = imageBuffer;
            update.$set.imageMimeType = coverImage.mimetype;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, update, {
            returnOriginal: false
        });

        if (!updatedBlog) throw new ApiError(404, 'Blog not found for update');

        console.log(`Blog updated: ${updatedBlog._id}`);
        res.status(200).redirect('/user/dashboard');
    } catch (error) {
        console.error('Error editing blog:', error.message);
        next(error);
    }
};

export const viewBlog = async (req, res, next) => {
    try {
        const blogId = req.params?.id;
        if (!blogId) throw new ApiError(401, 'blog id not provided');

        const blog = await Blog.findById(blogId);
        if (!blog) throw new ApiError(404, 'Blog not found');

        blog.content = marked(blog.content);

        const data = { blog };
        res.render('viewBlog', data);
    } catch (error) {
        console.error('Error viewing blog:', error.message);
        next(error);
    }
};

export const deleteBlog = async (req, res, next) => {
    try {
        const blogId = req.params?.id;
        if (!blogId) throw new ApiError(401, 'blog id not provided');

        const result = await Blog.deleteOne({ _id: blogId });
        if (result.deletedCount === 0) throw new ApiError(404, 'Blog not found to delete');

        const user = await User.updateOne(
            { _id: req.user._id },
            { $pull: { blogs: blogId } }
        );

        console.log(`Blog deleted: ${blogId} by user ${req.user.email}`);
        res.status(200).send(new ApiResponse(200, 'blog deleted successfully'));
    } catch (error) {
        console.error('Error deleting blog:', error.message);
        next(error);
    }
};
