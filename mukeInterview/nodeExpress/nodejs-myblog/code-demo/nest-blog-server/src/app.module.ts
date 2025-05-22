import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Blog } from './blog/blog.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'Mysql_2019',
      // database: 'nestjs_blog', // 新建的数据库名字

      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE, // 新建的数据库名字

      entities: [Blog, User],
      synchronize: true, //【注意】synchronize: true 不能被用于生产环境，否则您可能会丢失生产环境数据
    }),

    BlogModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
