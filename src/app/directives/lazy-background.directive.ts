import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[lazyBackground]',
  standalone: true
})
export class LazyBackgroundDirective implements OnInit, OnDestroy {
  @Input('lazyBackground') imageUrl!: string;

  private observer?: IntersectionObserver;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.style.backgroundImage = `url(${this.imageUrl})`;
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before visible
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
