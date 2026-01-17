
import React, { useState, useEffect } from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { generateSanitaryImage } from '../services/imageService';

interface ProductImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "16:9" | "4:3";
}

const ProductImage: React.FC<ProductImageProps> = ({ prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setLoading(true);
      const url = await generateSanitaryImage(prompt);
      if (isMounted) {
        if (url) {
          setImageUrl(url);
          setError(false);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [prompt]);

  const aspectClass = {
    "1:1": "aspect-square",
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]"
  }[aspectRatio];

  if (loading) {
    return (
      <div className={`${aspectClass} ${className} bg-gray-100 flex flex-col items-center justify-center space-y-2 animate-pulse`}>
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Génération B2B...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`${aspectClass} ${className} bg-gray-200 flex flex-col items-center justify-center text-gray-400`}>
        <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
        <span className="text-xs">Image non disponible</span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className={`${className} object-cover transition-opacity duration-700 opacity-100`}
      loading="lazy"
    />
  );
};

export default ProductImage;
