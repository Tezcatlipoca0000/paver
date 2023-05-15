import Head from "next/head";

export default function Layout( {children, title} ) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Optica Paver. Optometrista a domicilio. En Monterrey, San Nicolas, Juarez, Guadalupe, Escobedo, Apodaca y Santa Catarina. Ordena hoy tus nuevos lentes económicos y de calidad. Anteojos para dama y caballero"/>
                <meta property="og:title" content={title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content="/paver-logo.jpg"/>
                <meta property="og:url" content="https://www.paver.com"/>
            </Head>
            <main>
                {children}
            </main>
        </>
    );
}