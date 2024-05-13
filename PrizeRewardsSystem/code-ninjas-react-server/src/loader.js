import { gsap } from 'gsap';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

gsap.registerPlugin(CSSRulePlugin);

export function transition() {
    const overlayTop = document.querySelector('.overlay.top');
    const overlayBottom = document.querySelector('.overlay.bottom');
    const loader = document.querySelector('.loader');

    // Reset the initial state
    gsap.set([overlayTop, overlayBottom, loader], { clearProps: 'all', autoAlpha: 1 });
  
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide the overlay and loader elements after the animation completes
        gsap.set([overlayTop, overlayBottom, loader], { autoAlpha: 0 });
      }
    });
  
    tl.to(overlayTop, {y: 0, duration: 0.2, ease: 'power2.out'}, 'close')
      .to(overlayBottom, {y: 0, duration: 0.2, ease: 'power2.out'}, 'close')
      .to(loader, {opacity: 1, duration: 0.2}, 'close')
      .to({}, {duration: 1.5})
      .to(overlayTop, {y: '-100%', duration: 0.2, ease: 'power2.out'}, '+=1.5', 'open')
      .to(overlayBottom, {y: '100%', duration: 0.2, ease: 'power2.out'}, '-=0.2', 'open')
      .to(loader, {opacity: 0, duration: 0.2}, '-=0.2');
  }