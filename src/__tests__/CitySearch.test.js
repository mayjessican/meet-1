import React from "react";
import { shallow } from "enzyme";
import { extractLocations } from "../api";
import { mockEvents } from "../mock-events";
import CitySearch from "../CitySearch";

const locations = extractLocations(mockEvents);

describe("<CitySearch /> component", () => {
  beforeAll(() => {
    return locations.push("See all cities");
  });
  test("renders text input", () => {
    const CitySearchWrapper = shallow(
      <CitySearch updateEvents={() => {}} locations={locations} />
    );
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  test("updates the input correctly", () => {
    const CitySearchWrapper = shallow(
      <CitySearch updateEvents={() => {}} locations={locations} />
    );
    CitySearchWrapper.find('input[type="text"]').simulate("change", {
      target: {
        value: "Berlin",
      },
    });
    expect(CitySearchWrapper.find('input[type="text"]').prop("value")).toEqual(
      "Berlin"
    );
  });

  test("renders a list of suggestions correctly", () => {
    const CitySearchWrapper = shallow(
      <CitySearch updateEvents={() => {}} locations={locations} />
    );
    CitySearchWrapper.find('input[type="text"]').simulate("change", {
      target: {
        value: "Berlin",
      },
    });
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
  });

  test("clicking a suggestion must initiate a search", () => {
    const mockUpdateEvents = jest.fn();
    const CitySearchWrapper = shallow(
      <CitySearch updateEvents={mockUpdateEvents} locations={locations} />
    );
    CitySearchWrapper.find('input[type="text"]').simulate("change", {
      target: {
        value: "Berlin",
      },
    });
    CitySearchWrapper.find(".suggestions li").at(0).simulate("click");
    expect(mockUpdateEvents).toHaveBeenCalledWith("Berlin, Germany");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(0);
  });
});