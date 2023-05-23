import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Image from "next/image";
import getCatalog from '@/lib/getCatalog';
import { withSessionSsr } from "@/lib/withSession";

export default function edit({ catalog, user }) {

    const router = useRouter();

    /* Handles posting a new brand and images to the file system */
    async function postBrand(e) {
        e.preventDefault();
        const files = e.target.elements.newFile.files;
        let formData = new FormData();
        formData.append('brand', e.currentTarget.newBrand.value);
        for (let i = 0; i < files.length; i++) {
            formData.append(`image${i}`, files[i]);
        }
        const response = await fetch('/api/postBrand', {
            method: 'POST',
            body: formData
        });
        let data;
        try {
            data = await response.json();
        } catch(err) {
            data = {error: true}
        }
        if (data.error) {
            alert('Ocurrió un error al guardar la nueva marca. Por favor vuelva a intentarlo.');
        } else {
            alert('¡Marca creada con éxito!');
            await fetch('/api/revalidate');
            router.push('/edit');
        }
    }

    /* Handles posting new images to an existing brand in the file system */
    async function postModel(e) {
        e.preventDefault();
        const brand = e.currentTarget.brandOpt.value
        const files = e.target.elements.newModel.files;
        let formData = new FormData();
        formData.append('brand', brand);
        for (let i = 0; i < files.length; i++) {
            formData.append(`image${i}`, files[i]);
        }
        const response = await fetch('/api/postModel', {
            method: 'POST',
            body: formData
        });
        let data;
        try {
            data = await response.json();
        } catch(err) {
            data = {error: true}
        }
        if (data.error) {
            alert('Ocurrió un error al guardar el nuevo modelo. Por favor vuelva a intentarlo.');
        } else {
            alert('¡Modelo(s) creado(s) con éxito!');
            await fetch('/api/revalidate');
            router.push('/edit');
        }
    }

    /* Handles errasing a brand and images associated from the file system */
    async function erraseBrand(e) {
        let brand = e.target.value;
        const response = await fetch('/api/removeBrand', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({errase: `${brand}`}),
        });
        const data = await response.json();
        if (data.error) {
            alert('Ocurrió un error al borrar la marca. Por favor vuelva a intentarlo.');
        } else {
            alert('¡Marca borrada exitósamente!');
            await fetch('/api/revalidate');
            router.push('/edit');
        }
    }

    /* Handles errasing images of a specific brand from the file system */
    async function erraseModel(e) {
        let value = e.target.value.split('--');
        let brand = value[0],
            model = value[1];
        const response = await fetch('/api/removeModel', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({brand: `${brand}`, model: `${model}`}),
        });
        const data = await response.json();
        if (data.error) {
            alert('Ocurrió un error al borrar el modelo. Por favor vuelva a intentarlo.');
        } else {
            alert('Modelo borrada exitósamente!');
            await fetch('/api/revalidate');
            router.push('/edit');
        }
    }

    /* The catalog of images */
    const renderedCatalog = Object.keys(catalog).map((key) => {
        const items = catalog[key];
        return (
        <div key={`cont-${key}`} className='flex flex-col'>
            <div className="flex items-center ml-12 mt-12">
                <p key={`p-${key}`} className='text-gray-800 font-semibold py-2 px-4'>{key}</p>
                <button value={key} className="bg-white hover:bg-red-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={erraseBrand}>
                    Borrar Marca
                </button>
            </div>
            <div key={`rect-${key}`} className='flex justify-center items-center flex-wrap'>
            {items.map((item) => (
                <div key={`rect-${item}`} className="flex justify-center items-center bg-slate-300 m-4 p-4">
                    <Image key={`img-${item}`} src={`/${key}/${item}`} width={150} height={150} alt={item} className='m-4' />
                    <div key={`rect2-${item}`}>
                        <button value={`${key}--${item}`} className="bg-white hover:bg-red-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={erraseModel}>
                            Borrar Modelo
                        </button>
                    </div>
                </div>
            ))}
          </div>
          <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
        </div>
        );
    });

    /* the catalog keys */
    const brandOptions = Object.keys(catalog).map((key) => (
        <option key={key} value={key}>{key}</option>
    ));

    /* Handles iron-session logout */
    async function handleLogout() {
        const response = await fetch('/api/logout');
        if (response.ok) {
            router.push('/');
        } else {
            alert('Hubo un error al salir. Por favor vuelva a intentarlo.');
        }
    }

    /* Renders the logout banner */
    const logoutBanner = 
        (
            <div>
                <button className="text-2xl text-white bg-red-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-6" onClick={handleLogout}>
                    &#60;--Salir
                </button>
            </div>
        );
    
    return (
        <Layout title={'Administrar Pa-Ver'}>
            <div className="flex flex-col justify-center items-center">
                <div className="h-24 w-full my-6 border flex flex-row justify-end items-center">
                    {logoutBanner}
                </div>
                <h1 className="m-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Interfaz para la Edición del Catálogo
                </h1>
                {/*---REMOVE SECTION*/}
                <div className="w-full">
                    <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
                    <h2 className="text-4xl font-bold dark:text-white m-4">
                        Para Borrar:
                    </h2>
                    <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
                    {renderedCatalog}
                </div>
                {/*---POST SECTION*/}
                <div className="w-full">
                    <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
                    <h2 className="text-4xl font-bold dark:text-white m-4">
                        Para Agregar:
                    </h2>
                    <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
                    <div className="w-full flex flex-col justify-center items-center">     
                        <div className="w-full flex justify-evenly">
                            <form onSubmit={postBrand} className=" p-6 border border-slate-400 rounded-lg">
                                <h3 className="text-3xl font-bold dark:text-white mb-6">
                                    Nueva Marca:
                                </h3>
                                <label htmlFor="newBrand" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Escriba el Nombre de la Marca:
                                </label>
                                <input id="newBrand" name="newBrand" type="text" placeholder="Nombre de la Marca" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"/>
                                <label htmlFor="newFile" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Archivos de Imagen:
                                </label>
                                <input id="newFile" name="newFile" type="file" multiple required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-6"/>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cargar Imagen
                                </button>
                            </form>
                            <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />    
                            <form onSubmit={postModel} className=" p-6 border border-slate-400 rounded-lg">
                                <h3 className="text-3xl font-bold dark:text-white mb-6">
                                    Nuevo Modelo:
                                </h3>
                                <label htmlFor="brandOpt" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Seleccione el Nombre de la Marca:
                                </label>
                                <select id="brandOpt" name="brandOpt" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6">
                                    <option value=''>
                                        --Elije una opción--
                                    </option>
                                    {brandOptions}
                                </select>
                                <label htmlFor="newModel" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Archivos de Imagen:
                                </label>
                                <input id="newModel" name="newModel" type="file" multiple required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-6"/>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cargar Imagen
                                </button>
                            </form>
                        </div>
                        <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
                    </div>
                </div>
                <div className="h-24 w-full my-6 border flex flex-row-reverse justify-end items-center">
                    {logoutBanner}
                </div>
            </div>
        </Layout>
    )
}

/* Handles iron-session verification and imports the catalog of images */
export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const catalog = getCatalog()
        const user = req.session.user;
        if(!user) {
            return {
                notFound: true,
            }
        }
        return {
            props: { catalog, user }
        }
    });
