import React from "react";
import "../../styles/main.scss";
import cities from "../../app/lib/city.list.json";
import Link from "next/link";
import Head from "next/head";
import SearchBox from "../../app/components/SearchBox";

export async function getServerSideProps(context: any) {
  const city = getCity(context.params.city);
  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=imperial&exclude=minutely`
  );

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  console.log(data);

  const slug = context.params.city;
  return {
    props: {
      city: city,
      data: data,
      currentTemp: data.main.temp,
    },
  };
}

const getCity = (param: any) => {
  const cityParam: any = param.trim();
  // get city id
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city: any = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

export default function City({ slug: any, data }) {
  let currentTemp: any = Math.round(data.main.temp);
  let currentLow: any = Math.round(data.main.temp_min);
  let currentHigh: any = Math.round(data.main.temp_max);
  let feelsLike: any = Math.round(data.main.feels_like);
  let wind: any = Math.round(data.wind.speed);

  let cityName: any = data.name;

  return (
    <>
      <Head>
        <title>Weather - Next Weather App</title>
      </Head>

      <div className="container">
        <div className="cityName">{cityName}</div>
        <div className="middleRow">
          <div className="currentTemp">{currentTemp}&deg;F</div>
          <div className="wind">
            <span className="windText">{wind}</span>
            <span className="largeLabel">MPH</span>{" "}
            <div className="smallLabel">winds</div>
          </div>
        </div>
        <div className="bottomRow">
          <div className="feelsLike">
            <div className="smallLabel">Feels Like</div>
            {feelsLike}&deg;F
          </div>
          <div className="currentHigh">
            <div className="smallLabel">High</div>
            {currentHigh}&deg;F
          </div>
          <div className="currentLow">
            <div className="smallLabel">Low</div>
            {currentLow}&deg;F{" "}
          </div>
        </div>

        <SearchBox placeholder="Search for a city..." />
      </div>
    </>
  );
}
