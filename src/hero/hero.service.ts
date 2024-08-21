import { HttpException, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [
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

  create(createHeroDto: CreateHeroDto) {
    return this.heroes.push(createHeroDto);
  }

  findAll() {
    return this.heroes;
  }

  findOne(id: number) {
    return this.heroes.find((hero) => hero.id === id);
  }

  update(id: number, updateHeroDto: UpdateHeroDto) {
    const hero = this.heroes.filter((hero) => {
      if (hero.id === +id) {
        hero.name = updateHeroDto.name;
        hero.description = updateHeroDto.description;
      }
    });
    return hero;
  }

  remove(id: number) {
    const hero = this.heroes.find((hero) => hero.id === +id);
    if (!hero) {
      throw new HttpException('Hero not found', 404);
    }
    this.heroes.splice(this.heroes.indexOf(hero), 1);
    return this.heroes;
  }
}
