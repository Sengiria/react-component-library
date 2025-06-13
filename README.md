# 🧩 React Component Library

A modern, reusable component library built with **React**, **TypeScript**, **Tailwind CSS**, and **Storybook**.  
This library is designed to accelerate frontend development with ready-to-use UI components featuring accessibility, responsiveness, and customization in mind.

---

## 🔗 Live Demo

Explore the components in Storybook:  
👉 [https://sengiria.github.io/react-component-library](https://sengiria.github.io/react-component-library)

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```
---

## 🧪 Run Storybook Locally

To explore the components and test them in isolation:

```bash
npm run storybook
```

## 📂 Create a New Component
To streamline component development, this project includes a script to scaffold a new component structure automatically.

🧰 What it does:
When you run the script, it:

- Creates a new folder under src/components/[ComponentName]
- Adds:
  - ComponentName.tsx with a basic functional component
  - ComponentName.stories.tsx for Storybook
  - constants.ts, types.ts
  - Subfolders: variants/, __tests__/

🚀 How to use:

```bash
node scripts/createComponent.js YourComponentName
```

Replace YourComponentName with the desired name in PascalCase.

Make sure you're in the root folder and that Node.js is installed.

```bash
src/
└── components/
    └── YourComponentName/
        ├── YourComponentName.tsx
        ├── YourComponentName.stories.tsx
        ├── constants.ts
        ├── types.ts
        ├── variants/
        └── __tests__/

```

---

## 🧱 Technologies Used

- ⚛️ React
- 🧠 TypeScript
- 💨 Tailwind CSS
- 🎬 Framer Motion
- 📚 Storybook

---

## 🧩 Available Components

📌 This library is actively growing. Each component will have its own dedicated section.

- Animated Filter
- Image Carousel
- Button
- ⏳ More coming soon

Each component is developed with customization and reuse in mind.
Props, variants, and usage examples are documented directly in Storybook.

---

# 🌀 AnimatedFilter<T> – Reusable Animated Filtering Component

The AnimatedFilter component is a reusable, animated filtering grid that supports generic types, enabling it to be used across various domains like books, products, movies, and more. It uses Framer Motion for animations and supports custom rendering for each item.

## ✅ Basic Usage in Your App

The component is generic, and TypeScript will infer the type from the items array:

```tsx
import AnimatedFilter from './AnimatedFilter';

const books = [
  { id: '1', name: 'Dune', category: 'Sci-Fi', image: 'cover.jpg' },
  { id: '2', name: 'Circe', category: 'Fantasy', image: 'cover2.jpg' },
  // ...
];

const categories = ['All', 'Sci-Fi', 'Fantasy'];

<AnimatedFilter
  items={books}
  filters={categories}
  filterKey="category"
  renderItem={(book) => (
    <>
      <img src={book.image} alt={book.name} />
      <p>{book.name}</p>
      <p>{book.category}</p>
    </>
  )}
/>;
```

## 🧪 Storybook Setup with Generics

Because Storybook doesn’t infer generics, you must bind them manually:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import AnimatedFilter from './AnimatedFilter';
import { mockBooks } from '../data/mockBooks';

type Book = {
  id: string;
  name: string;
  category: string;
  image: string;
};

// ✅ Manually bind the generic
const BookFilter = AnimatedFilter<Book>;

const meta: Meta<typeof BookFilter> = {
  component: BookFilter,
  title: 'Components/AnimatedFilter',
};
export default meta;

type Story = StoryObj<typeof BookFilter>;

export const Default: Story = {
  render: () => {
    const filters = ['All', ...new Set(mockBooks.map((book) => book.category))];
    return (
      <BookFilter
        items={mockBooks}
        filters={filters}
        filterKey="category"
        renderItem={(book) => (
          <>
            <img src={book.image} alt={book.name} />
            <p>{book.name}</p>
            <p>{book.category}</p>
          </>
        )}
      />
    );
  },
};

```

## ⚙️ Props

```tsx
type AnimatedFilterProps<T extends { id: string | number }> = {
  items?: T[];
  filterKey?: keyof T;         // Default: 'category'
  filters?: string[];          // Must include 'All'
  emptyText?: string;          // Shown when no results
  renderItem?: (item: T) => React.ReactNode;
};
```

# 🖼️ ImageCarousel – Interactive 3D Image Carousel Component

The ImageCarousel is a flexible and visually engaging component for displaying sets of images in a dynamic, animated carousel. It supports both automatic and manual interaction variants and uses translate3d with perspective styling to create a pseudo-3D effect.

## ✨ Features
- 🎞️ Animated 3D-like transitions
- 🧠 Accessible: Images use alt text for screen readers
- 💻 Responsive: Works well on mobile and desktop
- ⚙️ Customizable: Control timing and image sets
- 🖱️ DefaultCarousel supports pointer, mouse, and touch drag
- 🚫 Prevents unwanted image selection highlighting in browsers

## 🧩 Variants

👆 DefaultCarousel
Manually swipe, drag, or click to interact with the image carousel on all devices.

```tsx
import DefaultCarousel from './ImageCarousel/variants/DefaultCarousel';

<DefaultCarousel
  leftImages={['left1.jpg', 'left2.jpg', 'left3.jpg']}
  rightImages={['right1.jpg', 'right2.jpg', 'right3.jpg']}
/>
```

🔁 AutoCarousel
Automatically cycles through images at a fixed interval with smooth 3D animations.

```tsx
import AutoCarousel from './ImageCarousel/variants/AutoCarousel';

<AutoCarousel
  leftImages={['left1.jpg', 'left2.jpg', 'left3.jpg']}
  rightImages={['right1.jpg', 'right2.jpg', 'right3.jpg']}
  intervalMs={1000}
/>
```

## ⚙️ Props

```tsx
type DefaultCarouselProps = {
  leftImages: string[];
  rightImages: string[];
};

type AutoCarouselProps = {
  leftImages: string[];
  rightImages: string[];
  intervalMs?: number; // Defaults to 1000ms
};
```
---

# 🔘 Button – Customizable Ripple Button Component

The Button component is a reusable, interactive button that supports ripple effects, color variants, and accessibility. It adapts seamlessly to different UI needs while offering subtle yet elegant interaction feedback.

## ✨ Features
- 🌊 Ripple animation on click (optional toggle)
- 🎨 Predefined color variants (default, primary, secondary, danger)
- ♿ Accessible with keyboard and screen readers
- 🔧 Customizable text, click behavior, and style

---

## 🧪 Usage Example

```tsx
import { Button, COLOR_PRIMARY } from './Button';

<Button
  text="Submit"
  color={COLOR_PRIMARY}
  ripple
  onClick={() => console.log('Clicked!')}
/>;
```

---

## 🎨 Color Variants

You can choose from built-in color options using constants:

```ts
COLOR_DEFAULT     // purple theme (default)
COLOR_PRIMARY     // vibrant blue
COLOR_SECONDARY   // soft gray with border
COLOR_DANGER      // red tone for destructive actions
```

---

## ⚙️ Props

```ts
type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: typeof COLOR_DEFAULT | typeof COLOR_PRIMARY | typeof COLOR_SECONDARY | typeof COLOR_DANGER;
  ripple?: boolean; // Enables ripple effect (default: true)
  className?: string; // Optional custom styling
};
```
