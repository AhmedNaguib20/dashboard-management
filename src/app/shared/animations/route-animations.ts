import { trigger, transition, style, animate, group, query } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    group([
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'scale(0.95) translateX(50px)' }),
          animate(
            '700ms ease-out',
            style({ opacity: 1, transform: 'scale(1) translateX(0)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1, transform: 'scale(1) translateX(0)' }),
          animate(
            '500ms ease-in',
            style({ opacity: 0, transform: 'scale(0.95) translateX(-50px)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
