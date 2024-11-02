import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async findAll() {
    const tags = await this.tagsRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.notes', 'note')
      .select(['tag.id', 'tag.name'])
      .addSelect('COUNT(note.id)', 'noteCount')
      .groupBy('tag.id')
      .getRawMany();

    return tags.map(tag => ({
      id: tag.tag_id,
      name: tag.tag_name,
      count: parseInt(tag.noteCount, 10) || 0,
    }));
  }
}