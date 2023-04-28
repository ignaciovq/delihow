'use client'
import styles from '../page.module.css'
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const ImageViewer = ({ images }:{images: string[]}) => {
  const { imageContainer, imageItem } = styles
  return (
    <section className={imageContainer}>
      {images.length === 1 && (<Image className={imageItem} src={images[0]} alt='Foto receta' width={100} height={100} />)}
      {images.length > 1 && (
        <Splide
          options={{
            rewind: true,
            lazyLoad: true,
            preloadPages: 1
          }}
          aria-label='Fotos plato terminado'
        >
          {images.map((image, index) => (
            <SplideSlide key={image}>
              <Image className={imageItem} src={image} alt={`slide ${index}`} width={1000} height={1000} />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </section>
  )
}

export default ImageViewer
