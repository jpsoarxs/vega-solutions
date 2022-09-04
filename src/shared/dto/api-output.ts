import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta';

export class PageDto<T> {
	@ApiProperty({ type: () => PageMetaDto })
	readonly meta: PageMetaDto;

	@IsArray()
	@ApiProperty({ isArray: true })
	readonly data: T[];

	constructor(data: T[], meta: PageMetaDto) {
		this.meta = meta;
		this.data = data;
	}
}
