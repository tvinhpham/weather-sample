import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as locations from './data/locations.json';
import * as forecasts from './data/forecasts.json';
import { API_URL } from '../utils/constants';

const handlers = [
  rest.get(`${API_URL}/api/location/search/`, (req: any, res: any, ctx: any) => {
    const query = req.url.searchParams.get('query');

    console.log(query);

    //@ts-ignore
    return res(ctx.status(200), ctx.json(locations[query]));
  }),

  rest.get(`${API_URL}/api/location/:locationId`, (req: any, res: any, ctx: any) => {
    const { locationId } = req.params;

    //@ts-ignore
    return res(ctx.status(200), ctx.json(forecasts[locationId]));
  }),
  rest.get('/mock/test', (req: any, res: any, ctx: any) => {
    //@ts-ignore
    return res(ctx.status(200), ctx.json('Hello'));
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

export { server, rest };
