import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { AppService } from '../../../../app.service'
import { User } from '../../../../models/user.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      })
    })
  }

  onSubmit() {
    const user: User = {
      email: this.form.value.email
    }
    this.appService.setUser(user)
  }
}
