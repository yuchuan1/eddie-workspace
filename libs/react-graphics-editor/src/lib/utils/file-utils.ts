// libs/react-graphics-editor/src/lib/utils/file-utils.ts

export interface SVGParseResult {
  success: boolean;
  items?: paper.Item[];
  error?: string;
}

export interface FileValidationResult {
  valid: boolean;
  type?: string;
  error?: string;
}

/**
 * Validates if a file is a supported graphics format
 */
export function validateGraphicsFile(file: File): FileValidationResult {
  const supportedTypes = [
    'image/svg+xml',
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp'
  ];

  if (!supportedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file type: ${file.type}. Supported types: SVG, PNG, JPEG, GIF, WebP`
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size: 10MB`
    };
  }

  return {
    valid: true,
    type: file.type
  };
}

/**
 * Parses SVG content and converts it to Paper.js items
 */
export function parseSVGContent(svgContent: string): SVGParseResult {
  try {
    // Create a temporary DOM element to parse SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');

    // Check for parser errors
    const parserError = svgDoc.querySelector('parsererror');
    if (parserError) {
      return {
        success: false,
        error: 'Invalid SVG format'
      };
    }

    const svgElement = svgDoc.documentElement;
    if (!svgElement || svgElement.tagName.toLowerCase() !== 'svg') {
      return {
        success: false,
        error: 'Not a valid SVG document'
      };
    }

    // For now, we'll create a simple representation
    // In a full implementation, this would use a proper SVG to Paper.js converter
    const items: paper.Item[] = [];

    // Create a text item to represent the imported SVG
    const textItem = new paper.PointText(new paper.Point(100, 100));
    textItem.content = `SVG Import (${svgContent.length} chars)`;
    textItem.fillColor = new paper.Color('#2563eb');
    textItem.fontSize = 14;
    textItem.fontFamily = 'Arial, sans-serif';

    items.push(textItem);

    return {
      success: true,
      items
    };

  } catch (error) {
    return {
      success: false,
      error: `Failed to parse SVG: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Reads a file as text content
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading error'));
    };

    reader.readAsText(file);
  });
}

/**
 * Reads an image file and creates a Paper.js Raster item
 */
export function createImageFromFile(file: File): Promise<paper.Raster> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        img.onload = () => {
          try {
            const raster = new paper.Raster(img);
            raster.position = new paper.Point(200, 150);
            resolve(raster);
          } catch {
            reject(new Error('Failed to create raster from image'));
          }
        };

        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };

        img.src = result;
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading error'));
    };

    reader.readAsDataURL(file);
  });
}
