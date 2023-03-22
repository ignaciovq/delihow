'use client'
// @ts-nocheck
import styles from './page.module.css'

export default function RecipeCreator () {
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.inputNames}>Titulo</span>
        <input type='text' id={styles.title} className={styles.txtArea} />
      </div>
      <div>
        <span className={styles.inputNames}>Descripcion</span>
        <textarea id={styles.description} onChange={increaseHeight} className={styles.txtArea} />
      </div>
      <div>
        <span className={styles.inputNames}>Ingredientes</span>
        <textarea id={styles.ingredients} onChange={increaseHeight} className={styles.txtArea} />
      </div>
      <div>
        <span className={styles.inputNames}>Imagen</span>
        <input id={styles.img} type='file' multiple accept='image/*' />
      </div>
      <div>
        <span style={{ fontSize: '2rem' }} className={styles.inputNames}>Tiempo de prep (minutos)</span>
        <input type='number' id={styles.time} className={styles.txtArea} />
      </div>
      <div>
        <span className={styles.inputNames}>Dificultad</span>
        <select id={styles.complexity}>
          <option value='1'>Facil</option>
          <option value='2'>Medio</option>
          <option value='3'>Dificil</option>
        </select>
      </div>
      <div>
        <span className={styles.inputNames}>Preparacion</span>
        <textarea id={styles.steps} onChange={increaseHeight} className={styles.txtArea} />
      </div>
      <button id={styles.createBtn} onClick={create}>Crear</button>
    </div>
  )

  function create () {
    const title = document.getElementById(styles.title) as HTMLInputElement
    const description = document.getElementById(styles.description) as HTMLTextAreaElement
    const ingredients = document.getElementById(styles.ingredients) as HTMLTextAreaElement
    const img = document.getElementById(styles.img) as HTMLInputElement
    const complexity = document.getElementById(styles.complexity) as HTMLSelectElement
    const steps = document.getElementById(styles.steps) as HTMLTextAreaElement
    const time = document.getElementById(styles.time) as HTMLInputElement
    const recipe = {
      title: title.value,
      description: description.value,
      ingredients: ingredients.value,
      img: img.value,
      complexity: complexity.value,
      steps: steps.value,
      prepTime: time.value
    }
    console.log({ recipe })
    // @ts-ignore
    if (img.value !== '' && !img.files[0].type.match('image.*')) {
      alert('The selected file is not an image')
      return
    }
    if (img.value === '') {
      console.log('No image selected')
      return
    }
    if (img.files !== null && img.files.length > 0) {
      const imgs: string[] = []
      for (let i = 0; i < img.files.length; i++) {
        const reader = new FileReader()
        reader.readAsDataURL(img.files[i])
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            imgs.push(reader.result)
          }
        }
      }
      setTimeout(() => {
        fetch('/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...recipe,
            img: imgs
          })
        }).then((res) => {
          if (res.status === 200) { alert('Recipe created') }
        })
      }, 1000)
    } else {
      alert('No image selected')
    }
  }
  function increaseHeight (e: any) {
    e.target.style.height = '0px'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
}
