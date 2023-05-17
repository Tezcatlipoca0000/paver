import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Image from "next/image";
import getCatalog from '@/lib/getCatalog';

export default function edit({ catalog }) {

    const router = useRouter();
    const renderedCatalog = Object.keys(catalog).map((key) => {
        const items = catalog[key];
        return (
        <div key={key} className='flex flex-col'>
            <div className="flex items-center ml-12 mt-12">
                <p key={key} className='text-gray-800 font-semibold py-2 px-4'>{key}</p>
                <button className="bg-white hover:bg-red-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Borrar Marca</button>
            </div>
            <div key={key} className='flex justify-center items-center flex-wrap'>
            {items.map((item) => (
                <div key={key} className="flex justify-center items-center bg-slate-300 m-4 p-4">
                    <Image key={key} src={`/${key}/${item}`} width={150} height={150} alt={item} className='m-4' />
                    <div key={key}>
                        <button className="bg-white hover:bg-red-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Borrar Modelo</button>
                    </div>
                </div>
            ))}
          </div>
          <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
        </div>
        );
      });

    useEffect(()=>{
        const login = router.query.access;
        if (!login) {
            router.push('/');
        }
    }, [router.query]);

    return (
        <Layout title={'Administrar Pa-Ver'}>
            <div className="flex flex-col justify-center items-center">
                <h1 className="m-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Interfaz para la Edición del Catálogo</h1>
                <div>
                    <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
                    {renderedCatalog}
                </div>
                <div>
                    
                </div>
            </div>
        </Layout>
    )
}


export function getStaticProps() {
    const catalog = getCatalog()
    
    return {
      props: {
        catalog,
      },
    };
  }