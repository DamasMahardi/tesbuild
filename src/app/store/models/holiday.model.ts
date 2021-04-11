export class Holiday {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;

    tenantId: string;
    date: string;
    isLeave: boolean;
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
        this.date = model.date || null;
        this.isLeave = model.isLeave || false;
        this.description = model.description || null;
    }
}