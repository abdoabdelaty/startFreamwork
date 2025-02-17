import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  Renderer2,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('boxContainer', { static: true }) boxContainer!: ElementRef;
  @ViewChild('boxItem', { static: true }) boxItem!: ElementRef;
  @ViewChildren('portItem') imgList!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.imgList.forEach((item) => {
      this.renderer.listen(item.nativeElement, 'click', (event) => {
        const img = item.nativeElement.querySelector('img') as HTMLImageElement;
        const imgSrc = img.getAttribute('src');

        if (imgSrc) {
          this.setBoxItemBackground(imgSrc);
        }

        event.stopPropagation();
        this.toggleClasses(item.nativeElement);
      });
    });

    this.renderer.listen('document', 'click', () => {
      this.hideExpandedImage();
    });
  }

  setBoxItemBackground(imageUrl: string) {
    this.renderer.setStyle(
      this.boxItem.nativeElement,
      'background-image',
      `url(${imageUrl})`
    );
  }

  toggleClasses(element: HTMLElement) {
    if (this.boxContainer.nativeElement.classList.contains('d-none')) {
      this.renderer.removeClass(this.boxContainer.nativeElement, 'd-none');
      this.renderer.addClass(this.boxContainer.nativeElement, 'd-flex');
    } else {
      this.renderer.removeClass(this.boxContainer.nativeElement, 'd-flex');
      this.renderer.addClass(this.boxContainer.nativeElement, 'd-none');
    }
  }

  hideExpandedImage() {
    this.renderer.removeClass(this.boxContainer.nativeElement, 'd-flex');
    this.renderer.addClass(this.boxContainer.nativeElement, 'd-none');
  }
}
