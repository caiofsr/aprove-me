import { Injectable } from '@nestjs/common';
import { AssignorRepository } from './repositories/assignor-repository';
import { CreateAssignorDto } from './dto/create-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private assignorRepository: AssignorRepository) {}

  async create(createAssignorDto: CreateAssignorDto) {
    return this.assignorRepository.create(createAssignorDto);
  }
}