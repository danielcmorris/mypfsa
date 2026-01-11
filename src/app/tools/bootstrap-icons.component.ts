import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bootstrap-icon-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Bootstrap Icons Gallery</h1>
      <p class="subtitle">2,000+ free, high quality, open source icon library</p>
      
      <div class="search-bar">
        <i class="bi bi-search"></i>
        <input 
          type="text" 
          [(ngModel)]="searchText" 
          placeholder="Search icons..."
          (input)="filterIcons()">
        <span class="count">{{ filteredIcons.length }} icons</span>
      </div>

      <div class="icon-grid">
        <div 
          *ngFor="let icon of filteredIcons" 
          class="icon-card"
          (click)="copyToClipboard(icon)">
          <i [class]="'bi bi-' + icon"></i>
          <span class="icon-name">{{ icon }}</span>
          <span class="copied" *ngIf="copiedIcon === icon">Copied!</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      background: #f8f9fa;
      min-height: 100vh;
    }

    h1 {
      text-align: center;
      color: #212529;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      text-align: center;
      color: #6c757d;
      margin-bottom: 2rem;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }

    .search-bar i {
      color: #6c757d;
      font-size: 1.25rem;
    }

    .search-bar input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1rem;
      padding: 0.5rem;
    }

    .count {
      color: #6c757d;
      font-size: 0.875rem;
      white-space: nowrap;
      font-weight: 600;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }

    .icon-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem 1rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #dee2e6;
      cursor: pointer;
      transition: all 0.2s;
      min-height: 110px;
    }

    .icon-card:hover {
      border-color: #0d6efd;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
    }

    .icon-card i {
      font-size: 2rem;
      color: #212529;
      margin-bottom: 0.75rem;
    }

    .icon-card:hover i {
      color: #0d6efd;
    }

    .icon-name {
      font-size: 0.7rem;
      color: #6c757d;
      text-align: center;
      word-break: break-word;
      line-height: 1.2;
      max-width: 100%;
    }

    .copied {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: #198754;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      animation: fadeOut 2s forwards;
    }

    @keyframes fadeOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }
  `]
})
export class BootstrapIconGalleryComponent {
  searchText = '';
  copiedIcon = '';

  // Comprehensive list of Bootstrap Icons (v1.11+)
  allIcons = [
    // Alerts & Messaging
    'alarm', 'alarm-fill', 'bell', 'bell-fill', 'bell-slash', 'bell-slash-fill',
    'exclamation', 'exclamation-circle', 'exclamation-circle-fill', 'exclamation-triangle',
    'exclamation-triangle-fill', 'info', 'info-circle', 'info-circle-fill', 'info-square',
    'info-square-fill', 'question', 'question-circle', 'question-circle-fill',
    
    // Arrows
    'arrow-down', 'arrow-down-circle', 'arrow-down-circle-fill', 'arrow-down-left',
    'arrow-down-left-circle', 'arrow-down-left-circle-fill', 'arrow-down-right',
    'arrow-down-right-circle', 'arrow-down-right-circle-fill', 'arrow-down-short',
    'arrow-down-square', 'arrow-down-square-fill', 'arrow-left', 'arrow-left-circle',
    'arrow-left-circle-fill', 'arrow-left-right', 'arrow-left-short', 'arrow-left-square',
    'arrow-left-square-fill', 'arrow-repeat', 'arrow-return-left', 'arrow-return-right',
    'arrow-right', 'arrow-right-circle', 'arrow-right-circle-fill', 'arrow-right-short',
    'arrow-right-square', 'arrow-right-square-fill', 'arrow-up', 'arrow-up-circle',
    'arrow-up-circle-fill', 'arrow-up-left', 'arrow-up-left-circle', 'arrow-up-left-circle-fill',
    'arrow-up-right', 'arrow-up-right-circle', 'arrow-up-right-circle-fill', 'arrow-up-short',
    'arrow-up-square', 'arrow-up-square-fill', 'arrows-angle-contract', 'arrows-angle-expand',
    'arrows-collapse', 'arrows-expand', 'arrows-fullscreen', 'arrows-move',
    
    // Badges & Tags
    'award', 'award-fill', 'badge-3d', 'badge-3d-fill', 'badge-4k', 'badge-4k-fill',
    'badge-8k', 'badge-8k-fill', 'badge-ad', 'badge-ad-fill', 'badge-hd', 'badge-hd-fill',
    'tag', 'tag-fill', 'tags', 'tags-fill',
    
    // Bar & Column Charts
    'bar-chart', 'bar-chart-fill', 'bar-chart-line', 'bar-chart-line-fill',
    'bar-chart-steps',
    
    // Battery & Power
    'battery', 'battery-charging', 'battery-full', 'battery-half', 'lightning',
    'lightning-charge', 'lightning-charge-fill', 'lightning-fill', 'plug', 'plug-fill',
    'power',
    
    // Bookmarks
    'bookmark', 'bookmark-check', 'bookmark-check-fill', 'bookmark-dash',
    'bookmark-dash-fill', 'bookmark-fill', 'bookmark-heart', 'bookmark-heart-fill',
    'bookmark-plus', 'bookmark-plus-fill', 'bookmark-star', 'bookmark-star-fill',
    'bookmarks', 'bookmarks-fill',
    
    // Boxes & Containers
    'archive', 'archive-fill', 'basket', 'basket-fill', 'basket2', 'basket2-fill',
    'basket3', 'basket3-fill', 'box', 'box-arrow-down', 'box-arrow-in-down',
    'box-arrow-in-down-left', 'box-arrow-in-down-right', 'box-arrow-in-left',
    'box-arrow-in-right', 'box-arrow-in-up', 'box-arrow-in-up-left', 'box-arrow-in-up-right',
    'box-arrow-left', 'box-arrow-right', 'box-arrow-up', 'box-arrow-up-left',
    'box-arrow-up-right', 'box-seam', 'box2', 'box2-fill', 'box2-heart', 'box2-heart-fill',
    'inbox', 'inbox-fill', 'inboxes', 'inboxes-fill',
    
    // Buildings
    'bank', 'bank2', 'building', 'hospital', 'house', 'house-door', 'house-door-fill',
    'house-fill', 'shop', 'shop-window', 'mailbox', 'mailbox2',
    
    // Business & Commerce
    'briefcase', 'briefcase-fill', 'cart', 'cart-check', 'cart-check-fill', 'cart-dash',
    'cart-dash-fill', 'cart-fill', 'cart-plus', 'cart-plus-fill', 'cart-x', 'cart-x-fill',
    'cart2', 'cart3', 'cart4', 'cash', 'cash-coin', 'cash-stack', 'credit-card',
    'credit-card-2-back', 'credit-card-2-back-fill', 'credit-card-2-front',
    'credit-card-2-front-fill', 'credit-card-fill', 'currency-bitcoin', 'currency-dollar',
    'currency-euro', 'currency-exchange', 'currency-pound', 'currency-yen', 'receipt',
    'receipt-cutoff', 'wallet', 'wallet-fill', 'wallet2',
    
    // Calendars & Time
    'calendar', 'calendar-check', 'calendar-check-fill', 'calendar-date', 'calendar-date-fill',
    'calendar-day', 'calendar-day-fill', 'calendar-event', 'calendar-event-fill', 'calendar-fill',
    'calendar-minus', 'calendar-minus-fill', 'calendar-plus', 'calendar-plus-fill',
    'calendar-range', 'calendar-range-fill', 'calendar-week', 'calendar-week-fill',
    'calendar-x', 'calendar-x-fill', 'calendar2', 'calendar2-check', 'calendar2-check-fill',
    'calendar2-date', 'calendar2-date-fill', 'calendar2-day', 'calendar2-day-fill',
    'calendar2-event', 'calendar2-event-fill', 'calendar2-fill', 'calendar2-minus',
    'calendar2-minus-fill', 'calendar2-plus', 'calendar2-plus-fill', 'calendar2-range',
    'calendar2-range-fill', 'calendar2-week', 'calendar2-week-fill', 'calendar2-x',
    'calendar2-x-fill', 'calendar3', 'calendar3-event', 'calendar3-event-fill', 'calendar3-fill',
    'calendar3-range', 'calendar3-range-fill', 'calendar3-week', 'calendar3-week-fill',
    'calendar4', 'calendar4-event', 'calendar4-range', 'calendar4-week', 'clock', 'clock-fill',
    'clock-history', 'hourglass', 'hourglass-bottom', 'hourglass-split', 'hourglass-top',
    'stopwatch', 'stopwatch-fill',
    
    // Carets
    'caret-down', 'caret-down-fill', 'caret-down-square', 'caret-down-square-fill',
    'caret-left', 'caret-left-fill', 'caret-left-square', 'caret-left-square-fill',
    'caret-right', 'caret-right-fill', 'caret-right-square', 'caret-right-square-fill',
    'caret-up', 'caret-up-fill', 'caret-up-square', 'caret-up-square-fill',
    
    // Chat & Communication
    'chat', 'chat-dots', 'chat-dots-fill', 'chat-fill', 'chat-left', 'chat-left-dots',
    'chat-left-dots-fill', 'chat-left-fill', 'chat-left-quote', 'chat-left-quote-fill',
    'chat-left-text', 'chat-left-text-fill', 'chat-quote', 'chat-quote-fill', 'chat-right',
    'chat-right-dots', 'chat-right-dots-fill', 'chat-right-fill', 'chat-right-quote',
    'chat-right-quote-fill', 'chat-right-text', 'chat-right-text-fill', 'chat-square',
    'chat-square-dots', 'chat-square-dots-fill', 'chat-square-fill', 'chat-square-quote',
    'chat-square-quote-fill', 'chat-square-text', 'chat-square-text-fill', 'chat-text',
    'chat-text-fill', 'envelope', 'envelope-fill', 'envelope-open', 'envelope-open-fill',
    'mailbox', 'mailbox2', 'telephone', 'telephone-fill', 'telephone-forward',
    'telephone-forward-fill', 'telephone-inbound', 'telephone-inbound-fill', 'telephone-minus',
    'telephone-minus-fill', 'telephone-outbound', 'telephone-outbound-fill', 'telephone-plus',
    'telephone-plus-fill', 'telephone-x', 'telephone-x-fill',
    
    // Chevrons
    'chevron-bar-contract', 'chevron-bar-down', 'chevron-bar-expand', 'chevron-bar-left',
    'chevron-bar-right', 'chevron-bar-up', 'chevron-compact-down', 'chevron-compact-left',
    'chevron-compact-right', 'chevron-compact-up', 'chevron-contract', 'chevron-double-down',
    'chevron-double-left', 'chevron-double-right', 'chevron-double-up', 'chevron-down',
    'chevron-expand', 'chevron-left', 'chevron-right', 'chevron-up',
    
    // Controls
    'check', 'check-all', 'check-circle', 'check-circle-fill', 'check-lg', 'check-square',
    'check-square-fill', 'check2', 'check2-all', 'check2-circle', 'check2-square',
    'dash', 'dash-circle', 'dash-circle-fill', 'dash-lg', 'dash-square', 'dash-square-fill',
    'plus', 'plus-circle', 'plus-circle-fill', 'plus-lg', 'plus-square', 'plus-square-fill',
    'x', 'x-circle', 'x-circle-fill', 'x-diamond', 'x-diamond-fill', 'x-lg', 'x-octagon',
    'x-octagon-fill', 'x-square', 'x-square-fill',
    
    // Devices
    'display', 'display-fill', 'headset', 'headset-vr', 'keyboard', 'keyboard-fill',
    'laptop', 'laptop-fill', 'mouse', 'mouse-fill', 'mouse2', 'mouse2-fill', 'mouse3',
    'mouse3-fill', 'pc-display', 'pc-display-horizontal', 'pc-horizontal', 'phone',
    'phone-fill', 'phone-landscape', 'phone-landscape-fill', 'phone-vibrate',
    'phone-vibrate-fill', 'smartwatch', 'tablet', 'tablet-fill', 'tablet-landscape',
    'tablet-landscape-fill', 'tv', 'tv-fill', 'watch',
    
    // Files & Folders
    'file', 'file-arrow-down', 'file-arrow-down-fill', 'file-arrow-up', 'file-arrow-up-fill',
    'file-bar-graph', 'file-bar-graph-fill', 'file-binary', 'file-binary-fill', 'file-break',
    'file-break-fill', 'file-check', 'file-check-fill', 'file-code', 'file-code-fill',
    'file-diff', 'file-diff-fill', 'file-earmark', 'file-earmark-arrow-down',
    'file-earmark-arrow-down-fill', 'file-earmark-arrow-up', 'file-earmark-arrow-up-fill',
    'file-earmark-bar-graph', 'file-earmark-bar-graph-fill', 'file-earmark-binary',
    'file-earmark-binary-fill', 'file-earmark-break', 'file-earmark-break-fill',
    'file-earmark-check', 'file-earmark-check-fill', 'file-earmark-code',
    'file-earmark-code-fill', 'file-earmark-diff', 'file-earmark-diff-fill',
    'file-earmark-easel', 'file-earmark-easel-fill', 'file-earmark-excel',
    'file-earmark-excel-fill', 'file-earmark-fill', 'file-earmark-font', 'file-earmark-font-fill',
    'file-earmark-image', 'file-earmark-image-fill', 'file-earmark-lock', 'file-earmark-lock-fill',
    'file-earmark-lock2', 'file-earmark-lock2-fill', 'file-earmark-medical',
    'file-earmark-medical-fill', 'file-earmark-minus', 'file-earmark-minus-fill',
    'file-earmark-music', 'file-earmark-music-fill', 'file-earmark-pdf', 'file-earmark-pdf-fill',
    'file-earmark-person', 'file-earmark-person-fill', 'file-earmark-play',
    'file-earmark-play-fill', 'file-earmark-plus', 'file-earmark-plus-fill',
    'file-earmark-post', 'file-earmark-post-fill', 'file-earmark-ppt', 'file-earmark-ppt-fill',
    'file-earmark-richtext', 'file-earmark-richtext-fill', 'file-earmark-ruled',
    'file-earmark-ruled-fill', 'file-earmark-slides', 'file-earmark-slides-fill',
    'file-earmark-spreadsheet', 'file-earmark-spreadsheet-fill', 'file-earmark-text',
    'file-earmark-text-fill', 'file-earmark-word', 'file-earmark-word-fill',
    'file-earmark-x', 'file-earmark-x-fill', 'file-earmark-zip', 'file-earmark-zip-fill',
    'file-easel', 'file-easel-fill', 'file-excel', 'file-excel-fill', 'file-fill',
    'file-font', 'file-font-fill', 'file-image', 'file-image-fill', 'file-lock',
    'file-lock-fill', 'file-lock2', 'file-lock2-fill', 'file-medical', 'file-medical-fill',
    'file-minus', 'file-minus-fill', 'file-music', 'file-music-fill', 'file-pdf',
    'file-pdf-fill', 'file-person', 'file-person-fill', 'file-play', 'file-play-fill',
    'file-plus', 'file-plus-fill', 'file-post', 'file-post-fill', 'file-ppt',
    'file-ppt-fill', 'file-richtext', 'file-richtext-fill', 'file-ruled', 'file-ruled-fill',
    'file-slides', 'file-slides-fill', 'file-spreadsheet', 'file-spreadsheet-fill',
    'file-text', 'file-text-fill', 'file-word', 'file-word-fill', 'file-x', 'file-x-fill',
    'file-zip', 'file-zip-fill', 'files', 'files-alt', 'folder', 'folder-check',
    'folder-fill', 'folder-minus', 'folder-plus', 'folder-symlink', 'folder-symlink-fill',
    'folder-x', 'folder2', 'folder2-open',
    
    // Geo
    'compass', 'compass-fill', 'geo', 'geo-alt', 'geo-alt-fill', 'geo-fill', 'globe',
    'globe2', 'map', 'map-fill', 'pin', 'pin-angle', 'pin-angle-fill', 'pin-fill',
    'pin-map', 'pin-map-fill', 'signpost', 'signpost-2', 'signpost-2-fill', 'signpost-fill',
    'signpost-split', 'signpost-split-fill',
    
    // Graphics
    'bounding-box', 'bounding-box-circles', 'easel', 'easel-fill', 'grid', 'grid-1x2',
    'grid-1x2-fill', 'grid-3x2', 'grid-3x2-gap', 'grid-3x2-gap-fill', 'grid-3x3',
    'grid-3x3-gap', 'grid-3x3-gap-fill', 'grid-fill', 'palette', 'palette-fill',
    'palette2', 'rulers', 'vector-pen',
    
    // Images
    'camera', 'camera-fill', 'camera-reels', 'camera-reels-fill', 'camera-video',
    'camera-video-fill', 'camera-video-off', 'camera-video-off-fill', 'camera2',
    'collection', 'collection-fill', 'collection-play', 'collection-play-fill', 'film',
    'image', 'image-alt', 'image-fill', 'images',
    
    // Layout
    'layout-sidebar', 'layout-sidebar-inset', 'layout-sidebar-inset-reverse',
    'layout-sidebar-reverse', 'layout-split', 'layout-text-sidebar',
    'layout-text-sidebar-reverse', 'layout-text-window', 'layout-text-window-reverse',
    'layout-three-columns', 'layout-wtf',
    
    // Lists
    'list', 'list-check', 'list-nested', 'list-ol', 'list-stars', 'list-task', 'list-ul',
    
    // Media Controls
    'pause', 'pause-btn', 'pause-btn-fill', 'pause-circle', 'pause-circle-fill',
    'pause-fill', 'play', 'play-btn', 'play-btn-fill', 'play-circle', 'play-circle-fill',
    'play-fill', 'skip-backward', 'skip-backward-btn', 'skip-backward-btn-fill',
    'skip-backward-circle', 'skip-backward-circle-fill', 'skip-backward-fill',
    'skip-end', 'skip-end-btn', 'skip-end-btn-fill', 'skip-end-circle',
    'skip-end-circle-fill', 'skip-end-fill', 'skip-forward', 'skip-forward-btn',
    'skip-forward-btn-fill', 'skip-forward-circle', 'skip-forward-circle-fill',
    'skip-forward-fill', 'skip-start', 'skip-start-btn', 'skip-start-btn-fill',
    'skip-start-circle', 'skip-start-circle-fill', 'skip-start-fill', 'stop',
    'stop-btn', 'stop-btn-fill', 'stop-circle', 'stop-circle-fill', 'stop-fill',
    
    // People
    'people', 'people-fill', 'person', 'person-badge', 'person-badge-fill', 'person-bounding-box',
    'person-check', 'person-check-fill', 'person-circle', 'person-dash', 'person-dash-fill',
    'person-fill', 'person-heart', 'person-hearts', 'person-lines-fill', 'person-plus',
    'person-plus-fill', 'person-square', 'person-video', 'person-video2', 'person-video3',
    'person-workspace', 'person-x', 'person-x-fill',
    
    // Security
    'eye', 'eye-fill', 'eye-slash', 'eye-slash-fill', 'key', 'key-fill', 'lock',
    'lock-fill', 'shield', 'shield-check', 'shield-exclamation', 'shield-fill',
    'shield-fill-check', 'shield-fill-exclamation', 'shield-fill-minus', 'shield-fill-plus',
    'shield-fill-x', 'shield-lock', 'shield-lock-fill', 'shield-minus', 'shield-plus',
    'shield-shaded', 'shield-slash', 'shield-slash-fill', 'shield-x', 'unlock',
    'unlock-fill',
    
    // Shapes
    'circle', 'circle-fill', 'circle-half', 'circle-square', 'diamond', 'diamond-fill',
    'diamond-half', 'hexagon', 'hexagon-fill', 'hexagon-half', 'octagon', 'octagon-fill',
    'octagon-half', 'pentagon', 'pentagon-fill', 'pentagon-half', 'square', 'square-fill',
    'square-half', 'triangle', 'triangle-fill', 'triangle-half',
    
    // Social
    'facebook', 'github', 'instagram', 'linkedin', 'messenger', 'reddit', 'slack',
    'snapchat', 'telegram', 'tiktok', 'twitter', 'whatsapp', 'youtube',
    
    // Star Ratings
    'star', 'star-fill', 'star-half',
    
    // Toggle
    'toggle-off', 'toggle-on', 'toggle2-off', 'toggle2-on',
    
    // Tools
    'hammer', 'screwdriver', 'tools', 'wrench', 'wrench-adjustable',
    'wrench-adjustable-circle', 'wrench-adjustable-circle-fill',
    
    // Typography
    'type', 'type-bold', 'type-h1', 'type-h2', 'type-h3', 'type-italic',
    'type-strikethrough', 'type-underline', 'fonts', 'text-center', 'text-indent-left',
    'text-indent-right', 'text-left', 'text-paragraph', 'text-right',
    
    // UI
    'aspect-ratio', 'aspect-ratio-fill', 'border', 'border-all', 'border-bottom',
    'border-center', 'border-inner', 'border-left', 'border-middle', 'border-outer',
    'border-right', 'border-style', 'border-top', 'border-width', 'columns', 'columns-gap',
    'eraser', 'eraser-fill', 'filter', 'filter-circle', 'filter-circle-fill', 'filter-left',
    'filter-right', 'filter-square', 'filter-square-fill', 'funnel', 'funnel-fill',
    'justify', 'justify-left', 'justify-right', 'menu-app', 'menu-app-fill', 'menu-button',
    'menu-button-fill', 'menu-button-wide', 'menu-button-wide-fill', 'menu-down', 'menu-up',
    'sliders', 'sliders2', 'sliders2-vertical', 'sort-alpha-down', 'sort-alpha-down-alt',
    'sort-alpha-up', 'sort-alpha-up-alt', 'sort-down', 'sort-down-alt', 'sort-numeric-down',
    'sort-numeric-down-alt', 'sort-numeric-up', 'sort-numeric-up-alt', 'sort-up',
    'sort-up-alt', 'three-dots', 'three-dots-vertical',
    
    // Miscellaneous
    'award', 'bookmark', 'bag', 'book', 'bookmark-check', 'bookmark-heart', 'bookmark-star',
    'bug', 'bullseye', 'calculator', 'cart', 'clipboard', 'cloud', 'cup', 'fire', 'gift',
    'heart', 'heart-fill', 'house', 'lightbulb', 'search', 'star', 'trash', 'volume-down',
    'volume-mute', 'volume-off', 'volume-up'
  ];

  filteredIcons = [...this.allIcons];

  filterIcons() {
    const search = this.searchText.toLowerCase().trim();
    if (!search) {
      this.filteredIcons = [...this.allIcons];
    } else {
      this.filteredIcons = this.allIcons.filter(icon => 
        icon.includes(search)
      );
    }
  }

  copyToClipboard(icon: string) {
    const iconClass = `<i class="bi bi-${icon}"></i>`;
    navigator.clipboard.writeText(iconClass).then(() => {
      this.copiedIcon = icon;
      setTimeout(() => {
        this.copiedIcon = '';
      }, 2000);
    });
  }
}