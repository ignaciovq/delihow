import styles from '../page.module.css'

const Instructions = ({ steps }:{steps: string}) => {
  const { stepsList } = styles
  return (
    <section id={stepsList} className='flex_column'>
      <h2>Instrucciones</h2>
      <div>
        {steps.split('\n').map((step, index) => (
          <div key={step} className='flex_row'>
            <span>{index + 1}.</span>
            <span>{step}.</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Instructions
