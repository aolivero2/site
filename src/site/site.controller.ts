import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createSiteDto: CreateSiteDto, @Res({passthrough: true}) response: Response) {
    try {
      response.status(HttpStatus.CREATED);
      return this.siteService.create(createSiteDto);
    } catch (error) {
      console.log(error);
      response.status(500).json({message: "Error al guardar el sitio"});
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.siteService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res({passthrough: true}) response: Response) {
    try {
      const site = await this.siteService.findOne(+id);
      if(site == null){
        return response.status(404).json({message: "No se encontró el sitio"});
      }
      response.status(HttpStatus.OK);
      return site;
    } catch (error) {
      console.log(error);
      response.status(500).json({message: "Error al consultar el sitio"});
    }
    
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto, @Res({passthrough: true}) response: Response) {
    try {
      const site = await this.siteService.update(+id,updateSiteDto);
      if(site == null){
        return response.status(404).json({message: "No se encontró el sitio"});
      }
      response.status(HttpStatus.OK);
      return site;
    } catch (error) {
      console.log(error);
      response.status(500).json({message: "Error al consultar el sitio"});
    }
    return this.siteService.update(+id, updateSiteDto);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(+id);
  }
}
