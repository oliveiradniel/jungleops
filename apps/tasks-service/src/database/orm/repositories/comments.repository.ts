import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from '../entities/comment.entity';
import { CommentMapper } from 'src/modules/comments/mappers/comment.mapper';

import type {
  Pagination,
  CreateCommentData,
  TaskComment,
  ListCommentsPagination,
} from '@challenge/shared';

import type { ICommentsRepository } from 'src/database/contracts/comments-repository.contract';

export class CommentsRepository implements ICommentsRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async list(
    taskId: string,
    pagination: Pagination,
  ): Promise<ListCommentsPagination> {
    const { page, size } = pagination;

    const skip = (page - 1) * size;

    const allCommentsCount = await this.commentsRepository.count({
      where: { task: { id: taskId } },
    });

    const listComment = await this.commentsRepository.find({
      take: size,
      skip,
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['task'],
    });

    const comments = CommentMapper.toDomainList(listComment);

    const total = allCommentsCount;
    const totalPages = Math.ceil(allCommentsCount / size);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      comments,
      total,
      totalPages,
      hasNext,
      hasPrevious,
    };
  }

  countByTaskId(taskId: string): Promise<number> {
    return this.commentsRepository.count({ where: { task: { id: taskId } } });
  }

  async create(taskId: string, data: CreateCommentData): Promise<TaskComment> {
    const { userId, comment } = data;

    const registeredComment = this.commentsRepository.create({
      task: { id: taskId },
      userId,
      comment,
    });

    const commentEntity = await this.commentsRepository.save(registeredComment);

    return CommentMapper.toDomain(commentEntity);
  }
}
