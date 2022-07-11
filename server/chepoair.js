const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/:from/:to/:fromdate/:todate", async (req, res) => {
  (async () => {
    var { from } = req.params;
    var { to } = req.params;
    var { fromdate } = req.params;
    var { todate } = req.params;

    var fromdateday = fromdate.substring(0, 2);
    var fromdatemonth = fromdate.substring(2, 4);
    var fromdateyear = fromdate.substring(4, 8);

    var todateday = todate.substring(0, 2);
    var todatemonth = todate.substring(2, 4);
    var todateyear = todate.substring(4, 8);

    var fromdate = fromdateday + "/" + fromdatemonth + "/" + fromdateyear;
    var todate = todateday + "/" + todatemonth + "/" + todateyear;
    //date format 07/31/2022

    let url =
      "https://www.cheapoair.ca/air/listing?&d1=" +
      from +
      "&r1=" +
      to +
      "&dt1=" +
      fromdate +
      "&d2=" +
      to +
      "&r2=" +
      from +
      "&dt2=" +
      todate +
      "&tripType=ROUNDTRIP&cl=ECONOMY&ad=1&se=0&ch=0&infs=0&infl=0";

    console.log(url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(30000);
    let data = await page.evaluate(() => {
      var cheapoairprice = [];
      var cheapoairfromairline = [];
      var cheapoairtoairline = [];
      var cheapoairfromtime = [];
      var cheapoairtotime = [];

      var counter1 = 0;
      var counter2 = 1;

      for (let i = 0; i < 10; i++) {
        if (i > 0) {
          counter1 = counter1 + 2;
          counter2 = counter2 + 2;
        }

        cheapoairprice[i] = document.querySelectorAll(
          "segment.fare-details div.fare-details__fare"
        )[i].innerText;

        cheapoairprice[i] = cheapoairprice[i].replace(/<\/?[^>]+(>|$)/g, "");

        cheapoairfromairline[i] = document.querySelectorAll(
          ".trip__airline--name"
        )[counter1].innerText;

        cheapoairtoairline[i] = document.querySelectorAll(
          ".trip__airline--name"
        )[counter2].innerText;

        cheapoairfromtime[i] = document.querySelectorAll(
          ".stop__trip-duration"
        )[counter1].innerText;

        cheapoairtotime[i] = document.querySelectorAll(".stop__trip-duration")[
          counter2
        ].innerText;
      }

      return {
        cheapoairprice,
        cheapoairfromairline,
        cheapoairtoairline,
        cheapoairfromtime,
        cheapoairtotime,
      };
    });
    console.log(data);
    await browser.close();
    res.json(data);
  })();
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
