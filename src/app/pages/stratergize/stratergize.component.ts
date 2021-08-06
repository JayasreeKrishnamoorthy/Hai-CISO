import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-stratergize',
  templateUrl: './stratergize.component.html',
  styleUrls: ['./stratergize.component.scss'],
})
export class StratergizeComponent implements OnInit {
  contList: any = [
    {
      count: 155,
      name: 'Project',
    },
    {
      count: 155,
      name: 'Domain',
    },
    {
      count: 155,
      name: 'Sub Domain',
    },
  ];
  tabName: any = [
    {
      name: 'SUMMARY',
      status: true,
    },
    {
      name: 'COMPANY PROFILE',
      status: false,
    },
    {
      name: 'TECH VENDORS',
      status: false,
    },
    {
      name: 'SUB DOMAIN',
      status: false,
    },
    {
      name: 'COMPLIANCE STATUS',
      status: false,
    },
    {
      name: 'PRIVACY STATUS',
      status: false,
    },
    {
      name: 'AI&ML',
      status: false,
    },
  ];

  privacyStatus: any = [
    {
      lable: 'Cookie Settings Notice',
      status: true,
    },
    {
      lable: 'Privacy Notice is in place',
      status: true,
    },
    {
      lable: 'Privacy Notice shown as dialog box',
      status: true,
    },
    {
      lable: 'Reference to rights under GDPR provided',
      status: true,
    },
    {
      lable: 'Reference to rights under CCPA provided',
      status: true,
    },
    {
      lable: 'Is there a designated Privacy Officer?',
      status: true,
    },
    {
      lable: 'Is HIPAA in scope?',
      status: true,
    },
    {
      lable: 'Is there a designated HIPAA Officer?',
      status: false,
    },
    {
      lable: 'Is HIPAA training in place?',
      status: false,
    },
    // {
    //   lable: 'Cookie Settings Notice',
    // },
  ];

  currentTab: any = 'SUMMARY';


  constructor() { }

  ngOnInit(): void {
  }

  selectAnalyseTab(val) {
    if (val?.status === false) {
      val.status = true;
      this.currentTab = val?.name;
      this.tabName.forEach(element => {
        if (element?.name !== val?.name) {
          element.status = false;
        }
      });
    }
  }

  radioChange(eve, val) {
    if (val?.lable === 'Is HIPAA in scope?') {
      if (eve.value === '1') {
        this.privacyStatus.forEach(element => {
          element.status = true;
        });
      } else if (eve.value === '2') {
        this.privacyStatus.forEach(element => {
          if (element?.lable === 'Is there a designated HIPAA Officer?') {
            element.status = false;
          }
          if (element?.lable === 'Is HIPAA training in place?') {
            element.status = false;
          }
        });
      }
    }
  }


}
