import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(@Query('date') date: string) {
    const dateObj = new Date(date) || new Date()
    return this.notesService.find(dateObj);
  }
  @Get("findByDate")
  findByDate(@Query('date') date: string) {
    const dateObj = new Date(date) || new Date()
    return this.notesService.find(dateObj);
  }
  @Get("countNotesByWeek")
  countNotesByWeek(@Query('date') date?: string) {
    return this.notesService.countNotesByWeek(new Date(date) || new Date());
  }
  @Get("countNotesByMonth")
  countNotesByMonth(@Query('date') date?: string) {
    return this.notesService.countNotesByMonth(new Date(date) || new Date());
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}