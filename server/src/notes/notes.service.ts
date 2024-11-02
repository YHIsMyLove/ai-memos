import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { Tag } from '../tags/tag.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const tags = await Promise.all(
      createNoteDto.tags.map(async name => {
        let tag = await this.tagsRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagsRepository.create({ name });
          await this.tagsRepository.save(tag);
        }
        return tag;
      })
    );

    const note = this.notesRepository.create({
      content: createNoteDto.content,
      tags
    });

    return this.notesRepository.save(note);
  }

  async findAll() {
    return this.notesRepository.find({
      relations: ['tags'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['tags']
    });
    
    if (!note) {
      return { affected: 0 };
    }

    return this.notesRepository.remove(note);
  }
}