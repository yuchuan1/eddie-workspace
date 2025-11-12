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
export declare function validateGraphicsFile(file: File): FileValidationResult;
/**
 * Parses SVG content and converts it to Paper.js items
 */
export declare function parseSVGContent(svgContent: string): SVGParseResult;
/**
 * Reads a file as text content
 */
export declare function readFileAsText(file: File): Promise<string>;
/**
 * Reads an image file and creates a Paper.js Raster item
 */
export declare function createImageFromFile(file: File): Promise<paper.Raster>;
