import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>
  
  `,styles:[`    .proInfodd3 {
    height: .3rem;
    background: #e2d6c6;
    border-radius: 20px;
    overflow: hidden;
    margin: .6rem 0;
}

.proInfodd3>div {
    height: 100%;
    background: #ad8f5f;
}`]
})
export class AppComponent  { name = 'Angular'; }
