import { MigrationInterface, QueryRunner } from 'typeorm';

export class renamePublishColumnToPublishedPostTable1666466540664
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('post', 'publish', 'published');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('post', 'published', 'publish');
  }
}
