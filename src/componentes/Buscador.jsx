import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',];

const monthImages = {
    Enero: 'https://www.cascada.travel/hs-fs/hubfs/fireworks_in_valparaiso_chile_by_alinneko-d5q1scb.jpg?width=600&name=fireworks_in_valparaiso_chile_by_alinneko-d5q1scb.jpg',
    Abril: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSBkfZXhUWQ3kdm4yizOOPGYhFkajwlPU2w&usqp=CAU',
    Mayo: 'https://colegiosanmarcel.cl/wp-content/uploads/2021/05/Combate-Naval-de-Iquique-%C3%B3leo-sobre-lienzo-de-pintura-de-Thomas-Somerscales..jpg',
    Junio: 'https://media-front.elmostrador.cl/2021/12/pueblos-indigenas.jpg',
    Julio: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMXJ-L-fpcAb7cGyBI5WrJNyER7BYUEIgFqg&usqp=CAU',
    Agosto: 'https://galerias.iglesia.cl/Gale_57b621958064a/Gale57b62195e194b_18082016_559pm.jpg',
    Septiembre: 'https://colombiaencl.cl/wp-content/uploads/2014/09/fiestas-patrias.jpg',
    Octubre: 'https://www.alajuelenses.com/dir/wp-content/uploads/2015/04/alajuelenses-12-de-octubre-cristobal-colon-guanahani.jpg',
    Diciembre: 'https://img.asmedia.epimg.net/resizer/hwLVWFVh8E5VLmLNa34cFXNERbE=/1472x828/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/B6P3WL2I3VOHBLYN3AXYVGFBEQ.jpg',
};

const Buscador = ({ data }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedMonthImage, setSelectedMonthImage] = useState(null);
    const [sortAlphabetically, setSortAlphabetically] = useState(false);

    const filterHolidays = () => {
        if (!selectedMonth) {
            setErrorMessage('Por favor, selecciona un mes para continuar.');
            setSelectedMonthImage(null);
            return;
        }

        const filteredByMonth = data.filter(
            (item) => new Date(item.date).getMonth() === months.indexOf(selectedMonth)
        );

        setFilteredData(filteredByMonth);
        setShowTable(filteredByMonth.length > 0);

        if (filteredByMonth.length === 0) {
            setErrorMessage('No se han encontrado feriados para el mes seleccionado.');
            setSelectedMonthImage(null);
        } else {
            setErrorMessage('');
            setSelectedMonthImage(monthImages[selectedMonth]);
        }
    };

    const showAllDates = () => {
        let allDates = [...data];
        if (sortAlphabetically) {
            allDates = allDates.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredData(allDates);
        setShowTable(allDates.length > 0);
        setErrorMessage('');
        setSelectedMonthImage(null);
    };

    return (
        <div className="buscador-component">
            <div className='ordenar'>
                <div className='buscador'>
                    <div>
                        <Button className='button-total' onClick={showAllDates} variant='secondary'>
                            Ver todas las fechas
                        </Button>
                    </div>
                    <div>
                        <select className='select' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option value="">Selecciona un mes</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <Button onClick={filterHolidays} variant='outline-secondary'>Buscar</Button>
                    </div>
                </div>

                <Button
                    className='button-ordenar'
                    onClick={() => setSortAlphabetically(!sortAlphabetically)}
                    variant={sortAlphabetically ? 'outline-success' : 'outline-danger'}
                >
                    {sortAlphabetically ? 'Desactivar orden alfabético' : 'Activar orden alfabético'}
                </Button>
            </div>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {showTable && (
                <div className="resultados">
                    <table>
                        <thead>
                            <tr>
                                <th>Efeméride</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedMonthImage && (
                <div className="imgs">
                    <img
                        src={selectedMonthImage}
                        alt={selectedMonth}
                        style={{ width: '500px', height: '400px', borderRadius: '30px', margin: '20px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default Buscador;