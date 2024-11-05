import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  create(@Body() createNoteDto: CreateTagDto) {
    return this.tagsService.create(createNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}