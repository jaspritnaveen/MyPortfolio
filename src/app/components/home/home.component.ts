import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.initTextRotation();
  }

  initTextRotation(): void {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      const toRotate = el.getAttribute('data-rotate');
      const period = el.getAttribute('data-period');
      if (toRotate) {
        new TxtRotateClass(
          el,
          JSON.parse(toRotate),
          parseInt(period ?? '2000', 10)
        );
      }
    }
  }
}

class TxtRotateClass {
  private toRotate: string[];
  private el: HTMLElement;
  private loopNum = 0;
  private period: number;
  private txt = '';
  private isDeleting = false;

  constructor(el: HTMLElement, toRotate: string[], period: number) {
    this.toRotate = toRotate;
    this.el = el;
    this.period = period;
    this.tick();
  }

  tick(): void {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    const wrap = this.el.querySelector('.wrap');
    if (wrap) {
      wrap.innerHTML = this.txt;
    }

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}
