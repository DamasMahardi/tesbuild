
export class AttendanceCreateUpdateDto  {
  employeeId?: string;
  dateTimeIn?: string;
  dateTimeOut?: string;
  location: string;
  deviceId: string;

  constructor(initialValues: Partial<AttendanceCreateUpdateDto> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}
