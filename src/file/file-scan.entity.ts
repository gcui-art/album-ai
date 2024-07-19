import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file_album')
export class FileAlbum {
  @PrimaryGeneratedColumn({ name: 'f_id' })
  fId: bigint;

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  fileName: string;

  @Column({ name: 'path', type: 'text' })
  path: string;

  @Column({ name: 'crc', type: 'varchar', length: 64 })
  crc: string;

  @Column({ name: 'status', type: 'varchar', length: 32 })
  status: string;

  @Column({ name: 'content_type', type: 'varchar', length: 64 })
  contentType: string;

  @Column({ name: 'size', type: 'int' })
  size: number;

  @Column({ name: 'desc_ai', type: 'text' })
  descAi: string;

  @Column({ name: 'desc_custom', type: 'text' })
  descCustom: string;

  @Column({ name: 'extra', type: 'text' })
  extra: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
