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

    // .data is array of occureces 
    // .index_arr is all value tpyes
    let ndf = new dfd.DataFrame({'counts': df["classification"].value_counts().data}, {index: df["classification"].value_counts().index_arr})
    ndf.plot("plot").bar();
}

main();
