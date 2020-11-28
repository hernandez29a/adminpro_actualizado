import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  public emailform = this.fb.group({
    email: ['', [Validators.required, Validators.email] ]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private emailService: EmailService   ) { }

  ngOnInit(): void {
  }


  sendEmail() {
    //esto es lo que se le va a mandar al servicio
    //console.log(this.emailform.value);
    this.emailService.sendMailForgetPassword(this.emailform.value)
      .subscribe( (resp: any) => {

        Swal.fire('El correo se ha enviado sastifactoriamente  ', 'Revise el correo y siga las instrucciones' , 'success');
        this.router.navigateByUrl('/');
        console.log(resp);
      });
  }

}
