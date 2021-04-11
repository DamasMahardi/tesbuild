import { ApprovalStatus, Education, EmployeeChangeDataType, Gender, Marital, Nationality, Ptkp, Relationship, Religion } from '../enums';
import { BloodType } from '../enums/blood-type';
import { AttachmentDescriptor, AttachmentDescriptorCreateUpdate } from './attachment-descriptor';
import { Employee } from './employee.model';

export class EmployeeRequestChangeWithNavigationProperties {
    employeeRequestChange: EmployeeRequestChange;
    employee: Employee;
    approved1: Employee;
    approved2: Employee;
    approved3: Employee;
    approved4: Employee;
    approved5: Employee;
    attachment: AttachmentDescriptor[];

    constructor(model?) {
        model = model || {};
        this.employeeRequestChange = model.employeeRequestChange || new EmployeeRequestChange();
        this.employee = model.employee || new Employee();
        this.approved1 = model.approved1 || new Employee();
        this.approved2 = model.approved2 || new Employee();
        this.approved3 = model.approved3 || new Employee();
        this.approved4 = model.approved4 || new Employee();
        this.approved5 = model.approved5 || new Employee();
        this.attachment = model.attachment || new AttachmentDescriptor();
    }
}

export class EmployeeRequestChange {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;

    tenantId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
    birthDate: string;
    birthPlace: string;
    gender: Gender;
    nationality: Nationality;
    photo: string;
    religion: Religion;
    marital: Marital;
    education: Education;
    street: string;
    city: string;
    stateProvince: string;
    zipPostal: string;
    phone: string;
    fax: string;
    email: string;
    bankAccount: string;
    nik: string;
    npwp: string;
    ptkp: Ptkp;
    bloodType: BloodType;
    marriageDate: string;
    degree: string;
    faculty: string;
    major: string;
    instituteName: string;
    graduationYear: string;
    gPA: string;
    businessPhone: string;
    businessEmail: string;
    familyCardNumber: string;
    bpjsKsNumber: string;
    bpjsFaskes: string;
    bpjsKsStatus: string;
    bpjsTkNumber: string;
    passportNumber: string;
    district: string;
    subDistrict: string;
    domicileAddress: string;
    addressAccordingtoId: string;
    savingBookNumber: string;
    bankName: string;
    description: string;
    comment: string;
    employeeChangeDataStatus: ApprovalStatus;
    employeeChangeDataHrdStatus: ApprovalStatus;
    approved1ById: string;
    approved1DateTime: Date;
    approved1Status: ApprovalStatus;
    approved2ById: string;
    approved2DateTime: Date;
    approved2Status: ApprovalStatus;

    approved3ById : string;
    approved3DateTime : Date;
    approved3Status : ApprovalStatus;
    
    approved4ById : string;
    approved4DateTime : Date;
    approved4Status : ApprovalStatus;
    
    approved5ById : string;
    approved5DateTime : Date;
    approved5Status : ApprovalStatus;  
    employeeId: string;
    employeeChangeDataType: EmployeeChangeDataType;
    relationship: Relationship;
    isEmergencyContact: boolean;
    attachments: AttachmentDescriptorCreateUpdate[];

    constructor(model?) {
        model = model || {};
        this.id = model.id || null;
        this.creationTime = model.creationTime || null;
        this.creatorId = model.creatorId || null;
        this.lastModificationTime = model.lastModificationTime || null;
        this.lastModifierId = model.lastModifierId || null;

        this.tenantId = model.tenantId || null;
        this.firstName = model.firstName || null;
        this.middleName = model.middleName || null;
        this.lastName = model.lastName || null;
        this.fullName = model.fullName || null;
        this.birthDate = model.birthDate || null;
        this.birthPlace = model.birthPlace || null;
        this.gender = model.gender || Gender.Undefined;
        this.nationality = model.nationality || Nationality.Undefined;
        this.photo = model.photo || null;
        this.religion = model.religion || Religion.Undefined;
        this.marital = model.marital || Marital.Undefined;
        this.education = model.education || Education.Undefined;
        this.street = model.street || null;
        this.city = model.city || null;
        this.stateProvince = model.stateProvince || null;
        this.zipPostal = model.zipPostal || null;
        this.phone = model.phone || null;
        this.fax = model.fax || null;
        this.email = model.email || null;
        this.bankAccount = model.bankAccount || null;
        this.nik = model.nik || null;
        this.npwp = model.npwp || null;
        this.ptkp = model.Ptkp || Ptkp.TK0;
        this.bloodType = model.bloodType || BloodType.Undefined;
        this.marriageDate = model.marriageDate || null;
        this.degree = model.degree || null;
        this.faculty = model.faculty || null;
        this.major = model.major || null;
        this.instituteName = model.instituteName || null;
        this.graduationYear = model.graduationYear || null;
        this.gPA = model.gPA || null;
        this.businessEmail = model.businessEmail || null;
        this.businessPhone = model.businessPhone || null;
        this.familyCardNumber = model.familyCardNumber || null;
        this.bpjsKsNumber = model.bpjsKsNumber || null;
        this.bpjsFaskes = model.bpjsFaskes || null;
        this.bpjsKsStatus = model.bpjsKsStatus || null;
        this.bpjsTkNumber = model.bpjsTkNumber || null;
        this.passportNumber = model.passportNumber || null;
        this.district = model.district || null;
        this.subDistrict = model.subDistrict || null;
        this.domicileAddress = model.domicileAddress || null;
        this.addressAccordingtoId = model.addressAccordingtoId || null;
        this.savingBookNumber = model.savingBookNumber || null;
        this.bankName = model.bankName || null;
        this.description = model.description || null;
        this.comment = model.comment || null;
        this.employeeChangeDataStatus = model.employeeChangeDataStatus || ApprovalStatus.AskApproval;
        this.employeeChangeDataHrdStatus = model.employeeChangeDataHrdStatus || ApprovalStatus.AskApproval;
        
        this.approved1ById = model.approved1ById || null;
        this.approved1DateTime = model.approved1DateTime || null;
        this.approved1Status = model.approved1Status || ApprovalStatus.AskApproval;
        this.approved2ById = model.approved2ById || null;
        this.approved2DateTime = model.approved2DateTime || null;
        this.approved2Status = model.approved2Status || ApprovalStatus.AskApproval;

        this.approved3ById = model.approved3ById || null;
        this.approved3DateTime = model.approved3DateTime || null;
        this.approved3Status = model.approved3Status || ApprovalStatus.AskApproval;

        this.approved4ById = model.approved4ById || null;
        this.approved4DateTime = model.approved4DateTime || null;
        this.approved4Status = model.approved4Status || ApprovalStatus.AskApproval;

        this.approved5ById = model.approved5ById || null;
        this.approved5DateTime = model.approved5DateTime || null;
        this.approved5Status = model.approved5Status || ApprovalStatus.AskApproval;

        this.employeeId = model.employeeId || null;
        this.employeeChangeDataType = model.employeeChangeDataType || EmployeeChangeDataType.IdCardNumber;
        this.relationship = model.relationship || Relationship.Undefined;
        this.isEmergencyContact = model.isEmergencyContact || false;
        this.attachments = model.attachment || [];
    }
}