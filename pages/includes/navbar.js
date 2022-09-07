import Image from "next/image";
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Constants from "../../constants/Constants";
import {useCallback, useEffect, useState} from "react";
import shoppingCartIcon from "../../public/images/shopping-cart-icon.jpg";

export default function Navbar() {

    const [logo, setLogo] = useState(null);

    const getLogo = useCallback(async () => {
        const logoData = await fetch(`${Constants.HOST}/api/logo?populate=*`);
        const {data: {attributes: {imagen: {data: {attributes: {url: logoUrl}}}}}} = await logoData.json();
        setLogo(logoUrl);
    }, []);

    useEffect(() => {
        (async () => await getLogo())();
    }, [getLogo]);

    return (
        <header>
            <div className={styles.headerContainer}>
                <div>
                    {
                        logo && <Image src={`${Constants.HOST}${logo}`} className={styles.logo} width={100} height={90}
                                       alt={"Logo"}/>
                    }
                </div>
                <div>
                    <i aria-hidden className={`${styles.cartIcon} fa fa-shopping-cart`}/>
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <Link href="/"><a><i aria-hidden className="fa fa-home"></i> Inicio</a></Link>
                    </li>
                    <li>
                        <Link href="/nosotros"><a><i aria-hidden className="fa fa-envelope"></i> Quiénes
                            Somos</a></Link>
                    </li>
                    <li>
                        <Link href="/clientes"><a><i aria-hidden className="fa fa-user"></i> Clientes</a></Link>
                    </li>
                    <li>
                        <Link href="/preguntas"><a><i aria-hidden className="fa fa-box"></i> Preguntas
                            Frecuentes</a></Link>
                    </li>
                    <li>
                        <Link href="/certificaciones"><a><i aria-hidden
                                                            className="fa fa-certificate"></i> Certificaciones</a></Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}