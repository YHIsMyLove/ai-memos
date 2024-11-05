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
  ) { }

  async create(createNoteDto: CreateNoteDto) {
    const tags = await Promise.all(
      createNoteDto.tags.map(async name => {
        let tag = await this.tagsRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagsRepository.create({ name: name, noteCount: 1 });
          await this.tagsRepository.save(tag);
        } else {
          tag.noteCount++
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


  // 根据时间和标签查找日记
  async find(createdAt?: Date, tags?: string[]): Promise<Note[]> {
    const query = this.notesRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.tags', 'tag'); // 根据需求加入标签
    if (createdAt) {
      // 使用 DATE 函数进行日期比较
      query.andWhere('DATE(note.createdAt) = DATE(:date)', { date: createdAt });
    }
    if (tags && tags.length > 0) {
      query.andWhere('tag.name IN (:...tags)', { tags });
    }
    return query.getMany();
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

  // 统计本周每天的日记数量
  async countNotesByWeek(date: Date) {
    const startOfWeek = date;
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // 设置为周一（周日为0，因此+1）

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // 设置为周日

    // 创建一个包含本周所有日期的数组
    const allDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date.toISOString().split('T')[0]; // 转换为 YYYY-MM-DD 格式
    });

    // 从数据库获取日记数量
    const notes = await this.notesRepository.createQueryBuilder('note')
      .select('DATE(note.createdAt)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('note.createdAt >= :startOfWeek AND note.createdAt <= :endOfWeek', { startOfWeek, endOfWeek })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();

    // 将查询结果转换为一个对象以便快速查找
    const notesMap = notes.reduce((acc, { date, count }) => {
      acc[date] = count;
      return acc;
    }, {});

    // 生成最终的结果，填补缺失的日期
    const result = allDays.map(date => ({
      date,
      count: notesMap[date] || 0 // 如果没有找到，设为0
    }));

    return result;
  }

  // 统计本月每天的日记数量
  async countNotesByMonth(date: Date) {
    const startOfMonth = date;
    startOfMonth.setDate(1); // 设置为本月第一天
    // 获取当前月份的天数
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0); // 设置为本月最后一天
    const daysInMonth = endOfMonth.getDate();

    // 创建一个包含本月所有日期的数组
    const allDays = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(startOfMonth);
      date.setDate(i + 1);
      return date.toISOString().split('T')[0]; // 转换为 YYYY-MM-DD 格式
    });
    const notes = await this.notesRepository.createQueryBuilder('note')
      .select('DATE(note.createdAt)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('note.createdAt >= :startOfMonth', { startOfMonth })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();
    // 生成最终的结果，填补缺失的日期
    const notesMap = notes.reduce((acc, { date, count }) => {
      acc[date] = count;
      return acc;
    }, {});
    const result = allDays.map(date => ({
      date,
      count: notesMap[date] || 0 // 如果没有找到，设为0
    }));
    return result;
  }
}