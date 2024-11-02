import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';
import { Note } from './notes/note.entity';
import { Tag } from './tags/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'notes.db',
      entities: [Note, Tag],
      synchronize: true,
    }),
    NotesModule,
    TagsModule,
  ],
})
export class AppModule {}