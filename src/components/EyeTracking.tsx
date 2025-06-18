import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/face_mesh';

const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
const detectorConfig as MediaPipeFaceMeshTfjsModelConfig = {
  runtime: 'tfjs',
  refineLankmarks: true
  
};
detector = await faceLandmarksDetection.createDetector(model, detectorConfig);