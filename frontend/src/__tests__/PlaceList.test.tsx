import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { PlaceDto, UserDto } from "../helpers/dtos";
import PlacesList from "../places/components/PlacesList";

const userPlacesList = [
  new PlaceDto("test1", "test1", "test1", "test1", "test1", "nardin1", "test1"),
  new PlaceDto("test2", "test2", "test2", "test2", "test2", "nardin2", "test2"),
];

const renderEditablePlaceList = (userPlaces: PlaceDto[], loading: boolean) => {
  const propsEditable = {
    editable: true,
    loading,
    userPlaces,
    userDto: new UserDto("nardin", "Nardin", undefined, 2),
    editingCallbacks: {
      editPlace: jest.fn((placeInfo) => Promise.resolve()),
      deletePlace: jest.fn((placeId) => Promise.resolve()),
    },
  };

  render(
    <BrowserRouter>
      <PlacesList
        editable={propsEditable.editable}
        loading={propsEditable.loading}
        userPlaces={propsEditable.userPlaces}
        userDto={propsEditable.userDto}
        editingCallbacks={propsEditable.editingCallbacks}
      />
    </BrowserRouter>
  );
};

const renderNotEditablePlaceList = () => {
  const propsEditable = {
    editable: false,
    loading: false,
    userPlaces: userPlacesList,
    userDto: new UserDto("nardin", "Nardin", undefined, 2),
  };

  render(
    <BrowserRouter>
      <PlacesList
        editable={propsEditable.editable}
        loading={propsEditable.loading}
        userPlaces={propsEditable.userPlaces}
        userDto={propsEditable.userDto}
      />
    </BrowserRouter>
  );
};

describe("editable place item", () => {
  test("shows message when no place found", () => {
    renderEditablePlaceList([], false);
    expect(screen.getByText(/No place found./)).toBeInTheDocument();
  });

  test("showss spinner icon if it is loading", () => {
    renderEditablePlaceList(userPlacesList, true);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("do not show spinner icon if it is not loading", () => {
    renderEditablePlaceList(userPlacesList, false);
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  test("show editable places", () => {
    renderEditablePlaceList(userPlacesList, false);

    const places = screen.queryAllByRole("listitem");
    const placeText = places.map((place) => place.textContent);

    expect(placeText).toEqual([
      "test1test1Address: test1",
      "test2test2Address: test2",
    ]);
  });
});

describe("not editable place item", () => {
  test("shows place item", () => {
    renderNotEditablePlaceList();

    const places = screen.queryAllByRole("listitem");
    const placeText = places.map((place) => place.textContent);

    expect(placeText).toEqual([
      "test1test1Address: test1",
      "test2test2Address: test2",
    ]);
  });
});
