var config = {
    letrasMonedaPlural: "", //"PESOS"
    letrasMonedaSingular: "", //"PESO"

    letrasMonedaCentavoPlural: "",
    letrasMonedaCentavoSingular: "",
};

/**
 * Devuelve las palabras para representar las unidades del número.
 * @param {number} num - Unidades del número.
 * @returns {string} - Palabras que representan las unidades.
 */
const Unidades = (num: number): string => {
    switch (num) {
        case 1:
            return "UN";
        case 2:
            return "DOS";
        case 3:
            return "TRES";
        case 4:
            return "CUATRO";
        case 5:
            return "CINCO";
        case 6:
            return "SEIS";
        case 7:
            return "SIETE";
        case 8:
            return "OCHO";
        case 9:
            return "NUEVE";
    }
    return "";
}

/**
 * Devuelve las palabras para representar las decenas del número.
 * @param {number} num - Decenas del número.
 * @returns {string|undefined} - Palabras que representan las decenas.
 */
const Decenas = (num: number): string | undefined => {
    let decena = Math.floor(num / 10);
    let unidad = num - decena * 10;

    switch (decena) {
        case 1:
            switch (unidad) {
                case 0:
                    return "DIEZ";
                case 1:
                    return "ONCE";
                case 2:
                    return "DOCE";
                case 3:
                    return "TRECE";
                case 4:
                    return "CATORCE";
                case 5:
                    return "QUINCE";
                default:
                    return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch (unidad) {
                case 0:
                    return "VEINTE";
                default:
                    return "VEINTI" + Unidades(unidad);
            }
        case 3:
            return DecenasY("TREINTA", unidad);
        case 4:
            return DecenasY("CUARENTA", unidad);
        case 5:
            return DecenasY("CINCUENTA", unidad);
        case 6:
            return DecenasY("SESENTA", unidad);
        case 7:
            return DecenasY("SETENTA", unidad);
        case 8:
            return DecenasY("OCHENTA", unidad);
        case 9:
            return DecenasY("NOVENTA", unidad);
        case 0:
            return Unidades(unidad);
    }
}

/**
 * Establece el valor singular para la moneda.
 * @param {string} singular - Valor singular para la moneda.
 */
const setSingular = (singular: string): void => {
    config.letrasMonedaSingular = singular;
}

/**
 * Establece el valor plural para la moneda.
 * @param {string} plural - Valor plural para la moneda.
 */
const setPlural = (plural: string): void => {
    config.letrasMonedaPlural = plural;
}

/**
 * Establece el valor singular para los centavos.
 * @param {string} singular - Valor singular para los centavos.
 */
const setCentsSingular = (singular: string): void => {
    config.letrasMonedaCentavoPlural = singular;
}

/**
 * Establece el valor plural para los centavos.
 * @param {string} plural - Valor plural para los centavos.
 */
const setCentsPlural = (plural: string): void => {
    config.letrasMonedaCentavoPlural = plural;
}

/**
 * Obtiene el valor singular de la moneda.
 * @returns {string} - Valor singular de la moneda.
 */
function getSingular(): string {
    return config.letrasMonedaSingular;
}

/**
 * Obtiene el valor plural de la moneda.
 * @returns {string} - Valor plural de la moneda.
 */
/* function getPlural(): string {
    return config.letrasMonedaPlural;
} */

/**
 * Devuelve las palabras para representar las decenas y unidades del número.
 * @param {string} strSin - Palabras para representar las decenas.
 * @param {number} numUnidades - Unidades del número.
 * @returns {string} - Palabras que representan las decenas y unidades.
 */
const DecenasY = (strSin: string, numUnidades: number): string => {
    if (numUnidades > 0) return strSin + " Y " + Unidades(numUnidades);

    return strSin;
}

/**
 * Devuelve las palabras para representar las centenas del número.
 * @param {number} num - Centenas del número.
 * @returns {string} - Palabras que representan las centenas.
 */
const Centenas = (num: number): string | undefined => {
    let centenas = Math.floor(num / 100);
    let decenas = num - centenas * 100;

    switch (centenas) {
        case 1:
            if (decenas > 0) return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2:
            return "DOSCIENTOS " + Decenas(decenas);
        case 3:
            return "TRESCIENTOS " + Decenas(decenas);
        case 4:
            return "CUATROCIENTOS " + Decenas(decenas);
        case 5:
            return "QUINIENTOS " + Decenas(decenas);
        case 6:
            return "SEISCIENTOS " + Decenas(decenas);
        case 7:
            return "SETECIENTOS " + Decenas(decenas);
        case 8:
            return "OCHOCIENTOS " + Decenas(decenas);
        case 9:
            return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}

/**
 * Devuelve las palabras para representar la sección del número.
 * @param {number} num - Número a procesar.
 * @param {number} divisor - Divisor de la sección.
 * @param {string} strSingular - Palabras para la sección en singular.
 * @param {string} strPlural - Palabras para la sección en plural.
 * @returns {string} - Palabras que representan la sección del número.
 */
const Seccion = (num: number, divisor: number, strSingular: string, strPlural: string): string => {
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    let letras = "";
    if (cientos > 0)
        if (cientos > 1) letras = Centenas(cientos) + strPlural;
        else letras = strSingular;
    if (resto > 0) letras += "";
    return letras;
}

/**
 * Devuelve las palabras para representar los miles del número.
 * @param {number} num - Número a procesar.
 * @returns {string} - Palabras que representan los miles del número.
 */
const Miles = (num: number):string|undefined => {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;

    let strMiles = Seccion(num, divisor, " MIL", " MIL");
    let strCentenas = Centenas(resto);

    if (strMiles === "") return strCentenas;

    return strMiles + " " + strCentenas;
} //Miles()

/**
 * Devuelve las palabras para representar los millones del número.
 * @param {number} num - Número a procesar.
 * @returns {string} - Palabras que representan los millones del número.
 */
const Millones = (num: number):string|undefined => {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    
    let strMillones = Seccion(num, divisor, "UN MILLON", " MILLONES");
    let strMiles = Miles(resto);

    if (strMillones === "") return strMiles;

    if (strMiles === "") strMiles = "de";

    return strMillones + " " + strMiles;
}


/**
 * Convierte un número a palabras.
 * @param {number} num - Número a convertir.
 * @returns {string} - Palabras que representan el número en letras.
 */
const NumeroALetras = (num: number):string => {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: Math.round(num * 100) - Math.floor(num) * 100,
        letrasCentavos: "",
    };

    if (data.centavos > 0) {
        data.letrasCentavos =
            "PESOS CON " +
            (function () {
                if (data.centavos === 1)
                    return (
                        Millones(data.centavos) + " " + config.letrasMonedaCentavoSingular
                    );
                else
                    return (
                        Millones(data.centavos) + " " + config.letrasMonedaCentavoPlural
                    );
            })();

        data.letrasCentavos += ' CENTAVOS'
    }

    if (data.enteros === 0) return "CERO ";
    if (data.enteros === 1)
        return (
            Millones(data.enteros) +
            " " +
            config.letrasMonedaSingular +
            " " +
            data.letrasCentavos
        );
    else
        return (
            Millones(data.enteros) +
            " " +
            config.letrasMonedaPlural +
            " " +
            data.letrasCentavos
        );
}

const Sanitizer = (value: string) => {
    return value.replace("  ", " ");
}

/**
 * Función que capitaliza la primera letra de una cadena y convierte las demás a minúsculas.
 * @param {string} string - Cadena de entrada.
 * @returns {string} - Cadena con la primera letra en mayúscula y las demás en minúscula.
 */
const capitalizeFirstLetter = (string: string):string => {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const numero2word = (num: any = null) => {
    let _value: any = null;

    // Obtener la representación en palabras del número y eliminar espacios innecesarios.
    let data = NumeroALetras(num).trim();
    _value = data;

    return {
        /**
         * Convierte ciertos valores específicos a su forma femenina.
         * @function
         * @returns {Object} - Objeto con métodos encadenables.
         */
        FemaleValue: ():any => {
            if (_value === "UN " + getSingular()) _value = "UNA " + getSingular();
            return this;
        },
        /**
         * Capitaliza la primera letra de la representación en palabras del número.
         * @function
         * @returns {Object} - Objeto con métodos encadenables.
         */
        Capitalize: ():any => {
            _value = capitalizeFirstLetter(_value);
            return this;
        },
        /**
         * Objeto con métodos para configurar singular, plural, y otras opciones.
         * @namespace
         */
        Config: {
            /**
             * Establece el valor singular.
             * @function
             * @param {string} singular - Valor singular.
             */
            _setSingular: function (singular: any) {
                setSingular(singular);
            },
            /**
             * Establece el valor plural.
             * @function
             * @param {string} plural - Valor plural.
             */
            _setPlural: function (plural: any) {
                setPlural(plural);
            },
            /**
             * Establece el valor singular para los centavos.
             * @function
             * @param {string} singular - Valor singular para los centavos.
             */
            _setCentsSingular: function (singular: any) {
                setCentsSingular(singular);
            },
            /**
             * Establece el valor plural para los centavos.
             * @function
             * @param {string} plural - Valor plural para los centavos.
             */
            _setCentsPlural: function (plural: any) {
                setCentsPlural(plural);
            },
        },
        /**
         * Restaura la configuración de singular, plural, y otras opciones a valores predeterminados.
         * @function
         */
        clearConfig: function () {
            setSingular("");
            setPlural("");
            setCentsSingular("");
            setCentsPlural("");
        },
        /**
         * Devuelve la representación en palabras del número, con formato aplicado.
         * @function
         * @returns {string} - Representación en palabras del número con formato.
         */
        toString: function ():any {
            return Sanitizer(_value);
        },
    };
}
