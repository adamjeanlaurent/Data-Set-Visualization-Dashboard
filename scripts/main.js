import SummaryStats from "./summaryStats.js"

const p = stuff => {
    console.log(stuff);
}

/**
 * @summary: Main function.
 */
const main = async() => {
    let df = await dfd.read_csv("https://raw.githubusercontent.com/adamjeanlaurent/Data-Set-Visualization-Dashboard/main/ecoli_fixed.csv");
    p(df["classification"].value_counts().index_arr);
    const summaryStatistics = new SummaryStats();
    summaryStatistics.getAllColumnInfo(df);

    /*
        index is the x axis
        the first array needs to be one of the value counts
    */
    let ndf = new dfd.DataFrame({'pig': [20,43,54,76,34,23,54,23]}, {index: df["classification"].value_counts().index_arr})
    ndf.plot("plot").bar()


}

main();
