import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/band.dto';

import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async getBrands() {
    return await this.brandModel.find().exec();
  }

  async getBrand(id: string) {
    const brand = await this.brandModel.findById(id).exec();

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    

    return brand;
  }

  async createBrand(payload: CreateBrandDto) {
    try {
      const newBrand = new this.brandModel(payload);

      return await newBrand.save();
    } catch (error) {
      if (error.keyPattern.name) {
        throw new BadRequestException(
          `Brand with name ${payload.name} already exists`,
        );
      }
    }
  }

  async updateBrand(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return brand;
  }

  async deleteBrand(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id).exec();

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return brand;
  }
}
