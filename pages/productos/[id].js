import React from 'react';
import Constants from "../../constants/Constants";
import Header from "../includes/header";
import Navbar from "../includes/navbar";
import Sidebar from "../includes/sidebar";
import Footer from "../includes/footer";
import styles from "../../styles/Home.module.css";

export default function Producto({id, productInfo}) {

    return (
        <div className={"page-container"}>
            <Header/>
            <Navbar/>
            <main>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.subtitleLabel}>
                                <h1>{productInfo.titulo}</h1>
                            </div>
                            <div className="content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="row mx-auto">
                                                <div className="col-2">
                                                    {
                                                        productInfo.imagen.data.length && productInfo.imagen.data.map((item) => (
                                                            <div key={item.id}>
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img src={`${Constants.HOST}${item.attributes.url}`}
                                                                     className={"img-fluid"}
                                                                     alt={item.attributes.name}/>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="col-10">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={`${Constants.HOST}${productInfo.imagen.data[0].attributes.url}`}
                                                        className={"img-fluid"}
                                                        alt={productInfo.imagen.data[0].attributes.name}/>
                                                </div>
                                            </div>
                                            <hr className={"mt-4"}/>

                                            <h4>Descripción</h4>
                                            <p>{productInfo.descripcion}</p>
                                        </div>
                                        <div className="col-4">
                                            <div style={{
                                                border: "1px solid rgba(0, 0, 0, .2)",
                                                borderRadius: 5,
                                                padding: 20
                                            }}>
                                                <p className={"text-uppercase mb-1"} style={{color: "rgba(0, 0, 0, .5)", fontSize: 14}}><strong>{productInfo.categorias.data[0].attributes.nombre}</strong></p>
                                                <h3 className={"mb-1"} style={{fontWeight: 600}}>{productInfo.titulo}</h3>
                                                <div className="mb-2">
                                                    <span style={{
                                                        background: "#09f",
                                                        textTransform: "uppercase",
                                                        color: "#fff",
                                                        borderRadius: 5,
                                                        padding: 5,
                                                        fontWeight: "bold",
                                                        fontSize: 8
                                                    }}>Producto destacado</span>
                                                </div>
                                                <h2>CLP ${parseFloat(productInfo.precio_unidad).toFixed(3)}</h2>
                                                <p>Color: <strong>Negro</strong></p>
                                                <p>Stock disponible</p>
                                                <p>Cantidad: <strong>1 unidad</strong></p>
                                                <div className="d-grid gap-2 mt-4">
                                                    <button type={"button"}
                                                            className={"btn btn-block btn-primary shadow-none"}>Comprar
                                                        ahora
                                                    </button>
                                                    <button type={"button"}
                                                            className={"btn btn-block btn-default border-opacity-90 shadow-none"}>Agregar
                                                        al carrito
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${Constants.HOST}/api/productos/?populate[imagen][populate][0]=imagen&populate[categorias][populate][0]=categoria`)
    const products = await res.json()

    const paths = products.data.map((product) => ({
        params: {id: product.id.toString()},
    }))

    return {paths, fallback: false}
}

export async function getStaticProps({params}) {

    const pageData = await fetch(`${Constants.HOST}/api/productos/${params.id}?populate[imagen][populate][0]=imagen&populate[categorias][populate][0]=categoria`);

    const {
        data: {
            id,
            attributes: productInfo
        }
    } = await pageData.json();

    return {
        props: {
            id,
            productInfo
        },
    }
}