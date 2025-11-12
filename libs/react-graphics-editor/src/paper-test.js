// Simple test to verify Paper.js initialization
import paper from 'paper';

console.log('Paper.js version:', paper.version);
console.log('Paper.js setup available:', typeof paper.setup);

// Test basic Paper.js functionality
try {
  // Create a mock canvas for testing
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;

  // Setup Paper.js directly
  paper.setup(canvas);

  console.log('Paper.js setup successful!');
  console.log('Paper.js view available:', !!paper.view);
  console.log('Paper.js project available:', !!paper.project);

} catch (error) {
  console.error('Paper.js setup failed:', error);
}
