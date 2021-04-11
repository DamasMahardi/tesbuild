import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { EmployeeInformation } from '@app-models';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UtilService } from '@app/services/util.service';
import { environment } from '@environments/environment.prod';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {

  dateList: any[] = [];
  pdfObject: any;
  employee: EmployeeInformation = new EmployeeInformation();
  selectedPeriod: Date;
  enableButtonDownload: boolean = false;
  fileTransfer: FileTransferObject;

  constructor(
    private storage: Storage,
    private file: File,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.storage.get(`hure_${environment.appName}_employee`).then((employee) => {
      if (employee) {
        this.employee = new EmployeeInformation(employee);
        this.generatePdf();
      }
    })
    
    let dateList = [];
    for (let i = 0; i < 4; i++) {
      let _today = new Date();
      let date = new Date(_today.setMonth(_today.getMonth() - i));
      dateList.push(new Date(date));
      
      if (i === 3) {
        dateList.splice(0, 1);
        this.dateList = dateList;
      }
    }
  }

  changePeriod(date: Date) {
    this.enableButtonDownload = false;
    this.selectedPeriod = new Date(date);
    this.generatePdf();
  }

  generatePdf() {
    let today = moment().format('DD MMM YYYY'),
      period = null,
      start = this.selectedPeriod 
            ? moment(new Date(this.selectedPeriod)).startOf('month')['_d']
            : moment(this.dateList[0]).startOf('month')['_d'],

      end = this.selectedPeriod 
          ? moment(new Date(this.selectedPeriod)).endOf('month')['_d']
          : moment(this.dateList[0]).endOf('month')['_d'];

    period = `Periode: ${moment(start).date()} - ${moment(end).format('DD MMM YYYY')}`;

    var docDefinition = {
      content: [
        {
          width: '100%',
          alignment: 'center',
          text: 'SLIP GAJI KARYAWAN',
          bold: true,
          margin: [0, 10, 0, 10],
        },
        {
          text: '__________________________',
          alignment: 'center',
          margin: [0, -20, 0, 0],
          bold: true,
        },
        {
          text: period,
          alignment: 'center',
        },
        '\n',
        {
          table: {
            headerRows: 1,
            widths: [80, 10, '*'],
            body: [
              [
                {
                  text: 'NAMA',
                  border: [false, false, false, false],
                  textTransform: 'uppercase',
                },
                {
                  text: ':',
                  border: [false, false, false, false],
                  alignment: 'left',
                  textTransform: 'uppercase',
                },
                {
                  text: this.employee.fullName,
                  border: [false, false, false, false],
                  alignment: 'left',
                  textTransform: 'uppercase',
                },
              ],
              [
                {
                  text: 'NIK',
                  border: [false, false, false, false],
                  textTransform: 'uppercase',
                },
                {
                  text: ':',
                  border: [false, false, false, false],
                  alignment: 'left',
                  textTransform: 'uppercase',
                },
                {
                  text: this.employee.employeeNumber,
                  border: [false, false, false, false],
                  alignment: 'left',
                  textTransform: 'uppercase',
                },
              ],
              [
                {
                  text: 'Jabatan',
                  border: [false, false, false, false],
                },
                {
                  text: ':',
                  border: [false, false, false, false],
                  alignment: 'left',
                  textTransform: 'uppercase',
                },
                {
                  text: this.employee.jobTitleName,
                  border: [false, false, false, false],
                  alignment: 'left',
                  textTransform: 'uppercase',
                },
              ],
            ],
          },
        },

        {
          columns: [
            {
              text: 'PENGHASILAN',
              bold: true,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'POTONGAN',
              bold: true,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [130, 25, 80, 150, 50, 80],

            body: [
              [
                {
                  text: 'Gaji Pokok',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '3.751.200',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'JHT (2%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '44.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
              [
                {
                  text: 'Tj. Tetap :',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'Jaminan Pensiun (1%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '72.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
              [
                {
                  text: '-  Lembur Tetap',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '3.240.400',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                }
              ],
              [
                {
                  text: '-  Tj. Cuti',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '208.400',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                }
              ],

              [
                {
                  text: 'Tj. Tidak tetap :',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: 'BPJS Kesehatan (1%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '60.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
              [
                {
                  text: 'Tunjangan',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '432.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'PPh 21',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '138.720',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ]
              // END Items
            ]
          }, // table
          //  layout: 'lightHorizontalLines'
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [105, 50, 80, 150, 50, 80],

            body: [
              [
                {
                  text: 'Lembur',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '18Jam',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '444.221',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'Pinjaman',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '1.000.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
            ]

          }

        },

        {
          columns: [
            {
              text: 'Benefit Perusahaan :',
              bold: true,
              fontSize: 11,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'Telah Dibayarkan Perusahaan :',
              bold: true,
              fontSize: 11,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [130, 25, 80, 150, 50, 80],

            body: [
              [
                {
                  text: '- JKK & JKM (0,54%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '38.880',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'JKK & JKM (0,54%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '38.880',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],

              [
                {
                  text: '- JHT (3,7%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '266.400',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'JHT (3,7%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '266.400',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
              [
                {
                  text: '- Jaminan Pensiun (2%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '144.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'Jaminan Pensiun (2%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '144.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
              [
                {
                  text: '- BPJS Kesehatan (4%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '240.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'BPJS Kesehatan (4%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '240.000',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
              [
                {
                  text: '- JKK & JKM (0,54%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '38.880',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: 'JKK & JKM (0,54%)',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  fontSize: 11,
                },
                {
                  text: '38.880',
                  border: [false, false, false, false],
                  fontSize: 11,
                }
              ],
              [
                {
                  text: 'TOTAL PENGHASILAN',
                  border: [false, false, false, false],
                  bold: true,
                  fontSize: 12,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  bold: true,
                  fontSize: 12,
                },
                {
                  text: '8.765.501',
                  border: [false, false, false, false],
                  bold: true,
                  fontSize: 12,
                },
                {
                  text: 'TOTAL POTONGAN',
                  border: [false, false, false, false],
                  bold: true,
                  fontSize: 12,
                },
                {
                  text: '=',
                  border: [false, false, false, false],
                  bold: true,
                  fontSize: 12,
                },
                {
                  text: '2.104.000',
                  border: [false, false, false, false],
                  bold: true,
                  fontSize: 12,
                }
              ],
              // END Items
            ]
          }, // table
          //  layout: 'lightHorizontalLines'
        },

        '\n',
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*'],

            body: [
              [
                {
                  text: 'TOTAL GAJI DAN THR DIBAYARKAN : Rp 6.661.501,00',
                  border: [false, true, false, true],
                  alignment: 'center',
                  bold: true,
                  fontSize: 14,
                },
              ],
              [
                {
                  text: 'terbilang enam juta enam ratus enam puluh satu ribu lima ratus satu rupiah',
                  border: [false, true, false, true],
                  alignment: 'center'
                },
              ],
              // END Items
            ]
          }, // table
          //  layout: 'lightHorizontalLines'
        },
        '\n',
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 200],

            body: [
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: `Jakarta, ${today}`,
                  border: [false, false, false, false],
                  alignment: 'center'
                },
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: 'PT. Idooh Bersama Indonesia',
                  border: [false, false, false, false],
                  alignment: 'center',
                  bold: true,
                  fontSize: 14,
                },
              ],
              [
                {
                  text: '\n\n\n',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                  alignment: 'center',
                  bold: true,
                  fontSize: 14,
                },
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                  alignment: 'center',
                },
                {
                  text: 'Diana Sinaga',
                  border: [false, false, false, false],
                  alignment: 'center',
                  bold: true,
                  fontSize: 14,
                },
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                  alignment: 'center',
                },
                {
                  text: '__________________',
                  border: [false, false, false, false],
                  alignment: 'center',
                  bold: true,
                  fontSize: 14,
                  margin: [0, -20, 0, 3],
                },
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                  alignment: 'center',
                },
                {
                  text: 'HR & GA Manager',
                  border: [false, false, false, false],
                  alignment: 'center',
                  margin: [0, -10, 0, 0],
                  bold: true,
                  fontSize: 14,
                },
              ],
              // END Items
            ]
          }, // table
          //  layout: 'lightHorizontalLines'
        },
        {
          text: 'Catatan:',
          style: 'notesTitle',
          margin: [0, 0, 0, 0],
        },
        {
          text: 'Slip gaji ini hanya dapat diketahui oleh karyawan yang bersangkutan dan perusahaan yang diwakili oleh pejabat yang diberikan wewenang. Sehingga menyebarkan informasi gaji tersebut dapat dikategorikan sebagai pelanggaran berat atas pembocoran rahasia perusahaan.',
          style: 'notesText',
          margin: [0, 0, 0, 0],
        },
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    }

    this.pdfObject = pdfMake.createPdf(docDefinition);
    this.enableButtonDownload = true;
  }

  // openPDF(): void {
  //   this.pdfObject.open();
  // }


  downloadPDF(): void {
    this.utilService.loadingPresent('Please wait...');
    this.pdfObject.getBase64((base64) => {
      let fileName = this.selectedPeriod
                    ? `Payslip_${this.employee.fullName.replace(/\s/g, '_')}_${moment(this.selectedPeriod).format('MMM_YYYY')}.pdf`
                    : `Payslip_${this.employee.fullName.replace(/\s/g, '_')}_${moment(this.dateList[0]).format('MMM_YYYY')}.pdf`;
      let dirName = "Hure";

      this.file.createDir(this.file.externalRootDirectory, dirName, true)
        .then((dirEntry) => {
          console.log('Succ create folder:', dirEntry);

          this.file.checkFile(dirEntry.toURL(), fileName)
            .then(() => {
              this.utilService.loadingDismiss();
              setTimeout(() => {
                this.fileOpener.open(dirEntry.toURL() + fileName, 'application/pdf');
              }, 1000);

            }).catch(() => {

              this.fileTransfer = this.transfer.create();
              this.fileTransfer.download(`data:application/pdf;base64, ${base64}`, dirEntry.toURL() + fileName);

              this.file.writeFile(dirEntry.toURL(), 'PaySlip', fileName, { replace: true })
                .then(() => {
                  this.utilService.loadingDismiss();

                  setTimeout(() => {
                    this.fileOpener.open(dirEntry.toURL() + fileName, 'application/pdf');
                  }, 1000);

                });
            })

        }).catch((error) => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Failed to Download Pay Slip !', 'top')
          console.log('Create folder failed ! :', error)
        });
    });
  }
}
