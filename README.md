# Ovatu Aviation

This single page application was created as a submission to a coding challenge set by Ovatu Interview Process.

Tech stack:

- Vue.js
- Tailwind CSS

## App features

An airport schedule app with the following features:

- [ x ] Uses the Aviation API by [AirLabs](https://airlabs.co/)
- [ x ] Fully responsive web app
- [ x ] Users can select an airport from a list of major Australian airports
- [ x ] Includes a schedule of all departures and arrivals for the selected airport for the current day
- [ x ] Each list is searchable by flight name and paginated
- [ x ] Clicking on a row in the schedule opens a modal to show more information about the flight

### Future Todos / Feature Ideas

- [ ] Add dynamic colours to the flight status in the FlightInfo modal
- [ ] Combine API calls for `fetchFlightInfo` and `fetchSchedule` to reduce number of API requests and improve performance
- [ ] Render a static table and add a custom skeleton loader component within each row of the table for initial loading state

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
