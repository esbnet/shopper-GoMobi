export class ItemAlreadyExistsError extends Error {
	constructor() {
		super("Registro já existe. 🤦‍♂️");
	}
}
