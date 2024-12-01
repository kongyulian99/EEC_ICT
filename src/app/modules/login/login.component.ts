import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService, FileService, NotificationService, SystemConstants } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';
import { ResponseData } from 'src/app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  private user: any;
  loading: boolean = false;
  dxButtonConfig = dxButtonConfig;

  constructor(
    private router: Router,
    private fileService: FileService,
    private authService: AuthenService,
    private notificationService: NotificationService
  ) { }


  ngOnInit() { }

  onLoggedIn() {
    if(this.loading){
        return;
    }
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
        next: (response: ResponseData) => {
            if (response.Status.Code === -1) {
                this.notificationService.showError(response.Status.Message);
                this.loading = false;
            } else if (response.Status.Code === 1) {
                this.user = response.Data;

                localStorage.removeItem(SystemConstants.CURRENT_USER);
                localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(this.user));

                setTimeout(() => {
                    this.router.navigate(['/administration/dashboard']).then(()=>{
                        this.loading = false;
                    });
                    // this.router.navigate(['/administration/dashboard']).then(()=>{
                    //     this.loading = false;
                    // });
                }, 1000);
                this.notificationService.showSuccess('Login successfully!');
            } else {
                this.loading = false;
            }

        },
        error: (error: any) => {
          this.loading = false;
          this.notificationService.showError('System errorr!');
        }
    });
  }
  downloadTLHDSD(){
  // window.open(`${environment.apiUrl}/DataSupport/TLHDSD/TLHDSD.zip`);
  // window.open(`${environment.BASE_API}/DataSupport/TLHDSD/Tài liệu HDSD - phiên bản đơn vị - VPB.docx`);
  }

  downloadGoogleChrome (index: number) {
      switch( index){
          case 1:
              this.download('ChromeStandaloneSetup64.exe',);
              break;
          case 2:
              this.download('ChromeStandaloneSetup.exe',);
              break;
      }
  }
  download(file: string, fileName?: string){
    this.fileService.download('/DataSupport/Chrome/',file).subscribe({
      next: (res: Blob)=>{
        var reader = new FileReader();
        reader.readAsDataURL(res);
        let that = this;
        reader.onloadend = function() {
          const linkSource = `${reader.result}`;
          const downloadLink = document.createElement("a");
          downloadLink.href = linkSource;
          downloadLink.download = fileName??file;
          downloadLink.click();
        }
      }
    });
  }

}
