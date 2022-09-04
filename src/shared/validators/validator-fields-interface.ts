type PropertyErrors = {
	error: string[];
	value?: string;
};

export type FieldsErrors = {
	[field: string]: PropertyErrors;
};

export interface IEntityValidator {
	errors: FieldsErrors;
	validate(entity: string): void;
}
