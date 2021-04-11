
export class AttendanceDto {
  tenantId?: string;
  employeeId?: string;
  dateTimeIn?: string;
  dateTimeOut?: string;
  location: string;
  deviceId: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  creationTime: string;
  creatorId?: string;
  id: string;

  constructor(initialValues: Partial<AttendanceDto> = {}) {

  }
}
