import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';
import { Note } from 'src/notes/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Note])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule { }