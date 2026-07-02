import { Component, Input } from '@angular/core';

/**
 * Logótipo "Lumina": uma flor minimalista construída com 5 pétalas
 * em forma de gota, com um núcleo central — usado no cabeçalho
 * e em pontos de destaque da aplicação.
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <svg
      [attr.width]="tamanho"
      [attr.height]="tamanho"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="logo-lumina"
    >
      <defs>
        <linearGradient id="lumina-grad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stop-color="#C2185B" />
          <stop offset="100%" stop-color="#7B2D8E" />
        </linearGradient>
      </defs>
      <g transform="translate(24,24)">
        <path d="M0,-3 C5,-12 5,-18 0,-21 C-5,-18 -5,-12 0,-3 Z" fill="url(#lumina-grad)" transform="rotate(0)" />
        <path d="M0,-3 C5,-12 5,-18 0,-21 C-5,-18 -5,-12 0,-3 Z" fill="url(#lumina-grad)" transform="rotate(72)" />
        <path d="M0,-3 C5,-12 5,-18 0,-21 C-5,-18 -5,-12 0,-3 Z" fill="url(#lumina-grad)" transform="rotate(144)" />
        <path d="M0,-3 C5,-12 5,-18 0,-21 C-5,-18 -5,-12 0,-3 Z" fill="url(#lumina-grad)" transform="rotate(216)" />
        <path d="M0,-3 C5,-12 5,-18 0,-21 C-5,-18 -5,-12 0,-3 Z" fill="url(#lumina-grad)" transform="rotate(288)" />
        <circle r="4.5" fill="#FFF3E0" />
      </g>
    </svg>
  `,
  styles: [
    `
      .logo-lumina {
        display: block;
      }
    `,
  ],
})
export class LogoComponent {
  @Input() tamanho = 32;
}
