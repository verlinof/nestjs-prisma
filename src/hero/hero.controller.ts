import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PassThrough } from 'stream';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  @HttpCode(200) //Contoh decorator untuk custom httpcode
  index(@Res() response) {
    return response.json({ message: 'Hello Hero' }); //Response dengan @Res
  }

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res({ passthrough: true }) response) {
    //jadi di response kita harus menuliskan Passthrough
    response.cookie('key', 'value'); // Ini kan make library Express
    return `Hero ${id}`; // Tapi return valuenya pake library Nest
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }
}
