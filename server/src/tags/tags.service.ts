import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) { }

  async findAll() {

    try {
      const tags = await this.tagsRepository.find()
      return tags
    } catch (error) {
      Logger.error(error)
    }

    // const tags = await this.tagsRepository
    //   .createQueryBuilder('tag')
    //   .leftJoinAndSelect('tag.notes', 'note')
    //   .select(['tag.id', 'tag.name'])
    //   .addSelect('COUNT(note.id)', 'noteCount')
    //   .groupBy('tag.id')
    //   .getRawMany();
    // return tags.map(tag => ({
    //   id: tag.tag_id,
    //   name: tag.tag_name,
    //   count: parseInt(tag.noteCount, 10) || 0,
    // }));
  }

  async create(createNoteDto: CreateTagDto) {
    const newTag = this.tagsRepository.create({ name: createNoteDto.name, noteCount: createNoteDto.noteCount });
    return await this.tagsRepository.save(newTag);
  }

  async remove(id: string) {
    return await this.tagsRepository.delete(id);
  }
}