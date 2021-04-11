export class EmployeeLeaveDetail {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: Date;
    lastModifierId: string;
  
    tenantId: string;
    employeeLeaveId: string;
    dateTime: string;
    leaveDetailStatus: number;
    description: string;
    isCompensated: boolean;
    isDeducted: boolean;
  
    constructor(model?) {
      model = model || {};
      this.id = model.id || null;
      this.creationTime = model.creationTime || null;
      this.creatorId = model.creatorId || null;
      this.lastModificationTime = model.lastModificationTime || null;
      this.lastModifierId = model.lastModifierId || null;
  
      this.tenantId = model.tenantId || null;
      this.employeeLeaveId = model.employeeLeaveId || null;
      this.dateTime = model.dateTime || null;
      this.leaveDetailStatus = model.leaveDetailStatus || 0;
      this.description = model.description || null;
      this.isCompensated = model.isCompensated || false;
      this.isDeducted = model.isDeducted || false;
    }
  }