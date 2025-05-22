import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {} // 依赖注入

  @Get()
  async findAll(
    @Query('author') author: string,
    @Query('keyword') keyword: string,
  ) {
    // console.log('author', author);
    // console.log('keyword', keyword);

    // throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);

    return this.blogService.findAll(author, keyword);
  }

  @Get(':id')
  // async findOne(@Param('id') id: string) {
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // console.log('id', id);
    return this.blogService.findOne(id);
  }

  @Delete(':id')
  // async remove(@Param('id') id: string) {
  async remove(@Param('id', ParseIntPipe) id: number) {
    // console.log('id', id);
    return this.blogService.remove(id);
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    // console.log('createBlogDto', createBlogDto);
    createBlogDto.author = 'zhangsan'; // 临时写一个作者
    return this.blogService.create(createBlogDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: CreateBlogDto,
  ) {
    // console.log('id', id);
    // console.log('updateBlogDto', updateBlogDto);
    return this.blogService.update(id, updateBlogDto);
  }
}
