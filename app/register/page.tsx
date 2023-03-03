'use client'
import styles from './registration.module.css'
import { object, string } from 'yup'
import { createHash } from 'crypto'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import isValidImage from '@/app/register/isValidImage'
import { FilePondFile } from 'filepond'
import readFileAsync from '@/app/register/readFileAsync'

// Registering FilePond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Creating Yup validation schema
const signupSchema = object().shape({
  email: string()
    .email('Por favor ingrese un email válido')
    .required('El campo es requerido'),
  password: string()
    .min(7, 'La contraseña debe tener al menos 7 caracteres')
    .max(15, 'La contraseña no debe superar los 15 caracteres')
    .required('El campo es requerido'),
  confirmPassword: string()
    .required('El campo es requerido')
    .test('passwords-match', 'Las contraseñas deben coincidir', function (value) {
      return this.parent.password === value
    }),
  name: string()
    .min(2, 'Por favor ingrese su nombre')
    .required('El campo es requerido')
})

// Defining default values for the form
const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  picture: []
}

export default function Registration () {
  const { container, registrationForm, formField, fileInput, errorField } = styles
  // State for the filepond component
  const [pictureFiles, setPictureFiles] = useState(initialValues.picture)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(signupSchema)
  })

  const onSubmit = async (data: any) => {
    let picture = ''

    const { confirmPassword, password, ...otherValues } = data
    const pictureFile = (pictureFiles[0] as FilePondFile)?.file as File

    const passwordHash = createHash('sha256').update(password).digest('hex')

    try {
      if (pictureFile) {
        if (!isValidImage(pictureFile)) {
          console.error('Invalid image file')
          return
        }
        picture = await readFileAsync(pictureFile)
      }

      const newUser = {
        password: passwordHash,
        ...otherValues,
        picture
      }

      console.log(newUser)

      await fetch('/api/secure/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      reset(initialValues)
      setPictureFiles(initialValues.picture)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registro</h1>
        <div className={registrationForm}>
          <div>
            <div className={formField}>
              <label htmlFor='email'>Email<span>*</span></label>
              <input type='email' {...register('email')} />
              <p className={errorField}>{errors.email?.message}</p>
            </div>
            <div className={formField}>
              <label htmlFor='password'>Contraseña<span>*</span></label>
              <input type='password' {...register('password')} />
              <p className={errorField}>{errors.password?.message}</p>
            </div>
            <div className={formField}>
              <label htmlFor='confirmPassword'>Confirmar Contraseña<span>*</span></label>
              <input type='password' {...register('confirmPassword')} />
              <p className={errorField}>{errors.confirmPassword?.message}</p>
            </div>
            <div className={formField}>
              <label htmlFor='name'>Nombre<span>*</span></label>
              <input type='text' {...register('name')} />
              <p className={errorField}>{errors.name?.message}</p>
            </div>
          </div>
          <div className={fileInput}>
            <label htmlFor='picture'>Foto de perfil</label>
            <FilePond
              files={pictureFiles}
              onupdatefiles={setPictureFiles}
              allowMultiple={false}
              name='picture'
              labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action">Examinar</span>'
              acceptedFileTypes={['image/*']}
            />
            <p className={errorField}>{errors.picture?.message}</p>
          </div>
        </div>
        <button type='submit'>Registrarme</button>
      </form>
    </div>
  )
}
