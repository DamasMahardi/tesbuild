export interface IOvertimeDetail {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: Date;
    lastModifierId: string;

    tenantId: string;
    isEmployeeApproved: boolean;
    date: string;
    dateTimeStart: string;
    dateTimeEnd: string;
    lengthHours: number;
    isRejected: boolean;
    rejectedDateTime: string;
    actualDateTimeStart: string;
    actualDateTimeEnd: string;
    actualLengthHours: number;
    isWeekDay: boolean;
    isFriday: boolean;
    workDays: number;
    isCalculated: boolean;
    ratePerHour: number;
    first1: number;
    at2: number;
    at3: number;
    at4: number;
    at5: number;
    first5: number;
    at6: number;
    at7: number;
    first7: number;
    at8: number;
    at9: number;
    at1number: number;
    at11: number;
    totalCalculated: number;
    isCompensate: boolean;
    totalCompensation: number;
    total: number;
    employeeOvertimeId: string;
    employeeId: string;
    rejectedById: string;
}

export class OvertimeDetail implements IOvertimeDetail {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: Date;
    lastModifierId: string;

    tenantId: string;
    isEmployeeApproved: boolean;
    date: string;
    dateTimeStart: string;
    dateTimeEnd: string;
    lengthHours: number;
    isRejected: boolean;
    rejectedDateTime: string;
    actualDateTimeStart: string;
    actualDateTimeEnd: string;
    actualLengthHours: number;
    isWeekDay: boolean;
    isFriday: boolean;
    workDays: number;
    isCalculated: boolean;
    ratePerHour: number;
    first1: number;
    at2: number;
    at3: number;
    at4: number;
    at5: number;
    first5: number;
    at6: number;
    at7: number;
    first7: number;
    at8: number;
    at9: number;
    at1number: number;
    at11: number;
    totalCalculated: number;
    isCompensate: boolean;
    totalCompensation: number;
    total: number;
    employeeOvertimeId: string;
    employeeId: string;
    rejectedById: string;

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
        this.isEmployeeApproved = model.isEmployeeApproved || false;
        this.date = model.date || null;
        this.dateTimeStart = model.dateTimeStart || null;
        this.dateTimeEnd = model.dateTimeEnd || null;
        this.lengthHours = model.lengthHours || 0;
        this.isRejected = model.isRejected || false;
        this.rejectedById = model.rejectedById || null;
        this.rejectedDateTime = model.rejectedDateTime || null;
        this.actualDateTimeStart = model.actualDateTimeStart || null;
        this.actualDateTimeEnd = model.actualDateTimeEnd || null;
        this.actualLengthHours = model.actualLengthHours || 0;
        this.isWeekDay = model.isWeekDay || false;
        this.isFriday = model.isFriday || false;
        this.workDays = model.workDays || 5;
        this.isCalculated = model.isCalculated || false;
        this.ratePerHour = model.ratePerHour || 0;
        this.first1 = model.first1 || 0;
        this.at2 = model.at2 || 0;
        this.at3 = model.at3 || 0;
        this.at4 = model.at4 || 0;
        this.at5 = model.at5 || 0;
        this.first5 = model.first5 || 0;
        this.at6 = model.at6 || 0;
        this.at7 = model.at7 || 0;
        this.first7 = model.first7 || 0;
        this.at8 = model.at8 || 0;
        this.at9 = model.at9 || 0;
        this.at1number = model.at1number || 0;
        this.at11 = model.at11 || 0;
        this.totalCalculated = model.totalCalculated || 0;
        this.isCompensate = model.isCompensate || false;
        this.totalCompensation = model.totalCompensation || 0;
        this.total = model.total || 0;
        this.employeeOvertimeId = model.employeeOvertimeId || null;
        this.employeeId = model.employeeId || null;
        this.rejectedById = model.rejectedById || null;
    }
}