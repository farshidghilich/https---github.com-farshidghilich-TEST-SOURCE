'use client'
import { useEffect, useRef } from 'react';
const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    console.log(navigator.userAgent);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });

    const captureButton = document.getElementById('capture-btn');
    captureButton.addEventListener('click', () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      // Save or display the captured image
      console.log('Captured Image:', imageData);
      
      const capturedImageElement = document.getElementById('captured-image');
      capturedImageElement.src = imageData;
    });
  };

  useEffect(() => {
    handleCapture();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button id="capture-btn">Capture Image</button>
      <img id="captured-image" />
    </div>
  );
};

export default CameraCapture;