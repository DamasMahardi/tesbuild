export class Country {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;

    code: string;
    name: string;
    codeName: string;
    iso3: string;
    codeNumber: string;

    /**
     * 
     * @param model 
     */
    constructor(model?) {
        model = model || {};
        this.id = model.id || null;
        this.creationTime = model.creationTime || null;
        this.creatorId = model.creatorId || null;
        this.lastModificationTime = model.lastModificationTime || null;
        this.lastModifierId = model.lastModifierId || null;

        this.code = model.code || null;
        this.name = model.name || null;
        this.codeName = model.codeName || null;
        this.iso3 = model.iso3 || null;
        this.codeNumber = model.codeNumber || null;
    }
}