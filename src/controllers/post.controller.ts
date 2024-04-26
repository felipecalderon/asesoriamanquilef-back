import { Request, Response } from 'express';
import { prisma } from '../prisma.config';
import {
	createPostDB,
	deletePostDB,
	findAllPostsDB,
	findPostDB,
} from '../services/post.service';

export const getPosts = async (req: Request, res: Response) => {
	const { postId } = req.query;
	if (postId) {
		const singlePost = await findPostDB(postId as string);
		if (!singlePost) {
			return res.status(201).json({
				message: null,
				error: 'Post no encontrado',
				data: null,
			});
		} else {
			return res.status(200).json({
				message: 'Post encontrado',
				error: null,
				data: singlePost,
			});
		}
	}
	const allPosts = await findAllPostsDB();
	return res.status(200).json({
		message: `${allPosts.length} Posts encontrados`,
		error: null,
		data: allPosts,
	});
};

export const createPost = async (req: Request, res: Response) => {
	const isString = (value: any): boolean =>
		typeof value === 'string' && value.trim() !== '';
	const { category, content, image, subtitle, title } = req.body;
	const fields = { category, content, image, subtitle, title };
	// Identificar campos inválidos
	const invalidFields = Object.entries(fields)
		.filter(([_, value]) => !isString(value))
		.map(([key]) => key);

	// Si hay campos inválidos, devolver error con los nombres de los campos
	if (invalidFields.length > 0) {
		return res.status(200).json({
			message: null,
			error: 'Faltan campos por completar',
			data: invalidFields,
		});
	}
	const newPost = await createPostDB(req.body);
	return res.status(200).json({
		message: 'Post creado',
		error: null,
		data: newPost,
	});
};

export const editPost = async (req: Request, res: Response) => {
	const { postId } = req.query;
	const { category, content, image, subtitle, title } = req.body;
	if (!postId) {
		return res.status(200).json({
			message: null,
			error: 'Es necesario un id del post',
			data: null,
		});
	}
	const post = await findPostDB(postId as string);
	if (!post) {
		return res.status(200).json({
			message: null,
			error: 'La publicación no existe o ya fue eliminada',
			data: null,
		});
	}
	const dataToUpdate = {
		category: category || post.category,
		content: content || post.content,
		image: image || post.image,
		subtitle: subtitle || post.subtitle,
		title: title || post.title,
	};
	const updatedPost = await prisma.post.update({
		data: dataToUpdate,
		where: {
			id: post.id,
		},
	});
	return res.status(200).json({
		message: `Actualizado el post: ${updatedPost.title}`,
		error: null,
		data: updatedPost,
	});
};

export const deletePost = async (req: Request, res: Response) => {
	const { postId } = req.query;
	const postDeleted = await deletePostDB(postId as string);
	if (!postDeleted) {
		return res.status(200).json({
			message: null,
			error: `No se pudo eliminar el post`,
			data: null,
		});
	}
	return res.status(200).json({
		message: `Post eliminado`,
		error: null,
		data: postDeleted,
	});
};
