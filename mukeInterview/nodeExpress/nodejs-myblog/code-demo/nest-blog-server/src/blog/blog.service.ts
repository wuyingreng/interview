import { Injectable } from '@nestjs/common';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>, // 依赖注入
  ) {}

  async findAll(author: string = '', keyword: string = ''): Promise<Blog[]> {
    // 拼接查询条件（和 sequelize 中一样）
    const whereOpt = {};
    if (author) {
      whereOpt['author'] = author;
    }
    if (keyword) {
      whereOpt['title'] = Like(`%${keyword}%`);
    }

    // 查询结果
    return await this.blogRepository.find({
      where: whereOpt,
    });
  }

  async findOne(id: number): Promise<Blog> {
    return await this.blogRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }

  async create(blog: CreateBlogDto): Promise<Blog> {
    return await this.blogRepository.save(blog);
  }

  async update(id: number, blog: CreateBlogDto): Promise<Blog> {
    const toUpdate = await this.blogRepository.findOneBy({ id });
    const updated = Object.assign(toUpdate, blog);
    return await this.blogRepository.save(updated);
  }
}
