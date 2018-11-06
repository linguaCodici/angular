import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statusSelect = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    // DEBUG: asynchronous validators need to be plug in separately, regular ones in an array
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.forbiddenNameAsyc),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null)
    });
    this.projectForm.setValue({
      projectName: 'enter your project name here',
      mail: 'enter your email here',
      projectStatus: this.statusSelect[0]
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  forbiddenName(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {'projectNameForbidden': true};
    }
    return null;
  }

  forbiddenNameAsyc(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Test') {
            resolve({'projectNameForbidden': true});
          } else {
            resolve(null);
          }
        }, 2000);
      }
    );

    return promise;
  }
}
