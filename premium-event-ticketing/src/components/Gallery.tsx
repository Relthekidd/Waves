import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    'https://picsum.photos/id/1015/300/200',
    'https://picsum.photos/id/1025/300/200',
    'https://picsum.photos/id/1035/300/200',
    'https://picsum.photos/id/1045/300/200',
    'https://picsum.photos/id/1055/300/200',
  ];

  return (
    <section id="gallery" className="gallery fade-in">
      <h2>Past Highlights</h2>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Event photo ${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;