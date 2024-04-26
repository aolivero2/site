import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SiteService {
  constructor (@InjectModel(Site) private siteModule: typeof Site, private sequelize: Sequelize){
  }
  async create(createSiteDto: CreateSiteDto) {
    const transaction = await this.sequelize.transaction();
    try {

      const site = await this.siteModule.create({
        name: createSiteDto.name, address: createSiteDto.address, neighborhood: createSiteDto.neighborhood
      }, {transaction});

      await transaction.commit();
      return site;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  findAll() {
    return this.siteModule.findAll();
  }

  findOne(id: number) {
    return this.siteModule.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateSiteDto: UpdateSiteDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const siteUpdate = await this.siteModule.findByPk(id,{transaction});
      if(siteUpdate == null){
       await transaction.rollback();
       return null;
      }
      
      const [rows, [updatedSite]] = await this.siteModule.update({
        name: updateSiteDto.name, address: updateSiteDto.address, neighborhood: updateSiteDto.neighborhood
      },{where: {id},transaction, returning: true});

      await transaction.commit();
      return updatedSite;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
