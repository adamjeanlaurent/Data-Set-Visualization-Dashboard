import SummaryStats from "./summaryStats.js"

const p = stuff => {
    console.log(stuff);
}

const main = async() => {
    let df = await dfd.read_csv("https://raw.githubusercontent.com/adamjeanlaurent/test/main/ecoli_fixed.csv");
    let s = new SummaryStats();
    s.getAllColumnInfo(df);
    console.log(df);
}

main();
