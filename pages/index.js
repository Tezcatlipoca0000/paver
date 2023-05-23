import Layout from '@/components/layout';
import Image from 'next/image';
import { useState } from 'react';
import { Dancing_Script } from 'next/font/google';
import { MuseoModerno } from 'next/font/google';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { FaFacebookSquare } from 'react-icons/fa';
import getCatalog from '@/lib/getCatalog';

// MAYBE: add model name to each image caption

const tltFont = Dancing_Script({ weight: '700', subsets: ['latin'] });
const bdyFont = MuseoModerno({ weight: '500', subsets: ['latin'] });

export default function Home({ catalog }) {

  const [lrg, setLrg] = useState(false);

  /* makes div visible & sets img src element */
  function enlarge(e) {
    setLrg(true);
    let img = document.getElementById('largerImage'),
        src = e.target['data-loaded-src'];
    img['src']= src;
  }

  /* makes div hidden on icon click */
  function closeImg() {
    setLrg(false);
  }

  /* makes div hidden on 'esc' key-Press */
  function handleKey(e) {
    let key = e.key;
    if (key === 'Escape' && lrg) {
      setLrg(false);
    }
  }

  /* makes div hidden on click outside img */
  function handleClick(e) {
    let target = e.target;
    if (!target.closest('#largerImage') && lrg) {
      setLrg(false);
    }
  }

  /* the catalog of images rendered from props */
  const renderedCatalog = Object.keys(catalog).map((key) => {
    const items = catalog[key];
    return (
      <div key={`cont-${key}`} className='w-full flex flex-col'>
        <p key={`p-${key}`} className='text-3xl italic ml-12 mt-12'>{key}</p>
        <div key={`rect-${key}`} className='place-self-center flex justify-center items-center flex-wrap'>
          {items.map((item) => (
            <Image key={`img-${item}`} src={`/${key}/${item}`} width={150} height={150} alt={item} onClick={enlarge} className='cursor-zoom-in m-4' />
          ))}
        </div>
        <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
      </div>
    );
  });

  return (
    <Layout title={'Pa-Ver Óptica'}>
      <div tabIndex={-1} onKeyDown={handleKey} onClick={handleClick}>

        {/*---- Header ----*/}
        <div id='top' className='min-w-full min-h-screen flex flex-col items-center justify-center relative'>
          <Image src={'/paver1.jpg'} fill={true} alt='' className='-z-10 opacity-50 bg-local'/>
            <div className='flex flex-col items-center justify-center md:flex-row mt-10'>
              <Image src="/paver-logo.jpg" width={200} height={200} alt='Logo Pa-Ver' className='rounded-full'/>
              <div className={`flex flex-col items-center justify-between mx-4 my-2 text-4xl md:text-6xl ${tltFont.className} text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-rose-800 text-justify`}>
                <h1>Óptica Pa-Ver</h1>
                <h2>Tú Óptica de Confianza</h2>
              </div>
            </div>
            <div className={`mx-10 my-10 md:mx-20 md:my-32 text-2xl md:text-4xl ${bdyFont.className} text-justify`}>
              <p>Estamos comprometidos a ofrecer anteojos de calidad a bajo precio. Ofrecemos servicio a <a href='#emp' className='text-blue-800 underline decoration-blue-800 underline-offset-4'>empresas</a> y a particulares y contamos con un amplio <a href='#cat' className='text-blue-800 underline decoration-blue-800 underline-offset-4'>catálogo</a> de armazones. <a href='#con' className='text-blue-800 underline decoration-blue-800 underline-offset-4'>Contáctanos</a> y conoce nuestras promociones.</p>
            </div>
        </div>

        {/*---- Companies ----*/}
        <div id='emp' className={`min-w-full min-h-screen flex flex-col items-center justify-center relative ${bdyFont.className}`}>
          <Image src={'/paver2.jpg'} fill={true} alt='' className='-z-10 opacity-50' />
          <h3 className='text-4xl mt-10'>Atención a Empresas</h3>
          <p className='ml-12 mt-20 text-2xl'>Ofrecemos servicio a empresas dentro de sus propias instalaciones y al mejor precio.</p>
          <p className='ml-12 mt-10 text-2xl'>Contamos con más de 10 años de experiencia brindando la atención que nos caracteriza.</p> 
          <p className='ml-12 mt-10 text-2xl'><a href='#con'>Contáctanos</a> para conocer nuestros planes y agendar tu cita.</p>
          <p className='ml-6 mt-20 text-lg'>Algunas de las empresas que atendemos:</p>
          <div className='flex mx-8 w-11/12 justify-evenly my-10 bg-zinc-300 opacity-70'>
            <Image src={'/logo-emp.png'} height={100} width={100} alt='Logo Empresa 1' />
            <Image src={'/logo-emp.png'} height={100} width={100} alt='Logo Empresa 2' />
            <Image src={'/logo-emp.png'} height={100} width={100} alt='Logo Empresa 3' />
          </div>
        </div>

        {/*---- Catalog ----*/}
        <div id='cat' className={`min-w-full min-h-screen flex flex-col ${bdyFont.className} items-center justify-center bg-gradient-to-bl from-pink-500 to-yellow-500`}>
          <h3 className='text-4xl mt-10'>Nuestro Catálogo</h3>
          {renderedCatalog}
          <div className='block mb-12'></div>
        </div>

        {/*---- Contact ----*/}
        <div id='con' className={`min-w-full flex flex-col justify-center items-center ${bdyFont.className} bg-fuchsia-500`}>
          <h3 className='text-4xl mt-24'>Contáctanos</h3>
          <div className='flex w-11/12 mx-8 justify-evenly my-12 space-x-4'>
            <div className='flex flex-col'>
              <h4 className='mb-4'>Estamos ubicados en:</h4>
              <p>P. Sta. Elena 1357</p>
              <p>Paseo de Santa Fe, Juárez, N.L.</p>
              <p>C.P. 67260</p>
            </div>
            <div className='flex flex-col'>
              <h4 className='mb-4'>¡También vamós a tú domicilio!</h4>
              <p>Agenda tu cita en:</p>
              <p>Tel: 81 2878 5491</p>
            </div>
            <div className='flex flex-col mb-24'>
              <h4 className='mb-4'>Visita Nuestras Redes Sociales:</h4>
              <div className='flex space-x-4'>
                <a href='https://m.facebook.com/people/%C3%93ptica-paver/100063131566979/' target='_blank'>
                  <IconContext.Provider value={{size: '32px'}}>
                    <FaFacebookSquare className='fill-blue-500'/>
                  </IconContext.Provider>
                </a>
                <a href='https://instagram.com' target='_blank'>
                  <Image src={'/instagram.svg'} width={32} height={32} alt='' />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/*---- Large Image ----*/}
        <div className={`${lrg ? 'flex' : 'hidden'} w-screen h-screen fixed justify-center items-center top-0 left-0`} >
          <div className='w-full h-full md:w-9/12 md:h-5/6 bg-white flex flex-col rounded-md ring-2 ring-blue-500'>
            <div className='w-full h-8 flex items-center justify-end pr-4 opacity-50 rounded-md border-b-2'>
              <IconContext.Provider value={{size: '1.5em'}}>
                <AiOutlineCloseCircle className=' fill-red-500 hover:fill-cyan-400' onClick={closeImg}/>
              </IconContext.Provider>
            </div>
            <div className='relative w-full h-full rounded-md'>
              <Image id='largerImage' fill={true} alt='Imagen agrandada' src={''} />
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

/* imports the catalog from the file system */
export function getStaticProps() {
  const catalog = getCatalog()
  return {
    props: {
      catalog,
    },
    revalidate: 10,
  };
}