import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AutoCarousel from '../ImageCarousel/variants/AutoCarousel';

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
        const firstLeft = screen.getAllByAltText(/Left/)[0];
        const initialTransform = firstLeft.style.transform;
        vi.advanceTimersByTime(500);
        const updatedTransform = firstLeft.style.transform;
        expect(updatedTransform).not.toBe(initialTransform);
    });

    test('handles fewer than 6 images gracefully', () => {
        render(<AutoCarousel leftImages={['left1.jpg']} rightImages={['right1.jpg']} />);
        expect(screen.getAllByRole('img')).toHaveLength(2);
    });

    test('respects the intervalMs prop correctly', () => {
        render(<AutoCarousel leftImages={leftImages} rightImages={rightImages} intervalMs={1000} />);
        const firstLeft = screen.getAllByAltText(/Left/)[0];
        const initial = firstLeft.style.transform;

        // At 500ms, nothing should have changed
        vi.advanceTimersByTime(500);
        expect(firstLeft.style.transform).toBe(initial);

        // At 1000ms, transform should update
        vi.advanceTimersByTime(500);
        expect(firstLeft.style.transform).not.toBe(initial);
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
