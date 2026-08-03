import { useState } from "react";

import "../styles/Gallery.css";

type GalleryItem = {
  src: string;
  alt?: string;
};

type GalleryProps = {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
  };

  return (
    <div className="gallery">
      {items.map((_, index) => (
        <input
          type="radio"
          name="gallery"
          key={`gallery-image-${index}`}
          id={`gallery-image-${index}`}
          value={index}
          checked={index === selectedIndex}
          onChange={(e) => handleThumbnailClick(Number(e.target.value))}
        />
      ))}
      <div className="gallery-preview">
        {items.map((item, index) => (
          <img
            key={`preview-${index}`}
            src={item.src}
            alt={item.alt}
            className={`preview-image ${index === selectedIndex ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="gallery-thumbnails">
        {items.map((item, index) => (
          <label
            key={`thumbnail-${index}`}
            htmlFor={`gallery-image-${index}`}
            aria-label={`View ${item.alt}`}
            className={`thumbnail ${index === selectedIndex ? "active" : ""}`}
          >
            <img src={item.src} alt={item.alt} />
          </label>
        ))}
      </div>
    </div>
  );
}