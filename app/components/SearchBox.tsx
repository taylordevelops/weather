"use client";
import { match } from "assert";
import React from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";

export default function SearchBox({ placeholder }: any) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  const onChange = (e: any) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities: any = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      }
    }

    return setResults(matchingCities);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder={placeholder ? placeholder : ""}
        />

        {query.length > 3 && (
          <ul>
            {results.length > 0 ? (
              results.map((city: any) => {
                return (
                  <li key={city.slug}>
                    <Link href={`/location/${city.slug}`}>
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}{" "}
                      <span>({city.country})</span>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="search__no-results">No results found</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
