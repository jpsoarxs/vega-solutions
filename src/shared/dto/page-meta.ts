import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './page-options';

export interface IPageMetaDtoParameters {
	pageOptionsDto: PageOptionsDto;
	itemCount: number;
}

export class PageMetaDto {
	@ApiProperty()
	readonly page: number;

	@ApiProperty()
	readonly limit: number;

	@ApiProperty()
	readonly count: number;

	@ApiProperty()
	readonly pages: number;

	@ApiProperty()
	readonly next_page: boolean;

	@ApiProperty()
	readonly prev_page: boolean;

	constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters) {
		this.count = itemCount;
		this.limit = pageOptionsDto.limit;
		this.pages = Math.ceil(this.count / this.limit);
		this.page = pageOptionsDto.page;
		this.prev_page = this.page > 1;
		this.next_page = this.page < this.pages;
	}
}
