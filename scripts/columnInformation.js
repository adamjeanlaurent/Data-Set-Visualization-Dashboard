
/**
 * @summary: Holds all summary statistics information about a single column.
 */
class ColumnInformation {
    constructor() {
        this.name = ""; 
        this.mean = 0; /* stays for categ col */
        this.min = 0;  /* stays for categ col */
        this.max = 0; /* stays for categ col */
        this.isCategorical = false;
        this.isNumerical = false;
        this.mode = ""; /* stays "" numer col */
    }
}

export default ColumnInformation;