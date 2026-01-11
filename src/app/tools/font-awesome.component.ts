import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-icon-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Font Awesome Icon Gallery (Free)</h1>
      
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          [(ngModel)]="searchText" 
          placeholder="Search icons..."
          (input)="filterIcons()">
        <span class="count">{{ filteredIcons.length }} icons</span>
      </div>

      <div class="tabs">
        <button 
          *ngFor="let style of styles" 
          [class.active]="selectedStyle === style.class"
          (click)="selectStyle(style.class)">
          {{ style.name }} ({{ getIconCountForStyle(style.class) }})
        </button>
      </div>

      <div class="icon-grid">
        <div 
          *ngFor="let icon of filteredIcons" 
          class="icon-card"
          (click)="copyToClipboard(icon)">
          <i [class]="selectedStyle + ' fa-' + icon + ' fa-2x'"></i>
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
      background: #f9fafb;
      min-height: 100vh;
    }

    h1 {
      text-align: center;
      color: #1f2937;
      margin-bottom: 2rem;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-bar i {
      color: #6b7280;
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
      color: #6b7280;
      font-size: 0.875rem;
      white-space: nowrap;
    }

    .tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .tabs button {
      padding: 0.5rem 1rem;
      border: 2px solid #e5e7eb;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .tabs button:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .tabs button.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }

    .icon-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      border: 2px solid #e5e7eb;
      cursor: pointer;
      transition: all 0.2s;
      min-height: 120px;
    }

    .icon-card:hover {
      border-color: #3b82f6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    }

    .icon-card i {
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .icon-card:hover i {
      color: #3b82f6;
    }

    .icon-name {
      font-size: 0.75rem;
      color: #6b7280;
      text-align: center;
      word-break: break-word;
    }

    .copied {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: #10b981;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      animation: fadeOut 2s forwards;
    }

    @keyframes fadeOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }
  `]
})
export class IconGalleryComponent {
  searchText = '';
  copiedIcon = '';
  selectedStyle = 'fas';

  styles = [
    { name: 'Solid', class: 'fas' },
    { name: 'Regular', class: 'far' },
    { name: 'Brands', class: 'fab' }
  ];

  // ONLY FREE Font Awesome 6 icons that actually work
  solidIcons = [
    // Common Interface
    'home', 'user', 'users', 'envelope', 'phone', 'location-dot',
    'calendar', 'calendar-days', 'clock', 'gear', 'gears', 'magnifying-glass',
    'bars', 'filter', 'sort', 'table-cells', 'table-cells-large', 'list',
    'list-ul', 'list-ol', 'house', 'address-book', 'address-card',
    
    // Actions & Controls
    'check', 'xmark', 'plus', 'minus', 'trash', 'trash-can', 'pen', 'pen-to-square',
    'floppy-disk', 'download', 'upload', 'copy', 'scissors', 'file', 'folder',
    'folder-open', 'arrow-rotate-left', 'arrow-rotate-right', 'rotate', 'ban',
    'power-off', 'right-from-bracket', 'right-to-bracket', 'sliders',
    
    // Arrows & Navigation  
    'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
    'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
    'angle-left', 'angle-right', 'angle-up', 'angle-down',
    'caret-left', 'caret-right', 'caret-up', 'caret-down',
    'circle-chevron-left', 'circle-chevron-right', 'circle-chevron-up', 'circle-chevron-down',
    'expand', 'compress', 'up-down-left-right',
    
    // Status & Alerts
    'circle-exclamation', 'triangle-exclamation', 'circle-info', 'circle-question',
    'circle-check', 'circle-xmark', 'bell', 'bell-slash', 'flag', 'star',
    'heart', 'thumbs-up', 'thumbs-down', 'face-smile', 'face-frown', 'face-meh',
    
    // Media & Entertainment
    'play', 'pause', 'stop', 'forward', 'backward', 'forward-step', 'backward-step',
    'forward-fast', 'backward-fast', 'volume-high', 'volume-low', 'volume-xmark',
    'volume-off', 'music', 'video', 'camera', 'image', 'film', 'microphone',
    'headphones', 'circle-play', 'circle-pause', 'circle-stop',
    
    // Shopping & Commerce
    'cart-shopping', 'bag-shopping', 'basket-shopping', 'credit-card',
    'money-bill', 'dollar-sign', 'euro-sign', 'sterling-sign', 'tag', 'tags',
    'barcode', 'qrcode', 'receipt', 'store', 'gift', 'truck-fast',
    
    // Communication
    'comment', 'comments', 'message', 'inbox', 'paper-plane', 'share',
    'share-nodes', 'reply', 'reply-all', 'at', 'hashtag', 'rss',
    'wifi', 'signal', 'podcast', 'envelope-open',
    
    // Security & Privacy
    'lock', 'lock-open', 'unlock', 'key', 'shield', 'shield-halved',
    'user-lock', 'user-shield', 'eye', 'eye-slash', 'fingerprint',
    'id-card', 'id-badge',
    
    // Business & Office
    'briefcase', 'suitcase', 'chart-line', 'chart-simple', 'chart-pie',
    'chart-column', 'table', 'database', 'server', 'laptop', 'desktop',
    'tablet', 'mobile', 'mobile-screen-button', 'keyboard', 'mouse',
    'print', 'calculator', 'calendar-check', 'calendar-xmark',
    
    // Files & Documents
    'file-lines', 'file-pdf', 'file-word', 'file-excel', 'file-powerpoint',
    'file-image', 'file-video', 'file-audio', 'file-code', 'file-zipper',
    'file-arrow-down', 'file-arrow-up', 'folder-plus', 'folder-minus',
    
    // Education
    'book', 'book-open', 'graduation-cap', 'building-columns', 'school',
    'chalkboard-user', 'user-graduate', 'pen-fancy', 'pencil', 'highlighter',
    'marker', 'eraser', 'bookmark',
    
    // Medical & Health
    'hospital', 'truck-medical', 'kit-medical', 'suitcase-medical', 
    'pills', 'prescription-bottle', 'stethoscope', 'syringe', 'thermometer',
    'heart-pulse', 'dna', 'microscope', 'vial', 'lungs',
    
    // Weather & Nature
    'cloud', 'cloud-rain', 'cloud-sun', 'sun', 'moon', 'snowflake',
    'bolt', 'wind', 'umbrella', 'temperature-high', 'temperature-low',
    'tree', 'seedling', 'leaf', 'fire', 'water', 'droplet',
    
    // Transportation
    'car', 'taxi', 'bus', 'truck', 'plane', 'rocket', 'bicycle',
    'motorcycle', 'train', 'ship', 'helicopter', 'car-side',
    
    // Building & Construction
    'building', 'house-chimney', 'warehouse', 'industry', 'wrench',
    'screwdriver', 'hammer', 'toolbox', 'hard-hat', 'ruler', 'pen-ruler',
    
    // Food & Dining
    'utensils', 'mug-saucer', 'mug-hot', 'wine-glass', 'beer-mug-empty',
    'martini-glass', 'champagne-glasses', 'pizza-slice', 'burger',
    'apple-whole', 'carrot', 'fish', 'egg', 'ice-cream', 'cake-candles',
    
    // Sports & Activities
    'person-running', 'person-walking', 'person-hiking', 'person-biking',
    'person-swimming', 'dumbbell', 'basketball', 'football', 'baseball',
    'volleyball', 'trophy', 'medal', 'award', 'futbol', 'golf-ball-tee',
    
    // Miscellaneous
    'globe', 'map', 'map-location-dot', 'compass', 'anchor', 'paw',
    'fire-flame-curved', 'snowman', 'wand-magic-sparkles', 'crown', 'gem',
    'ring', 'gamepad', 'puzzle-piece', 'lightbulb', 'battery-full',
    'battery-half', 'battery-empty', 'plug', 'brush', 'palette'
  ];

  regularIcons = [
    // Only icons that work in REGULAR style (far)
    'heart', 'star', 'user', 'clock', 'calendar', 'calendar-days',
    'comment', 'comments', 'envelope', 'file', 'folder', 'folder-open',
    'bookmark', 'image', 'copy', 'save', 'floppy-disk', 'bell',
    'circle', 'circle-dot', 'circle-check', 'circle-xmark', 'square',
    'square-check', 'eye', 'eye-slash', 'thumbs-up', 'thumbs-down',
    'face-smile', 'face-frown', 'face-meh', 'hand', 'handshake',
    'credit-card', 'flag', 'map', 'compass', 'file-lines', 'file-pdf',
    'lightbulb', 'sun', 'moon', 'snowflake', 'lemon', 'gem',
    'hourglass', 'keyboard', 'life-ring', 'note-sticky', 'paper-plane',
    'address-book', 'address-card', 'id-card', 'id-badge'
  ];

  brandIcons = [
    // Social & Tech Brands (fab)
    'facebook', 'facebook-f', 'twitter', 'x-twitter', 'linkedin', 'linkedin-in',
    'instagram', 'youtube', 'github', 'gitlab', 'google', 'apple', 'microsoft',
    'amazon', 'reddit', 'discord', 'slack', 'telegram', 'whatsapp', 'pinterest',
    'tiktok', 'snapchat', 'twitch', 'spotify', 'soundcloud', 'dribbble', 'behance',
    'codepen', 'dev', 'stack-overflow', 'npm', 'node', 'react', 'angular',
    'vuejs', 'bootstrap', 'sass', 'html5', 'css3', 'js', 'python', 'java',
    'php', 'wordpress', 'shopify', 'stripe', 'paypal', 'cc-visa', 'cc-mastercard',
    'cc-amex', 'cc-paypal', 'chrome', 'firefox', 'edge', 'safari', 'opera',
    'android', 'app-store', 'app-store-ios', 'windows', 'linux', 'ubuntu',
    'dropbox', 'google-drive', 'trello', 'jira', 'figma', 'sketch'
  ];

  allIcons = [...this.solidIcons];
  filteredIcons = [...this.allIcons];

  selectStyle(styleClass: string) {
    this.selectedStyle = styleClass;
    
    // Switch icon list based on style
    if (styleClass === 'fas') {
      this.allIcons = [...this.solidIcons];
    } else if (styleClass === 'far') {
      this.allIcons = [...this.regularIcons];
    } else if (styleClass === 'fab') {
      this.allIcons = [...this.brandIcons];
    }
    
    this.filterIcons();
  }

  getIconCountForStyle(styleClass: string): number {
    if (styleClass === 'fas') return this.solidIcons.length;
    if (styleClass === 'far') return this.regularIcons.length;
    if (styleClass === 'fab') return this.brandIcons.length;
    return 0;
  }

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
    const iconClass = `<i class="${this.selectedStyle} fa-${icon}"></i>`;
    navigator.clipboard.writeText(iconClass).then(() => {
      this.copiedIcon = icon;
      setTimeout(() => {
        this.copiedIcon = '';
      }, 2000);
    });
  }
}