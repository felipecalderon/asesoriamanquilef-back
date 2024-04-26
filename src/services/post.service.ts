import { Post } from "@prisma/client";
import { prisma } from "../prisma.config";

export const findPostDB = async (postId: string) => {
    try {        
        const singlePost: Post | null = await prisma.post.findFirst({
            where: {
                id: postId,
            },
        });
        return singlePost
    } catch (error) {
        console.log(error);
        return null
    }
}

export const findAllPostsDB = async () => {
    try {        
        const allPosts: Post[] = await prisma.post.findMany();
        return allPosts
    } catch (error) {
        console.log(error);
        return []
    }
}

export const createPostDB = async ({ category, content, image, subtitle, title }: Post) => {
    try {        
        const createPost = await prisma.post.create({
			data: { category, content, image, subtitle, title },
		});
        return createPost
    } catch (error) {
        console.log(error);
        return null
    }
}

export const deletePostDB = async (postId: string) => {
    try {        
        const deletePost = await prisma.post.delete({
            where: {
                id: postId
            }
        });
        return deletePost
    } catch (error) {
        console.log(error);
        return null
    }
}