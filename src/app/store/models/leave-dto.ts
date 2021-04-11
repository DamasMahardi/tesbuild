import { LeaveType, LeaveStatus } from '@app-models';

export class LeaveDto {
  number: string;
  employeeId?: string;
  leaveType: LeaveType;
  dateTimeStart?: string;
  dateTimeEnd?: string;
  lengthHours: number;
  lengthDays: number;
  description: string;
  isApprove: boolean;
  approvedBy?: string;
  dateApproved?: string;
  isRejected: boolean;
  rejectedBy?: string;
  dateRejected?: string;
  comment: string;
  leaveStatus: LeaveStatus;
  lastModificationTime?: string;
  lastModifierId?: string;
  creationTime: string;
  creatorId?: string;
  id: string;

  constructor(initialValues: Partial<LeaveDto> = {}) {

  }
}
