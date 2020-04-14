import { prisma } from "../generated/prisma-client";
import cron from "node-cron";
import moment from "moment";
import tz from 'moment-timezone';
import "moment/locale/ko";
import axios from 'axios';
import cheerio from 'cheerio';


const getHTML = async () => {
  try {
    const _html = await axios.get(`http://www.sbiz.or.kr/fcs/list.do?recordCountPerPage=100&upjongNm=%EA%B8%B0%ED%83%80%EC%99%B8%EC%8B%9D&searchWord=&listSort=frnchsCntDesc&pageIndex=1&goodFcs=N`);
    return _html;
  } catch( error ) {
    console.log( error );
  }
};

const ParsingHTML = async () => {
  const html = await getHTML();
  let tableList = [];
  const $ = cheerio.load(html.data);

  // console.log(html);
  // console.log($);


  const $bodyList = $("div.conTable.t2 > table tbody").children("tr");

  $bodyList.each(function(i, elem) {
    tableList[i] = {
        title: $(this).find('td:nth-child(4)').text(),
        // url: $(this).find('strong.news-tl a').attr('href'),
        // image_url: $(this).find('p.poto a img').attr('src'),
        // image_alt: $(this).find('p.poto a img').attr('alt'),
        // summary: $(this).find('p.lead').text().slice(0, -11),
        // date: $(this).find('span.p-time').text()
    };
  });


  const data = tableList.filter(n => n.title);
  return data;
}

export const cronJob = () => {
  cron.schedule("*/10 07 * * * *", async () => {
    //const result = await ParsingHTML();
    //console.log(result);

  });
}




