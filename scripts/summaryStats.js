import ColumnInformation from "./columnInformation.js"

/**
 * @summary: Holds all summary statistics information about a dataset.
 */
class SummaryStats {
    constructor() {
        this.numRows = 0;
        this.numCols = 0;
        this.colInfos = [];
    }

    setRowAndColNums(df) {
        const shape = df.shape;
        this.numRows = shape[0];
        this.numCols = shape[1];
    }

    getAllColumnInfo(df) {
        // drop na rows
        df = df.dropna({axis: 0});

        this.setRowAndColNums(df);

        // number of cols must be known first
        for(let i = 0; i < this.numCols; i++) {
            let colInfo = new ColumnInformation();
            
            this.setColumnType(i, colInfo, df);
            this.setName(i, colInfo, df);
            this.setMean(colInfo, df);
            this.setMedian(colInfo, df);
            this.setMinAndMax(colInfo, df);
            this.setMode(colInfo, df);
            
            this.colInfos.push(colInfo);
        }
    }

    setColumnType(index, colInfo, df) {
        let type = df.col_types[index];

        // if categorical type 
        if(type == "string") {
            colInfo.isCategorical = true;
            colInfo.isNumerical = false;
        }

        // if numerical
        else if(type == "float32" || "int32") {
            colInfo.isCategorical = false;
            colInfo.isNumerical = true;
        }

        // set type
        colInfo.type = type;
    }

    setName(index, colInfo, df) {
        let name = df.column_names[index];
        colInfo.name = name
    }

    setMean(colInfo, df) {
        // name and type must be known first
        // don't compute mean for non numeric
        if(colInfo.isNumerical) {
            colInfo.mean = df[colInfo.name].mean().toFixed(2);
        }
    }

    setMedian(colInfo, df) {
         // name and type must be known first
         // don't compute median for non numeric
         if(colInfo.isNumerical) {
            colInfo.median = df[colInfo.name].median().toFixed(2);
         }
    }
    
    setMinAndMax(colInfo, df) {
        // name and type must be known first
        // don't compute min for non numeric
        if(colInfo.isNumerical) {
            colInfo.min = df[colInfo.name].min().toFixed(2);
            colInfo.max = df[colInfo.name].max().toFixed(2);
        }
    }
    
    setMode(colInfo, df) {
        // name and type must be known first
        if(colInfo.isCategorical) {
            let array = df[colInfo.name].values;

            // compute mode
            if(array.length == 0)
            return null;
            let modeMap = {};
            let maxEl = array[0], maxCount = 1;
            for(var i = 0; i < array.length; i++) {
                let el = array[i];
                if(modeMap[el] == null)
                    modeMap[el] = 1;
                else
                    modeMap[el]++;  
                if(modeMap[el] > maxCount)
                {
                    maxEl = el;
                    maxCount = modeMap[el];
                }
            }
            colInfo.mode = maxEl;
        }
    }
}

export default SummaryStats;