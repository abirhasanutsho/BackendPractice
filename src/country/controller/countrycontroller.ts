import { Request, Response } from "express";
import country from "country-list";

export const getCountry = async (request: Request, response: Response) => {
  try {
    const countryList = country.getData();

    const countryData = countryList.map((country, index) => ({
        
      id: index + 1,
      name: country.name,
      code: country.code,

    }));

    response.status(200).json(countryData);

  } catch (error) {}
};
