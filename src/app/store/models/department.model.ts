export class Department {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;

    tenantId: string;
    code: string;
    name: string;
    description: string;

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

        this.tenantId = model.tenantId || null;
        this.code = model.code || null;
        this.name = model.name || null;
        this.description = model.description || null;
    }
}