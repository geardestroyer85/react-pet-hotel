import axios from "axios"
import { PETS } from "./mockData";

describe("API TESTING",  () => {
  test("GET PETS API", async () => {
    const response = await axios("/api/pets");

    // console.log(response.data);

    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual(PETS)
  });


})