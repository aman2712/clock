const moreButton = document.getElementById("button");
const moreButtonText = document.getElementById("btn-text");
const btnImage = document.getElementById("btn-image");
const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const time = document.getElementById("time");
const timeAbbrv = document.getElementById("abbrv");
const cityCountry = document.getElementById("city-country");
const greetingType = document.getElementById("greeting-type");
const greetingImg = document.getElementById("greeting-img");
const body = document.getElementById("body");
const timezone = document.getElementById("timezone");
const dayOfYear = document.getElementById("day-of-year");
const dayOfWeek = document.getElementById("day-of-week");
const weekNumber = document.getElementById("week-number");
const extraInfo = document.getElementById("extra-info");

setInterval(() => {
  const datetime = new Date();
  time.innerHTML = `${datetime.getHours()}:${
    datetime.getMinutes() <= 9
      ? `0${datetime.getMinutes()}`
      : `${datetime.getMinutes()}`
  }`;

  if (datetime.getHours() >= 0 && datetime.getHours() < 12) {
    greetingType.innerHTML = "MORNING";
    greetingImg.src = "./images/icon-sun.svg";
    body.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(./images/bg-image-daytime.jpg)";
    extraInfo.style.backgroundColor = "rgba(204, 204, 204, 0.905)";
    extraInfo.style.color = "black";
  } else if (datetime.getHours() >= 12 && datetime.getHours() < 17) {
    greetingType.innerHTML = "AFTERNOON";
    greetingImg.src = "./images/icon-sun.svg";
    body.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(./images/bg-image-daytime.jpg)";
    extraInfo.style.backgroundColor = "rgba(204, 204, 204, 0.905)";
    extraInfo.style.color = "black";
  } else {
    greetingType.innerHTML = "EVENING";
    greetingImg.src = "./images/icon-moon.svg";
    body.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(./images/bg-image-nighttime.jpg)";
    extraInfo.style.backgroundColor = "rgba(0, 0, 0, 0.844)";
    extraInfo.style.color = "white";
  }

  var start = new Date(datetime.getFullYear(), 0, 0);
  var diff = datetime - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  dayOfYear.innerHTML = day;
  dayOfWeek.innerHTML = datetime.getDay() + 1;
  weekNumber.innerHTML = datetime.getWeek();
}, 1000);

async function onLoad() {
  window.scroll(0, 0);

  const response = await fetch("https://api.quotable.io/random");
  const res = await response.json();

  quote.innerHTML = `"${res.content}"`;
  quoteAuthor.innerHTML = res.author;

  const ipresponse = await fetch(
    "https://ipinfo.io/114.29.226.43?token=f5bc82617e108f"
  );
  const ipres = await ipresponse.json();

  const timeresponse = await fetch(
    `https://worldtimeapi.org/api/timezone/${ipres.timezone}`
  );
  const timeres = await timeresponse.json();

  timeAbbrv.innerHTML = timeres.abbreviation;
  cityCountry.innerHTML = `IN ${ipres.city}, ${ipres.country}`;
  timezone.innerHTML = timeres.timezone;
}

function scrollToBottom() {
  if (
    document.documentElement.scrollHeight ===
    window.pageYOffset + window.innerHeight
  ) {
    window.scroll(0, 0);
    moreButtonText.innerHTML = "MORE";
    btnImage.style.transform = "rotate(180deg)";
  } else {
    window.scrollTo(0, document.body.scrollHeight);
    moreButtonText.innerHTML = "LESS";
    btnImage.style.transform = "rotate(0deg)";
  }
}

Date.prototype.getWeek = function (dowOffset) {
  dowOffset = typeof dowOffset == "number" ? dowOffset : 0;
  var newYear = new Date(this.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset;
  day = day >= 0 ? day : day + 7;
  var daynum =
    Math.floor(
      (this.getTime() -
        newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000
    ) + 1;
  var weeknum;
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      nYear = new Date(this.getFullYear() + 1, 0, 1);
      nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};

moreButton.addEventListener("click", scrollToBottom);
