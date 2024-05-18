import { AssignorService } from './assignor.service';
import { Assignor } from './entities/assignor.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AssignorRepository } from './repositories/assignor-repository';

export const assignorMock = new Assignor('1', 'John', 'john@doe.com', '(81)12345-6789', '123.456.789-12');

export class AssignorRepositoryMock implements AssignorRepository {
  async create() {
    return assignorMock;
  }

  async findById() {
    return assignorMock;
  }
}

describe('Assignor Service', () => {
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorService, { provide: AssignorRepository, useClass: AssignorRepositoryMock }],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(service).toBeInstanceOf(AssignorService);
  });

  it('should create an assignor and return it', async () => {
    const assignor = await service.create(assignorMock);

    expect(assignor).toEqual(assignorMock);
    expect(assignor).toBeInstanceOf(Assignor);
  });

  it('should return an assignor if find by id', async () => {
    const assignor = await service.findById('1');

    expect(assignor).toEqual(assignorMock);
    expect(assignor).toBeInstanceOf(Assignor);
  });

  it('should not return an assignor if find not found', async () => {
    jest.spyOn(AssignorRepositoryMock.prototype, 'findById').mockResolvedValue(null);
    const assignor = await service.findById('1');

    expect(assignor).toBeNull();
  });
});
