import './style.css';
import {
  pipeline,
  env,
  type ObjectDetectionPipelineOutput,
} from '@huggingface/transformers';

// env.allowLocalModels = false; // default false in browser

const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
const imageContainer = document.getElementById('image-container')!;
const status = document.getElementById('status')!;

status.textContent = 'Loading model...';

const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');

status.textContent = 'Ready';

fileUpload.addEventListener('change', async event => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async e => {
    imageContainer.innerHTML = '';
    const image = document.createElement('img');
    image.src = e.target!.result as string;
    imageContainer.appendChild(image);

    const boxes = await detect(image.src);
    console.log(boxes);
    boxes.forEach(({ box, label }) => {
      const { xmin, xmax, ymin, ymax } = box;

      const color =
        '#' +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, '0');

      const boxElement = document.createElement('div');
      boxElement.className = 'bounding-box';
      Object.assign(boxElement.style, {
        borderColor: color,
        left: `${xmin * 100}%`,
        top: `${ymin * 100}%`,
        width: `${(xmax - xmin) * 100}%`,
        height: `${(ymax - ymin) * 100}%`,
      });

      const labelElement = document.createElement('span');
      labelElement.textContent = label;
      labelElement.className = 'bounding-box-label';
      labelElement.style.backgroundColor = color;

      boxElement.appendChild(labelElement);
      imageContainer.appendChild(boxElement);
    });
  };

  reader.readAsDataURL(file);
});

async function detect(imageSrc: string) {
  status.textContent = 'Analyzing...';
  const output = await detector(imageSrc, { percentage: true, threshold: 0.5 });

  status.textContent = 'Done';
  return output as ObjectDetectionPipelineOutput;
}
