import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AutoCarousel from '../variants/AutoCarousel';


const leftImages = [
    'left1.jpg', 'left2.jpg', 'left3.jpg',
    'left4.jpg', 'left5.jpg', 'left6.jpg'
];
const rightImages = [
    'right1.jpg', 'right2.jpg', 'right3.jpg',
    'right4.jpg', 'right5.jpg', 'right6.jpg'
];

vi.useFakeTimers();

describe('AutoCarousel', () => {
    test('renders left and right images', () => {
        render(<AutoCarousel leftImages={leftImages} rightImages={rightImages} />);
        expect(screen.getAllByRole('img')).toHaveLength(12);
    });

    test('animates images every intervalMs', () => {
        render(<AutoCarousel leftImages={leftImages} rightImages={rightImages} intervalMs={500} />);
        const leftImgs = screen.getAllByAltText(/Left/);

        const countersBefore = leftImgs.map(img => img.getAttribute('data-counter'));
        vi.advanceTimersByTime(500);
        const countersAfter = screen.getAllByAltText(/Left/).map(img => img.getAttribute('data-counter'));

        expect(countersAfter).not.toEqual(countersBefore);
    });


    test('handles fewer than 6 images gracefully', () => {
        render(<AutoCarousel leftImages={['left1.jpg']} rightImages={['right1.jpg']} />);
        expect(screen.getAllByRole('img')).toHaveLength(2);
    });

    test('respects the intervalMs prop correctly', () => {
        render(<AutoCarousel leftImages={leftImages} rightImages={rightImages} intervalMs={1000} />);
        const getCounters = () => screen.getAllByAltText(/Left/).map(img => img.getAttribute('data-counter'));

        const before = getCounters();

        vi.advanceTimersByTime(500);
        expect(getCounters()).toEqual(before); // not yet rotated

        vi.advanceTimersByTime(500); // total 1000ms
        expect(getCounters()).not.toEqual(before); // should have rotated
    });


    test('clears interval on unmount', () => {
        const clearSpy = vi.spyOn(global, 'clearInterval');
        const { unmount } = render(<AutoCarousel leftImages={leftImages} rightImages={rightImages} />);
        unmount();
        expect(clearSpy).toHaveBeenCalled();
    });
    test('images have accessible alt text', () => {
        render(<AutoCarousel leftImages={leftImages} rightImages={rightImages} />);
        screen.getAllByRole('img').forEach(img => {
            expect(img).toHaveAttribute('alt');
            expect(img.getAttribute('alt')).not.toBe('');
        });
    });
});
