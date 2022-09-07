export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h5 className={"subtitle"}>Ubicación:</h5>
                        <ul>
                            <li>San Eugenio 1209</li>
                            <li>Dpto 711</li>
                            <li>Torre B</li>
                        </ul>
                        <h5 className={"subtitle"}>Horario:</h5>
                        <ul>
                            <li>Lunes a Viernes: 00:00 - 00:00</li>
                            <li>Sábado: Cerrado</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <h5 className="subtitle">Contáctenos</h5>
                        <ul>
                            <li>Lorem ipsum dolor sit amec</li>
                            <li>Lorem ipsum dolor sit amec</li>
                            <li>Lorem ipsum dolor sit amec</li>
                        </ul>
                        <ul>
                            <li>Lorem ipsum dolor sit amec</li>
                            <li>Lorem ipsum dolor sit amec</li>
                            <li>Lorem ipsum dolor sit amec</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <h5 className="subtitle">Síguenos</h5>
                        <ul className="social-networks">
                            <li>
                                <a href="">
                                    <i className="fa fa-facebook-square"></i>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="fa fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}