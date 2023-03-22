'use client'
import styles from '../page.module.css'
import Image from 'next/image'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'

const ImageViewer = ({ images }:{images: string[]}) => {
  const { imageContainer, imageItem } = styles
  return (
    <section className={imageContainer}>
      {images.length === 1 && (<Image src={images[0]} alt='Foto receta' width={100} height={100} />)}
      {images.length > 1 && (
        <CCarousel controls indicators>
          {images.map((image, index) => (
            <CCarouselItem key={image}>
              <CImage className={imageItem} src={image} alt={`slide${index}`} />
            </CCarouselItem>
          ))}
        </CCarousel>
      )}
    </section>
  )
}

export default ImageViewer
