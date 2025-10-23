# Object Detection Web App

A browser-based object detection application powered by Hugging Face Transformers.js. Upload an image and see detected objects highlighted with color-coded bounding boxes.

## Features

- 🖼️ Image upload via file picker
- 🤖 Real-time object detection using AI models
- 📦 Visual bounding boxes with labels for detected objects
- 🎨 Color-coded detection results
- ⚡ Runs entirely in the browser (no server required)

## Tech Stack

- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server (using Rolldown variant)
- **@huggingface/transformers** - Transformers.js library for running ML models in the browser
- **DETR ResNet-50** - Pre-trained object detection model

## Installation

Install dependencies using your preferred package manager:

```bash
# Using Yarn (recommended, as specified in package.json)
yarn install

# Or using npm
npm install

# Or using Bun
bun install
```

## Usage

### Development Server

Start the development server:

```bash
yarn dev
```

Then open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

### Build for Production

```bash
yarn build
```

This compiles TypeScript and builds the project to the `dist/` directory.

### Preview Production Build

```bash
yarn preview
```

## How It Works

1. **Model Loading**: On page load, the app initializes the DETR (DEtection TRansformer) ResNet-50 model via Transformers.js
2. **Image Upload**: Users upload an image through the file input
3. **Object Detection**: The image is processed through the object detection pipeline with a confidence threshold of 0.5
4. **Visualization**: Detected objects are displayed with colored bounding boxes and labels overlaid on the original image

## Model Information

This app uses the **Xenova/detr-resnet-50** model, which is:

- A pre-trained DETR (DEtection TRansformer) model
- Based on ResNet-50 backbone
- Capable of detecting 91 common object categories
- Optimized for browser execution via ONNX Runtime

The model runs entirely in the browser using WebAssembly and WebGL acceleration.

## License

This project is private and not intended for public distribution.
