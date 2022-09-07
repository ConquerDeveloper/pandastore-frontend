import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from "./includes/header";
import Navbar from "./includes/navbar";
import styles from "../styles/Home.module.css";
import Footer from "./includes/footer";
import Constants from "../constants/Constants";
import ProductCard from "./includes/product-card";

export default function Productos({categoriesList}) {

    const [products, setProducts] = useState([]);
    const [checkboxCollection, setCheckboxCollection] = useState([]);
    const [isAllSelected, setAllSelected] = useState(true);
    const checkboxInputRef = useRef();

    const getProducts = useCallback(async () => {
        const productsData = await fetch(isAllSelected ? `${Constants.HOST}/api/productos?populate[imagen][populate][0]=imagen&populate[categorias][populate][0]=categoria` : `${Constants.HOST}/api/productos?populate[imagen][populate][0]=imagen&populate[categorias][populate][0]=categorias${checkboxCollection.length && checkboxCollection.map((item) => `&filters[categorias][nombre][$eq]=${item}`).join("")}`);
        const {data: productsList, pagination} = await productsData.json();
        setProducts(productsList);
    }, [checkboxCollection, isAllSelected]);

    useEffect(() => {
        (async () => await getProducts())();
    }, [getProducts]);

    const checkAllSelected = useCallback(() => {
        const isChecked = true;
        setAllSelected(isChecked);
        //Empty all the other selections
        setCheckboxCollection([]);
    }, []);

    const setCheckboxValue = useCallback((e) => {
        const isChecked = e.target.checked;
        const value = e.target.value
        if (isChecked) {
            setAllSelected(!isChecked);
            let categoryArray = [...checkboxCollection, value];
            setCheckboxCollection(categoryArray);
        } else {
            const index = checkboxCollection.indexOf(value);
            if (index > -1) {
                const removed = [...checkboxCollection.slice(0, index),
                    ...checkboxCollection.slice(index + 1, checkboxCollection.length)];
                setCheckboxCollection(removed);
            }
        }
    }, [checkboxCollection]);

    return (
        <div className={"page-container"}>
            <Header/>
            <Navbar/>

            <main>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.subtitleLabel}>
                                <h1>PRODUCTOS</h1>
                            </div>
                            <div className={"content py-5"}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-3">
                                            <aside className="sidebar">
                                                <section>
                                                    <header>
                                                        <h1>CATEGORÍAS</h1>
                                                    </header>
                                                    <main>
                                                        <ul className={"text-start"}>
                                                            <li>
                                                                <label htmlFor="">
                                                                    <input type="checkbox"
                                                                           checked={isAllSelected}
                                                                           onChange={checkAllSelected}
                                                                           value={"TODOS"}/> TODOS
                                                                </label>
                                                            </li>
                                                            {
                                                                categoriesList.length && categoriesList.map((item) => (
                                                                    <li key={item.id}>
                                                                        <label htmlFor="">
                                                                            <input type="checkbox"
                                                                                   {...(isAllSelected ? {checked: false} : true)}
                                                                                   name={item.attributes.nombre}
                                                                                   ref={checkboxInputRef}
                                                                                   value={item.attributes.nombre}
                                                                                   onChange={setCheckboxValue}/> {item.attributes.nombre}
                                                                        </label>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </main>
                                                </section>
                                            </aside>
                                        </div>
                                        <div className="col-9">
                                            <div className={styles.subtitleLabel}>
                                                <h1>Lista de productos</h1>
                                            </div>
                                            <div className="container">
                                                <div className="row mt-4">
                                                    {
                                                        products.length ? products.map((item) => {
                                                                return (
                                                                    <div className={`col-3 text-start`} key={item.id}>
                                                                        <ProductCard productItem={item}/>
                                                                    </div>
                                                                )
                                                            }) :
                                                            <p className="text-start">No hay productos disponibles</p>
                                                    }
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="col-12">
                                                        <div className="d-grid gap-2">
                                                            <button type={"button"}
                                                                    className={"btn btn-block btn-primary shadow-none"}>Cargar
                                                                más
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
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export async function getStaticProps() {
    const [categoriesData, allProductsData] = await Promise.all([
        fetch(`${Constants.HOST}/api/categorias`)
    ]);
    const {data: categoriesList} = await categoriesData.json();

    return {
        props: {
            categoriesList,
        }
    }
}