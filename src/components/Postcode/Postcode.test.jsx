import React from 'react';
import { render, screen } from '@testing-library/react';
// import * as ReactQuery from 'react-query';
import Postcode from './Postcode';

// sample airport data
jest.mock('react-query', () => ({
  useQuery: () => ({
    isLoading: false,
    error: {},
    data: {
      results: [
        {
          address_components: [
            {
              long_name: 'N1C 4AB',
              short_name: 'N1C 4AB',
              types: ['postal_code'],
            },
            {
              long_name: 'London',
              short_name: 'London',
              types: ['postal_town'],
            },
            {
              long_name: 'Greater London',
              short_name: 'Greater London',
              types: ['administrative_area_level_2', 'political'],
            },
            {
              long_name: 'England',
              short_name: 'England',
              types: ['administrative_area_level_1', 'political'],
            },
            {
              long_name: 'United Kingdom',
              short_name: 'GB',
              types: ['country', 'political'],
            },
          ],
          formatted_address: 'London N1C 4AB, UK',
          geometry: {
            bounds: {
              northeast: {
                lat: 51.5372761,
                lng: -0.1249065,
              },
              southwest: {
                lat: 51.5354416,
                lng: -0.1257025,
              },
            },
            location: {
              lat: 51.536507,
              lng: -0.1253363,
            },
            location_type: 'APPROXIMATE',
            viewport: {
              northeast: {
                lat: 51.5377078302915,
                lng: -0.123955519708498,
              },
              southwest: {
                lat: 51.5350098697085,
                lng: -0.126653480291502,
              },
            },
          },
          place_id: 'ChIJTUvGPxYbdkgROXfZbtyfvkg',
          types: ['postal_code'],
        },
      ],
      status: 'OK',
    },
  }),
}));

test('postcode submit text box and button renders', () => {
  // jest.spyOn(ReactQuery, 'useQuery').mockImplementation();

  render(<Postcode homeAirport="Heathrow Airport" setUser={jest.fn} />);

  const postcodeButton = screen.getByRole('button', {
    name: /enter/i,
  });
  const form = screen.getByRole('textbox', {
    name: /enter postcode/i,
  });
  expect(postcodeButton).toBeInTheDocument();
  expect(form).toBeInTheDocument();
});
