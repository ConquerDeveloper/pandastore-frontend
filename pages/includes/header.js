import Head from "next/head";

export default function Header() {
    return (
        <Head>
            <title>PandaStore - Inicio</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet"/>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
                    crossOrigin="anonymous"></script>

            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://kit.fontawesome.com/a6e6518a03.js" crossOrigin="anonymous"></script>
        </Head>
    );
}