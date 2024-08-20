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
  Req,
  Header,
  Redirect,
  HttpException,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PassThrough } from 'stream';

const heroes = [
  {
    id: 1,
    name: 'Spiderman',
    description: 'Superhero',
  },
  {
    id: 2,
    name: 'Ironman',
    description: 'Superhero',
  },
  {
    id: 3,
    name: 'Hulk',
    description: 'Superhero',
  },
];

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  @HttpCode(200) //Contoh decorator untuk custom httpcode
  index(@Res() response) {
    return response.json({ data: heroes }); //Response dengan @Res
  }

  @Post()
  @Header('Content-Type', 'application/json')
  store(
    @Body() createHeroDto: CreateHeroDto,
    @Req() request,
    @Res({ passthrough: true }) response,
  ) {
    try {
      // return this.heroService.create(createHeroDto);
      // return {
      //   status: 201,
      //   data: request.body,
      // }; // Return dengan library Nest
      heroes.push(createHeroDto);

      return response
        .status(201)
        .json({ message: 'Hero created', data: request.body }); //Response dengan @Res express
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  docs() {
    return { url: 'https://docs.nestjs.com' };
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res({ passthrough: true }) response) {
    //jadi di response kita harus menuliskan Passthrough
    // response.cookie('key', 'value'); // Ini kan make library Express
    const hero = heroes.find((hero) => hero.id === +id);

    if (!hero) {
      throw new HttpException('Hero not found', 404);
    }

    return {
      status: 200,
      data: hero,
    }; // Tapi return valuenya pake library Nest
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const hero = heroes.find((hero) => hero.id === +id);
    if (!hero) {
      throw new HttpException('Hero not found', 404);
    }

    heroes.splice(heroes.indexOf(hero), 1);
    return {
      status: 200,
      message: 'Hero deleted',
      data: heroes,
    };
  }
}
