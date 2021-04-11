export class AttachmentDescriptor {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;

    tenantId: string;
    name: string; 
    mimeType: string;
    size: string;
    dataId: string;
    base64Data: string;
    directoryId: string;

    constructor(model?) {
        model = model || {};
        this.id = model.id || null;
        this.creationTime = model.creationTime || null;
        this.creatorId = model.creatorId || null;
        this.lastModificationTime = model.lastModificationTime || null;
        this.lastModifierId = model.lastModifierId || null;
    
        this.tenantId = model.tenantId || null;
        this.name = model.name || null;
        this.mimeType = model.mimeType || null;
        this.size = model.size || null;
        this.dataId = model.dataId || null;
        this.base64Data = model.base64Data || null;
        this.directoryId = model.directoryId || null;
    }
}

export class AttachmentDescriptorCreateUpdate {
    tenantId: string;
    name: string; 
    mimeType: string;
    size: string;
    dataId: string;
    base64Data: string;
    directoryId: string;

    constructor(model?) {
        model = model || {};    
        this.tenantId = model.tenantId || null;
        this.name = model.name || null;
        this.mimeType = model.mimeType || null;
        this.size = model.size || null;
        this.dataId = model.dataId || null;
        this.base64Data = model.base64Data || null;
        this.directoryId = model.directoryId || null;
    }
}