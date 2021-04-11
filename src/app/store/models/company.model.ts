export class Company {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;

    tenantId: string;
    code: string;
    companyType: number;
    name: string;
    fullName: string;
    photo: string;
    profile: string;
    description: string;
    webSite: string;
    street: string;
    city: string;
    province: string;
    zipPostal: string;
    phone: string;
    fax: string;
    email: string;
    npwp: string;
    address: string;
    officeType: number;
    establishDate: string;

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
        this.companyType = model.companyType || 0;
        this.name = model.name || null;
        this.fullName = model.fullName || null;
        this.phone = model.photo || null;
        this.profile = model.profile || null;
        this.description = model.description || null;
        this.webSite = model.webSite || null;
        this.street = model.street || null;
        this.city = model.city || null;
        this.province = model.province || null;
        this.zipPostal = model.zipPostal || null;
        this.phone = model.phone || null;
        this.fax = model.fax || null;
        this.email = model.email || null;
        this.address = model.address || null;
        this.officeType = model.officeType || 0;
        this.establishDate = model.establishDate || null;
    }
}