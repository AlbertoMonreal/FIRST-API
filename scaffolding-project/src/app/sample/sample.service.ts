import { isNumber } from 'lodash';
import { Service } from 'typedi';

import { SampleRepository } from './sample.repository';
import { Sample } from './sample.model';

@Service()
export class SampleService {
  constructor(private readonly sampleRepository: SampleRepository) {}

  async findById(sampleId: number): Promise<Sample> {
    if (!this.isValidId(sampleId)) {
      return Promise.reject(new Error('InvalidSampleIdError'));
    }

    return await this.sampleRepository.findById(sampleId);
  }

  async findAll(): Promise<Sample[]> {
    return await this.sampleRepository.findAll();
  }

  async create(sample: Sample): Promise<Sample> {
    if (!this.isValidSample(sample)) {
      return Promise.reject(new Error('InvalidSampleError'));
    }
    return await this.sampleRepository.create(sample);
  }

  private isValidId(id: any): boolean {
    return id != null && isNumber(id) && id > 0;
  }

  private isValidType(type: any): boolean {
    //Sin contar tampoco con los espacios en blanco al principio y al final de una cadena-> Uso trim()
    return type != null && typeof type == 'string' && type.trim().length > 0;
  }

  private isValidSample(sample: Sample): boolean {
    if (sample?.type) {
      return true;
    } else {
      return false;
    }
  }
  //Digo que hay que borrar.De manera generica.
  async delete(sampleId: number): Promise<Sample> {
    if (!this.isValidId(sampleId)) {
      return Promise.reject(new Error('InvalidSampleIdError'));
    }

    return await this.sampleRepository.delete(sampleId);
  }

    //Digo que hay que actualizar.De manera generica.
    async update(sampleId: number, newType: string): Promise<Sample> {
      if (!this.isValidId(sampleId)) {
        return Promise.reject(new Error('InvalidSampleIdError'));
      }
      if (!this.isValidType(newType)) {
        return Promise.reject(new Error('InvalidSampleTypeError'));
      }
  
      return await this.sampleRepository.update(sampleId,newType);
    }
    
  
}
