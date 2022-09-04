import { validateSync } from 'class-validator';
import {
	IEntity,
	EntityValidationError,
	IEntityValidator,
	FieldsErrors,
} from '../';

export class EntityValidator implements IEntityValidator {
	errors: FieldsErrors = {};

	constructor(private entity: IEntity) {
		this.entity = entity;
	}

	validate(entity: string): void {
		const errors = validateSync(this.entity);

		if (errors.length > 0) {
			for (const error of errors) {
				const field = error.property;
				this.errors[field] = {
					error: Object.values(error.constraints),
					value: error.value,
				};
			}

			throw new EntityValidationError(entity, this.errors, 400);
		}
	}
}
