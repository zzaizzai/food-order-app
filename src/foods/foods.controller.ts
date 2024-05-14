import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UseGuards, ParseIntPipe, Logger } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('foods')
export class FoodsController {
  private logger = new Logger('FoodsController')
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  create(@Body() createFoodDto: CreateFoodDto, @GetUser() user: User, @Req() req) {
    this.logger.verbose(`User ${user?.username} creating a new food
    Payload: ${JSON.stringify(createFoodDto)}`)
    return this.foodsService.createOne(createFoodDto, user);
  }

  @Get('/all')
  findAll(@GetUser() user: User){
    this.logger.verbose(`User ${user?.username} trying to get all boards`)
    return this.foodsService.findAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User
  ): Promise<void> {
    return this.foodsService.deleteFood(id, user)
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/owns')
  findOwns(@GetUser() user: User){
    return this.foodsService.findOwnsAll(user)
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.foodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id);
  }
}
