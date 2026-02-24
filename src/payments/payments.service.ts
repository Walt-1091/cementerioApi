import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { PaymentEntity } from './payment.entity/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentsRepository: Repository<PaymentEntity>,
  ) {}

  async insert(createDto: CreatePaymentDto): Promise<PaymentEntity> {
    const payment = this.paymentsRepository.create({
      nicheId: createDto.nicheId,
      documentName: createDto.documentName ?? null,
      documentSize: createDto.documentSize ?? null,
      documentMimeType: createDto.documentMimeType ?? null,
      document: createDto.documentBase64 ? this.base64ToBuffer(createDto.documentBase64) : null,
      // paidAt es CreateDateColumn => lo pone la DB/TypeORM
    });

    return this.paymentsRepository.save(payment);
  }

  async update(id: number, updateDto: UpdatePaymentDto): Promise<PaymentEntity> {
    const existing = await this.paymentsRepository.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Payment not found');

    if (updateDto.nicheId !== undefined) existing.nicheId = updateDto.nicheId;
    if (updateDto.documentName !== undefined) existing.documentName = updateDto.documentName ?? null;
    if (updateDto.documentSize !== undefined) existing.documentSize = updateDto.documentSize ?? null;
    if (updateDto.documentMimeType !== undefined) existing.documentMimeType = updateDto.documentMimeType ?? null;
    if (updateDto.documentBase64 !== undefined) {
      existing.document = updateDto.documentBase64 ? this.base64ToBuffer(updateDto.documentBase64) : null;
    }

    return this.paymentsRepository.save(existing);
  }

  /**
   * getPayments: por nicheId. Si no mandas nicheId, devuelve todos.
   */
  async getPayments(nicheId?: number): Promise<PaymentEntity[]> {
    const qb = this.paymentsRepository
      .createQueryBuilder('p')
      .orderBy('p.paidAt', 'DESC');

    if (nicheId) qb.where('p.nicheId = :nicheId', { nicheId });

    return qb.getMany();
  }

  private base64ToBuffer(base64: string): Buffer {
    try {
      // por si viene con prefijo data:...;base64,
      const cleaned = base64.includes('base64,') ? base64.split('base64,')[1] : base64;
      return Buffer.from(cleaned, 'base64');
    } catch {
      throw new BadRequestException('Invalid Base64 document');
    }
  }
}