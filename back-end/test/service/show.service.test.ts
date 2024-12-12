import { after } from "node:test";
import {Show} from "../../model/show";
import showService from "../../service/show.service";
import showDB from "../../repository/show.db";
import e from "express";

let mockShowDBGetsAllShows: jest.SpyInstance<Show[], [],any>


beforeEach(() => {
    mockShowDBGetsAllShows = jest.spyOn(showDB, 'getAllShows');
});
afterEach(() => {
    jest.clearAllMocks();
});

test('given a database with shows when getAllShows then return all shows',() => {
    const getAllShows = showService.getAllShows();


    expect(mockShowDBGetsAllShows).toHaveBeenCalledTimes(1);
    expect(getAllShows).toEqual(mockShowDBGetsAllShows.mock.results[0].value);
    console.log(getAllShows);


});

test('given a database with shows when getShowsByDate then return shows with that date are returned',() => {
    const getShowsByDate = showService.getShowsByDate(new Date('2024-12-25'));


    expect(mockShowDBGetsAllShows).toHaveBeenCalledTimes(1);
    expect(getShowsByDate).toHaveLength(2);


});

