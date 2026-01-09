import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-banner',
    standalone: true,

    templateUrl: './banner.html',
    styleUrl: './banner.scss'
})
export class Banner implements AfterViewInit {

    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;


    ngAfterViewInit() {
        // Give the DOM a moment to fully render
        setTimeout(() => {
            const video = this.videoPlayer.nativeElement;

            // Ensure properties are set
            video.muted = true;
            video.autoplay = true;
            video.playsInline = true;

            // Load and play
            video.load();

            video.play().catch(error => {
                console.log('Play blocked:', error);
                // Retry on any user interaction
                const retry = () => video.play().catch(() => { });
                document.addEventListener('click', retry, { once: true });
                window.addEventListener('scroll', retry, { once: true, passive: true });
            });
        }, 0);
    }




}