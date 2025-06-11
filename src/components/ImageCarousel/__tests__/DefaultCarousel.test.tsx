import { render, screen, fireEvent } from '@testing-library/react';
import DefaultCarousel from '../variants/DefaultCarousel';

const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'];

describe('DefaultCarousel', () => {
  test('renders all images', () => {
    render(<DefaultCarousel images={images} />);
    const imgElements = screen.getAllByRole('img');
    expect(imgElements.length).toBe(images.length);
    images.forEach((src, idx) => {
      expect(imgElements[idx]).toHaveAttribute('src', src);
    });
  });

  test('shows hint when showHint is true', () => {
    render(<DefaultCarousel images={images} showHint={true} />);
    expect(screen.getByText(/drag or click to explore the carousel/i)).toBeInTheDocument();
  });

  test('hides hint on drag start', () => {
    render(<DefaultCarousel images={images} showHint={true} />);
    const gallery = screen.getByTestId('carousel-gallery');
    if (!gallery) throw new Error('Gallery container not found');

    fireEvent.mouseDown(gallery, { clientX: 100 });
    fireEvent.mouseMove(gallery, { clientX: 140 }); // >30 threshold
    fireEvent.mouseUp(gallery);

    expect(screen.queryByText(/drag or click/i)).not.toBeInTheDocument();
  });

  test('clicking right side rotates right', () => {
    render(<DefaultCarousel images={images} />);
    const gallery = screen.getByTestId('carousel-gallery');

    const firstImageBefore = screen.getAllByRole('img')[0];
    const transformBefore = firstImageBefore.style.transform;

    const bounds = gallery.getBoundingClientRect();
    fireEvent.click(gallery, { clientX: bounds.right - 10 });

    const firstImageAfter = screen.getAllByRole('img')[0];
    const transformAfter = firstImageAfter.style.transform;

    expect(transformAfter).not.toBe(transformBefore);
  });


  test('dragging left rotates left', () => {
    render(<DefaultCarousel images={images} />);
    const gallery = screen.getByTestId('carousel-gallery');
    expect(gallery).toBeInTheDocument();

    const firstImageBefore = screen.getAllByRole('img')[0];
    const transformBefore = firstImageBefore.style.transform;

    fireEvent.mouseDown(gallery, { clientX: 140 });
    fireEvent.mouseMove(gallery, { clientX: 100 }); // drag left (> 30px)
    fireEvent.mouseUp(gallery);

    const firstImageAfter = screen.getAllByRole('img')[0];
    const transformAfter = firstImageAfter.style.transform;

    expect(transformAfter).not.toBe(transformBefore);
  });

  test('dragging right rotates right', () => {
    render(<DefaultCarousel images={images} />);
    const gallery = screen.getByTestId('carousel-gallery');
    if (!gallery) throw new Error('Gallery container not found');

    const firstImageBefore = screen.getAllByRole('img')[0];
    const transformBefore = firstImageBefore.style.transform;

    fireEvent.mouseDown(gallery, { clientX: 100 });
    fireEvent.mouseMove(gallery, { clientX: 140 }); // right drag > threshold
    fireEvent.mouseUp(gallery);

    const firstImageAfter = screen.getAllByRole('img')[0];
    const transformAfter = firstImageAfter.style.transform;

    expect(transformAfter).not.toBe(transformBefore);
  });

  test('dragging left rotates left', () => {
    render(<DefaultCarousel images={images} />);
    const gallery = screen.getByTestId('carousel-gallery');
    if (!gallery) throw new Error('Gallery container not found');

    const firstImageBefore = screen.getAllByRole('img')[0];
    const transformBefore = firstImageBefore.style.transform;

    fireEvent.mouseDown(gallery, { clientX: 140 });
    fireEvent.mouseMove(gallery, { clientX: 100 }); // left drag > threshold
    fireEvent.mouseUp(gallery);

    const firstImageAfter = screen.getAllByRole('img')[0];
    const transformAfter = firstImageAfter.style.transform;

    expect(transformAfter).not.toBe(transformBefore);
  });

  test('images have alt text', () => {
    render(<DefaultCarousel images={images} />);
    screen.getAllByRole('img').forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});
