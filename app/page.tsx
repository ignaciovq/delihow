import styles from './page.module.css'
import RecipeGrid from '@/app/components/recipeGrid'

const recipes = [
  {
    id: 1,
    title: 'Ensalada de quinoa',
    description: 'Una ensalada saludable y deliciosa llena de proteínas.',
    complexity: 1,
    steps: ['Cocinar la quinoa', 'Picar los vegetales', 'Mezclar todo en un tazón'].join('\n'),
    prepTime: 30,
    ingredients: ['Quinoa', 'Tomate', 'Pepino', 'Cebolla'],
    images: ['/images/default_recipe_image.png'],
    tags: ['ensalada', 'quinoa'],
    creatorId: 14
  },
  {
    id: 2,
    title: 'Pizza Margarita',
    description: 'La clásica pizza italiana con tomates frescos, mozzarella y albahaca.',
    complexity: 2,
    steps: ['Preparar masa para pizza', 'Hornear la masa por unos minutos', 'Agregar salsa, tomates, mozzarella y albahaca', 'Hornear otra vez hasta que esté dorado'].join('\n'),
    prepTime: 60,
    ingredients: ['Harina', 'Levadura', 'Agua', 'Sal', 'Aceite de Oliva', 'Salsa de Tomate', 'Mozzarella', 'Albahaca Fresca'],
    images: ['https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'],
    tags: ['pizza'],
    creatorId: 15
  },
  {
    id: 3,
    title: 'Tacos Veggie',
    description: 'Tacos vegetarianos llenos de sabor con guacamole casero y salsa picante.',
    complexity: 3,
    steps: ['Saltear verduras mixtas (pimiento rojo, pimiento amarillo, cebolla) en una sartén hasta que estén tiernas.', 'Calentar tortillas en una sartén o microondas.',
      'Agregar verduras a las tortillas junto con frijoles negros cocidos y aguacate cortado.'].join('\n'),
    prepTime: 40,
    ingredients: ['Verduras Mixtas ', 'Frijoles Negros Cocidos', 'Aguacate', 'Tortillas', 'Salsa Picante', 'Cilantro', 'Lima'],
    images: ['/images/default_recipe_image.png'],
    tags: ['tacos', 'vegetariano'],
    creatorId: 16
  },
  {
    id: 4,
    title: 'Pollo Teriyaki',
    description: 'El plato japonés clásico que es perfecto para cualquier cena entre semana.',
    complexity: 2,
    steps: ['Marinar pollo durante unos minutos.', 'Dorar el pollo en una sartén caliente.', 'Agregar la salsa teriyaki a la sartén hasta que se caramelice.'].join('\n'),
    prepTime: 45,
    ingredients: ['Pechugas De Pollo', 'Sake ', 'Mirin ', 'Azúcar Moreno ', 'Jengibre Rallado ', 'Ajo Picado', 'Salsa De Soja'],
    images: ['/images/default_recipe_image.png'],
    tags: ['pollo', 'teriyaki'],
    creatorId: 14
  },
  {
    id: 5,
    title: 'Donuts Caseros',
    description: 'Deliciosos donuts fritos hechos desde cero!',
    complexity: 3,
    steps: ['Combinar harina, levadura y azúcar. Agregar leche tibia,',
      'agregar huevo batido e incorporarlo bien.',
      'Amasar suavemente durante varios minutos.',
      'Dejar reposando durante unas horas.',
      'Freír los donuts en aceite caliente hasta dorarse ',
      '(opcionalmente agregar cobertura).'].join('\n'),
    prepTime: 120,
    ingredients: [
      'Harina', 'Levadura', 'Azúcar', ' Leche Tbia ', ' Huevo', ' Aceite ', ' Azucara Glas'
    ],
    images: ['/images/default_recipe_image.png'],
    tags: ['donut', 'postre'],
    creatorId: 15
  },
  {
    id: 6,
    title: 'Empanadas Argentinas',
    description: 'Las empanadas argentinas son un platillo típico relleno de carne picada sazonada.',
    complexity: 2,
    steps: [
      'Preparación del relleno salteando carne molida con cebolla picada.',
      'Preparación del pastel mezclando harina,manteca,huevos,sal,y agua.',
      'Después se extiende cada parte individualmente ',
      '(deben ser pequeñas pero lo suficientemente grandes como para contener el relleno),se coloca una cantidad adecuada ',
      'del relleno sobre ella colocándola luego sobre sí misma formando media luna sellandola bien haciendo repulgue .',
      '.Por último freir u hornear según prefieras.'
    ].join('\n'),
    prepTime: 90,
    ingredients: [
      '"Carne Molida"', ' Cebolla ', ' Harina ', ' Manteca ',
      '"Huevos"', ' Agua ', ' Sal '
    ],
    images: ['/images/default_recipe_image.png'],
    tags: ['empanadas', 'argentina'],
    creatorId: 16
  },
  {
    id: 7,
    title: 'Macarrones Con Queso Al Horno',
    description: 'Un plato reconfortante hecho a base pasta horneados gratinados con queso cheddar cremoso.',
    complexity: 2,
    steps: [
      'Cocer macarrones segun las instrucciones del paquete.',
      'Mientras tanto hacer bechamel derretiendo mantequilla agregamos harina revolviendo constantemente ',
      'Agregar leche poco a poco sin dejar dejar revolver continuamente. Una vez espese agregar mostaza Dijon opcional) ',
      'Incorporamos quesos cheddar rallados previamente reservando un poco.(y opcinalmente bacon ) Revolvemos biene ncorporamos los macarrones ya cocidos.'
    ].join('\n'),
    prepTime: 50,
    ingredients: [
      'Macarrones Elbow', ' Mantequilla ', ' Harina All Purpose', ' Leche Entera ',
      '"Mostaza Dijon"(Opcional)', '"Queso Cheddar Rallado"', '(Bacon Opcional)'
    ],
    images: ['/images/default_recipe_image.png'],
    tags: ['mac&chesse', 'horneado', 'queso'],
    creatorId: 14
  },
  {
    id: 8,
    title: 'Paella Valenciana',
    description: 'Un arroz cargado lleno mariscos carnes salchichas especias.y mucho amor valenciano!',
    complexity: 3,
    steps: [
      'Limpieza limpiar los mariscos retirándoles sus cáscaras,cola,cabeza etc..(reservandolas)',
      'Poner caldo prepara anteriorente en fuego bajo manteniendolo caliente siempre (sin llegar al punto ebullición).',
      'Sofrito añadir aceite oliva,freir ajos,pimientos,tomates,carnes(pollos,chuleta cerdo...),salchichaa...',
      'Añadir arroz sofreimos brevemente,luego añade- mos todo tipo especias(pimentón color,mixto...) removemos bien antes incluir reserva(cáscara gambas/colitas sepia/etc.) i vaso vino blanco(reduciendo alcohol)',
      'Agregamos caldo(la proporción debe ser el doble volumen respecto al arroz)y dejamo hervir fuerte unos minuto baje fuego tiempo restante(15-20m)añadiendo agua si necesario chequearemos punto sal/o líqido.'
    ].join('\n'),
    prepTime: 105,
    ingredients: [
      '"Arroz Bomba Tipico Paella Valenciana"',
      '"Gambones Grandes"',
      '"Sepia Mediana/"Pequeña""', 'Chirlonas(Optional)', '(Pollo,Conejo,...)', 'Morcilla/Bandes/Panceta(Sustitutivo)',
      'Ajos/Tomate/Medio Pimiento Rojo/' + '"Ñoras Secs"/Mixto Especias/AceitedeOliva/VinoBlanco/Salt'
    ],
    images: ['/images/default_recipe_image.png'],
    tags: ['paella', "'valencia'"],
    creatorId: 15
  }]

export default function Home () {
  const { container } = styles
  return (
    <div className={container}>
      <RecipeGrid recipeList={recipes} />
    </div>
  )
}
